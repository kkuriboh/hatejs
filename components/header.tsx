import { signOut, useSession } from 'next-auth/react'
import { PowerIcon } from '@heroicons/react/24/outline'
import NextLink from 'next/link'

const Header: React.FC = () => {
	const session = useSession()
	return (
		<header className="flex justify-around p-4 items-center border-b-2 border-zinc-900 text-zinc-900">
			<NextLink href="/">
				<h2 className="font-bold text-2xl">HATEJS</h2>
			</NextLink>
			<ul className="flex gap-8 font-semibold">
				<li className="grid place-items-center">
					<NextLink href="/">HOME</NextLink>
				</li>
				<li className="grid place-items-center">
					<NextLink href="/blog">BLOG</NextLink>
				</li>
				{session.data && (
					<>
						<li className="flex">
							<PowerIcon
								title="logout"
								onClick={async () => await signOut()}
								className="w-5 h-5 stroke-2 text-zinc-900 my-auto cursor-pointer"
							/>
						</li>
						{session.data.user && session.data.user.image && (
							<li className="flex">
								<img
									className="h-10 rounded-full border border-zinc-900"
									src={session.data.user.image}
									alt="profile picture"
								/>
							</li>
						)}
					</>
				)}
			</ul>
		</header>
	)
}

export default Header
