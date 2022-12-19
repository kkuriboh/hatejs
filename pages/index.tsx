import matter from 'gray-matter'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import slugify from 'slugify'
import Footer from '../components/footer'
import Header from '../components/header'
import { client } from '../utils/redis'

type Props = {
	posts: {
		author: string
		date: string
		summary: string
		slug: string
	}[]
}

export default function Home({ posts }: Props) {
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
				<link rel="icon" href="/logo.svg" />
			</Head>
			<Header />
			<main className="md:p-8 sm:p-4">
				<section className="flex flex-col gap-4 px-6 text-zinc-900">
					<h2 className="text-zinc-900 text-4xl font-semibold">
						we hate javascript and you should too!
					</h2>
					<article className="border-2 rounded border-zinc-900 p-4">
						<h3 className="text-xl mb-1">
							The JavaScript Problem:{' '}
							<small className="italic">
								It's being used everywhere.
							</small>
						</h3>
						<p className="indent-2">
							You can see it running on servers, mobile apps and
							even embedded systems. All those places where it
							shouldn't be an option, and what's making this
							happen is the unecessary need for "easier tools to
							work with". Because of this, the language is being
							adapted day after day, just so it can fit all their
							needs better.
						</p>
						<p className="indent-2">
							At it's core, javascript is an impure, slow and
							unsafe language. It's only use should be for
							building web apps, that's what it was intended for
							and adapting the language will only cause pain for
							the developers.
						</p>
					</article>
					<article className="border-2 rounded border-zinc-900 p-4">
						<h3 className="text-xl mb-1">
							What's the purpose of this website?
						</h3>
						<p className="indent-2">
							The purpose of this website is to show you new
							technologies that can be used instead of javascript,
							also why and when to use each of them.
						</p>
						<p className="indent-2">
							We don't actually hate it, just part of it's
							ecosystem (this website uses javascript btw).
						</p>
					</article>
				</section>
				<section className="flex flex-col gap-4 mt-6 px-6 text-zinc-900">
					<h2 className="text-zinc-900 text-4xl font-semibold">
						latest blog posts
					</h2>
					{posts &&
						posts.map(({ author, date, summary }, index) => {
							return (
								<article
									key={index}
									className="border-2 rounded border-zinc-900 p-4"
								>
									<h3 className="font-semibold">
										{author}: <small>{date}</small>
									</h3>
									<p className="indent-2">
										{`${summary.slice(0, 250)}${
											summary.length > 250 ? '...' : ''
										}
										`}
									</p>
									<button className="rounded border border-zinc-700 p-1 mt-4 hover:bg-zinc-600 hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400">
										read more
									</button>
								</article>
							)
						})}
					<button className="mx-auto rounded border border-zinc-700 p-1 hover:bg-zinc-600 hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400">
						load more
					</button>
				</section>
			</main>
			<Footer />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const posts = await client.hgetall('posts')

	const metadata = []
	for (const key in posts) {
		if (Object.prototype.hasOwnProperty.call(posts, key)) {
			const content = (posts[key] as string).split('\n')
			if (!content[0]) {
				content.splice(0, 1)
			}
			metadata.push({
				fm: matter(content.join('\n')),
				slug: slugify(key),
			})
		}
	}

	return {
		props: {
			posts: metadata.slice(0, 3).map(({ fm, slug }) => ({
				author: fm.data.author,
				date: fm.data.date,
				summary: fm.data.summary,
				slug,
			})),
		},
	}
}
