import { Redis } from '@upstash/redis'

export const client = new Redis({
	url: process.env.UPSTASH_URL!,
	token: process.env.UPSTASH_TOKEN!,
})

export const check_if_gm = async (id: string): Promise<boolean> =>
	(await client.sdiff('GM')).includes(id)
