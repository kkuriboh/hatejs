import { GetServerSideProps } from 'next'
import { Session, User } from 'next-auth'
import { getSession } from 'next-auth/react'
import {
	ClipboardDocumentListIcon,
	ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import Footer from '../../components/footer'
import Header from '../../components/header'
import { client } from '../../utils/redis'
import { useEffect, useState } from 'react'

type props = {
	user: User
	gm: boolean
}

const Panel: React.FC<props> = ({ user, gm }) => {
	const [copied, set_copied] = useState(false)

	useEffect(() => {
		if (copied) setTimeout(() => set_copied(false), 2000)
	}, [copied])

	if (!gm)
		return (
			<div className="flex flex-col justify-between h-screen">
				<Header />
				<main className="mx-auto text-center flex flex-col gap-4">
					<h2 className="font-bold text-2xl">Not Authorized</h2>
					<div className="flex gap-2 p-6 mx-auto bg-zinc-300 border rounded border-zinc-800">
						<h3>{user && user.id}</h3>
						{!copied ? (
							<ClipboardDocumentListIcon
								onClick={() => {
									set_copied(true)
									navigator.clipboard.writeText(user.id)
								}}
								title="copy"
								className="text-zinc-500 h-6 w-6 cursor-pointer"
							/>
						) : (
							<ClipboardDocumentCheckIcon
								title="copied"
								className="text-zinc-500 h-6 w-6"
							/>
						)}
					</div>
					<p>
						Here is your user ID, send it to an admin and ask for
						permission.
					</p>
				</main>
				<Footer />
			</div>
		)
	return (
		<>
			<Header />
			<main></main>
			<Footer />
		</>
	)
}

export default Panel

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)
	if (!session) {
		return {
			redirect: { destination: '/panel/login', permanent: false },
		}
	}

	const gms = await client.sdiff('GM')
	return { props: { user: session.user, gm: gms.includes(session.user.id) } }
}
