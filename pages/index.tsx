import Head from 'next/head'
import { trpc } from '../utils/trpc'

export default function Home() {
	const { data } = trpc.hello.useQuery({ name: 'banana' })

	return (
		<>
			<Head>
				<title>wehatejs</title>
				<meta
					name="description"
					content="blog built just to shit on javascript(written in javascript)"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1 className="text-zinc-900">{data?.content}</h1>
			</main>
		</>
	)
}
