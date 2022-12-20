import matter from 'gray-matter'
import { GetServerSideProps } from 'next'
import slugify from 'slugify'
import Footer from '../../components/footer'
import Header from '../../components/header'
import PostListing from '../../components/post_listing'
import { client } from '../../utils/redis'
import { Posts } from '../../utils/types'

type Props = {
	posts: Posts
}

const Blog: React.FC<Props> = ({ posts }) => {
	return (
		<>
			<Header />
			<main className="md:p-8 sm:p-4">
				<PostListing
					cursor_increment={3}
					cursor_initial_position={5}
					posts={posts}
				/>
			</main>
			<Footer />
		</>
	)
}

export default Blog

export const getServerSideProps: GetServerSideProps = async () => {
	const posts = await client.hgetall('posts')

	const metadata = []
	for (const key in posts) {
		if (Object.prototype.hasOwnProperty.call(posts, key)) {
			metadata.push({
				fm: matter(posts[key] as string),
				slug: slugify(key),
			})
		}
	}

	return {
		props: {
			posts: metadata.map(({ fm, slug }) => ({
				author: fm.data.author,
				date: fm.data.date,
				summary: fm.data.summary,
				title: fm.data.title,
				slug,
			})),
		},
	}
}
