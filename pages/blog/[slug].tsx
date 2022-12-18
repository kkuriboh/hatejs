import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import slugify from 'slugify'

import { client } from '../../utils/redis'

const BlogPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
	posts,
}) => {
	return (
		<main>
			{posts.map((post: any) => (
				<p className="text-zinc-900 text-xl">{post.value}</p>
			))}
		</main>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	await client.hset('posts', {
		['i hate js']: '# js is bad\n## **we hate js**',
	})
	const posts = await client.hgetall('posts')
	console.log(posts)
	return { props: { posts } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = (await client.hkeys('posts')).map((post) => slugify(post))
	return { paths: posts, fallback: false }
}

export default BlogPage
