import matter from 'gray-matter'
import { marked } from 'marked'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'

import Footer from '../../components/footer'
import Header from '../../components/header'

import { client } from '../../utils/redis'
import { Post } from '../../utils/types'

type Props = {
	post: Post
	md: string
}

const BlogPage: React.FC<Props> = ({ post, md }) => {
	const content_ref = useRef<HTMLDivElement>(null)
	useEffect(
		() =>
			content_ref.current
				?.querySelectorAll('code')
				.forEach((element) =>
					hljs.highlightElement(element as HTMLElement)
				),
		[]
	)

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
			<main className="md:p-8 p-4 flex justify-center">
				{md && (
					<div
						ref={content_ref}
						className="w-full prose prose-zinc prose-lg md:prose-xl prose-hr:border-zinc-600 prose-hr:border-2"
						dangerouslySetInnerHTML={{ __html: marked(md) }}
					/>
				)}
			</main>
			<Footer />
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params!
	const post = matter((await client.hget('posts', slug as string)) as string)
	return {
		props: {
			post: {
				...post.data,
				date: new Date(post.data.date).toLocaleDateString(),
			},
			md: post.content,
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: (await client.hkeys('posts')).map((key) => `/blog/${key}`),
		fallback: false,
	}
}

export default BlogPage
