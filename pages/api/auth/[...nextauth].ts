import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import { client } from '../../../utils/redis'

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GH_ID!,
			clientSecret: process.env.GH_SECRET!,
			profile: (profile) => ({
				id: profile.id,
				name: profile.name || profile.login,
				email: profile.email,
				image: profile.avatar_url,
			}),
		}),
	],
	secret: process.env.AUTH_SECRET,
	adapter: UpstashRedisAdapter(client, { baseKeyPrefix: 'users_auth' }),
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
	},
}

export default NextAuth(authOptions)
