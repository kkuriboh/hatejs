import { createNextApiHandler } from '@trpc/server/adapters/next'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { check_if_gm, client } from '../../../utils/redis'
import slugify from 'slugify'

const t = initTRPC.create()

type AddPostReturn = { error?: string; status: number }

const app_router = t.router({
	add_post: t.procedure
		.input(
			z.object({
				poster_id: z.string(),
				post_matter: z.object({
					author: z.string(),
					date: z.string(),
					summary: z.string(),
					title: z.string(),
				}),
				post_content: z.string(),
			})
		)
		.mutation(async ({ input }): Promise<AddPostReturn> => {
			const gm = await check_if_gm(input.poster_id)
			if (!gm) return { error: 'Not Authorized', status: 401 }

			const slug = slugify(input.post_matter.title)
			const post = `---
author: ${input.post_matter.author}
date: ${input.post_matter.date}
summary: ${input.post_matter.summary}
title: ${input.post_matter.title}
slug: ${slug}
---

${input.post_content}`

			await client.hset('posts', { [slug]: post })

			return { status: 202 }
		}),
})

export type AppRouter = typeof app_router

export default createNextApiHandler({
	router: app_router,
	createContext: () => ({}),
})
