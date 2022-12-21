import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Footer from '../../components/footer'
import Header from '../../components/header'

const Panel: React.FC = () => {
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
	return { props: { session } }
}
