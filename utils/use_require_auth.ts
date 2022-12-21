import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useRequireAuth = () => {
	const { data: session } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (!session && typeof session !== 'undefined') {
			router.push('/panel/login')
		}
	}, [session, router])

	return session
}

export default useRequireAuth
