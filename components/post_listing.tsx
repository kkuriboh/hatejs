import { useRouter } from 'next/router'
import { useState } from 'react'
import { Posts } from '../utils/types'
import Button from './button'

type Props = {
	posts: Posts
	cursor_increment: number
	cursor_initial_position: number
}

const PostListing: React.FC<Props> = ({
	posts,
	cursor_initial_position,
	cursor_increment,
}) => {
	const [cursor, set_cursor] = useState(cursor_initial_position)
	const router = useRouter()

	return (
		<section className="flex flex-col gap-4 px-6 text-zinc-900">
			<h2 className="text-zinc-900 text-4xl font-semibold">
				latest blog posts
			</h2>
			{posts &&
				posts
					.slice(0, cursor)
					.map(({ author, date, summary, slug, title }, index) => {
						return (
							<article
								key={index}
								className="border-2 rounded border-zinc-900 p-4"
							>
								<div className="flex justify-between items-center mb-1">
									<h3 className="font-bold text-xl">
										{title}
									</h3>
									<h4 className="font-semibold">
										{author}: <small>{date}</small>
									</h4>
								</div>
								<p className="indent-2 mb-2">
									{`${summary.slice(0, 250)}${
										summary.length > 250 ? '...' : ''
									}
										`}
								</p>
								<Button
									onClick={() => router.push(`/blog/${slug}`)}
								>
									read more
								</Button>
							</article>
						)
					})}
			<div className="flex gap-6 justify-center">
				{posts && cursor < posts.length && (
					<Button
						onClick={() => set_cursor(cursor + cursor_increment)}
					>
						load more
					</Button>
				)}
				{posts && cursor > cursor_initial_position && (
					<Button
						onClick={() => set_cursor(cursor - cursor_increment)}
					>
						load less
					</Button>
				)}
			</div>
		</section>
	)
}
export default PostListing
