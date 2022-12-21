import { GetServerSideProps } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Button from '../../components/button'

const Panel: React.FC = () => {
	const router = useRouter()
	return (
		<Button
			onClick={() => {
				signOut()
			}}
		>
			logout
		</Button>
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
	return { props: { session } }
}
