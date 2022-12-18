import { createNextApiHandler } from '@trpc/server/adapters/next'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

const app_router = t.router({
	hello: t.procedure
		.input(z.object({ name: z.string() }))
		.query(({ input }) => ({ content: `hello ${input.name}` })),
})

export type AppRouter = typeof app_router

export default createNextApiHandler({
	router: app_router,
	createContext: () => ({}),
})

export const config = {
	runtime: 'nodejs',
}
