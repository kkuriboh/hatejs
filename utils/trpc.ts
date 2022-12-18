import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { AppRouter } from '../pages/api/trpc/[trpc]'

const get_base_url = (): string => {
	if (typeof window !== 'undefined') return ''
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
	return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
	config: () => ({
		links: [httpBatchLink({ url: get_base_url() + '/api/trpc' })],
	}),
	ssr: true,
})
