import { createNextApiHandler } from '@trpc/server/adapters/next'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { client } from '../../../utils/redis'

const t = initTRPC.create()

const app_router = t.router({
	add_post: t.procedure
		.input(z.object({ poster_id: z.string() }))
		.mutation(({ input }) => {}),
})

export type AppRouter = typeof app_router

export default createNextApiHandler({
	router: app_router,
	createContext: () => ({}),
})

export const config = {
	runtime: 'nodejs',
}
