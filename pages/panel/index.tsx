import { FormEvent, useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { User } from 'next-auth'
import { getSession } from 'next-auth/react'
import {
	ClipboardDocumentListIcon,
	ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/tokyo-night-dark.css'

import Footer from '../../components/footer'
import Header from '../../components/header'
import { check_if_gm } from '../../utils/redis'
import Button from '../../components/button'
import { trpc } from '../../utils/trpc'

type props = {
	user: User
	gm: boolean
}

const Panel: React.FC<props> = ({ user, gm }) => {
	const router = useRouter()

	const [copied, set_copied] = useState(false)

	const [title, set_title] = useState('')
	const [author, set_author] = useState('')
	const [summary, set_summary] = useState('')
	const [content, set_content] = useState('')

	const preview_ref = useRef<HTMLDivElement>(null)
	const [preview, set_preview] = useState('')

	useEffect(() => {
		if (copied) setTimeout(() => set_copied(false), 2000)
	}, [copied])
	useEffect(() => {
		set_preview(marked(content))
	}, [content])
	useEffect(() => {
		preview_ref.current
			?.querySelectorAll('code')
			.forEach((element) => hljs.highlightElement(element as any))
	}, [preview])

	const post_mutation = trpc.add_post.useMutation()
	const handle_submit = async (e: FormEvent) => {
		e.preventDefault()
		const res = await post_mutation.mutateAsync({
			poster_id: user.id!,
			post_matter: {
				author,
				title,
				date: new Date().toDateString(),
				summary,
			},
			post_content: content,
		})

		if (res.status === 401 && res.error) {
			alert(res.error)
			router.push('/')
			return
		}

		set_title('')
		set_author('')
		set_summary('')
		set_content('')
		set_preview('')
	}

	if (!gm)
		return (
			<div className="flex flex-col justify-between h-screen">
				<Header />
				<main className="mx-auto text-center flex flex-col gap-4">
					<h2 className="font-bold text-2xl">Not Authorized</h2>
					<div className="flex gap-2 p-6 mx-auto bg-zinc-300 border rounded border-zinc-800">
						<h3>{user && user.id}</h3>
						{!copied ? (
							<ClipboardDocumentListIcon
								onClick={() => {
									set_copied(true)
									navigator.clipboard.writeText(user.id)
								}}
								title="copy"
								className="text-zinc-500 h-6 w-6 cursor-pointer"
							/>
						) : (
							<ClipboardDocumentCheckIcon
								title="copied"
								className="text-zinc-500 h-6 w-6"
							/>
						)}
					</div>
					<p>
						Here is your user ID, send it to an admin and ask for
						permission.
					</p>
				</main>
				<Footer />
			</div>
		)

	return (
		<>
			<Header />
			<main className="flex flex-col lg:flex-row p-2 gap-2">
				<div className="lg:w-2/4">
					<form
						onSubmit={handle_submit}
						className="flex flex-col gap-2"
					>
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							id="title"
							required
							value={title}
							onChange={(ev) => set_title(ev.target.value)}
							className="rounded transition-colors border border-zinc-700 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400"
						/>
						<label htmlFor="author">Author:</label>
						<input
							type="text"
							id="author"
							required
							value={author}
							onChange={(ev) => set_author(ev.target.value)}
							className="rounded transition-colors border border-zinc-700 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400"
						/>
						<label htmlFor="summary">Summary:</label>
						<textarea
							name="summary"
							id="summary"
							required
							value={summary}
							onChange={(ev) => set_summary(ev.target.value)}
							className="rounded transition-colors border border-zinc-700 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400"
							rows={3}
						/>
						<label htmlFor="content">Content:</label>
						<textarea
							name="content"
							id="content"
							required
							className="w-full rounded transition-colors border border-zinc-700 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400"
							rows={10}
							value={content}
							onChange={(ev) => set_content(ev.target.value)}
						/>
						<Button
							type="submit"
							className="px-6 bg-zinc-800 text-zinc-50"
						>
							post
						</Button>
					</form>
				</div>
				<div
					ref={preview_ref}
					className={
						'lg:w-2/4 lg:overflow-y-scroll lg:max-h-[85vh] md:min-w-full lg:min-w-min bg-zinc-900 text-zinc-50 rounded p-4 prose prose-lg md:prose-xl prose-headings:text-zinc-50 prose-stone'
					}
					dangerouslySetInnerHTML={{ __html: preview }}
				/>
			</main>
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

	return {
		props: { user: session.user, gm: await check_if_gm(session.user.id) },
	}
}
