import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Button from '../../components/button'
import Footer from '../../components/footer'
import Header from '../../components/header'

const Login: React.FC = () => {
	const session = useSession()
	const router = useRouter()
	useEffect(() => {
		if (session) router.push('/panel')
	}, [session])

	return (
		<div className="flex flex-col justify-between h-screen">
			<Header />
			<main className="grid place-items-center">
				<Button
					className="p-6"
					onClick={async () => await signIn('github')}
				>
					login with github
				</Button>
			</main>
			<Footer />
		</div>
	)
}

export default Login
