import matter from 'gray-matter'
import { marked } from 'marked'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Footer from '../../components/footer'
import Header from '../../components/header'

import { client } from '../../utils/redis'
import { Post } from '../../utils/types'

type Props = {
	post: Post
	md: string
}

const BlogPage: React.FC<Props> = ({ post, md }) => {
	return (
		<>
			{post && (
				<Head>
					<title>{post.title}</title>
					<meta name="description" content={post.summary} />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1"
					/>
					<link rel="icon" href="/logo.svg" />
				</Head>
			)}
			<Header />
			<main className="md:p-8 sm:p-4">
				{md && (
					<div dangerouslySetInnerHTML={{ __html: marked(md) }}></div>
				)}
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params!
	const post = matter((await client.hget('posts', slug as string)) as string)
	return { props: { post: post.data, md: post.content } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: (await client.hkeys('posts')).map((key) => `/blog/${key}`),
		fallback: false,
	}
}

export default BlogPage
