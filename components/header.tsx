import { signOut, useSession } from 'next-auth/react'
import NextLink from 'next/link'

const Header: React.FC = () => {
	const session = useSession()
	return (
		<header className="flex justify-around p-4 items-center border-b-2 border-zinc-900 text-zinc-900">
			<NextLink href="/">
				<h2 className="font-bold text-2xl">HATEJS</h2>
			</NextLink>
			<ul className="flex gap-8 font-semibold">
				<li className="grid place-items-center">
					<NextLink href="/">HOME</NextLink>
				</li>
				<li className="grid place-items-center">
					<NextLink href="/blog">BLOG</NextLink>
				</li>
				{session.data && (
					<>
						<li className="flex">
							<button
								title="logout"
								onClick={async () => await signOut()}
							>
								<svg
									baseProfile="tiny"
									height="24px"
									id="Layer_1"
									version="1.2"
									viewBox="0 0 24 24"
									width="24px"
									xmlSpace="preserve"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
								>
									<g>
										<path d="M11.5,18.573c-1.736,0-3.368-0.676-4.596-1.903C5.677,15.442,5,13.81,5,12.073s0.677-3.369,1.904-4.597   c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414C7.468,9.741,7,10.871,7,12.073s0.468,2.333,1.318,3.183   c0.85,0.85,1.979,1.317,3.182,1.317s2.332-0.468,3.182-1.317c0.851-0.85,1.318-1.98,1.318-3.183s-0.468-2.333-1.318-3.183   c-0.391-0.391-0.391-1.023,0-1.414s1.023-0.391,1.414,0C17.323,8.705,18,10.337,18,12.073s-0.677,3.369-1.904,4.597   C14.868,17.897,13.236,18.573,11.5,18.573z" />
									</g>
									<g>
										<path d="M11.5,11c-0.553,0-1-0.448-1-1V5c0-0.552,0.447-1,1-1s1,0.448,1,1v5C12.5,10.552,12.053,11,11.5,11z" />
									</g>
								</svg>
							</button>
						</li>
						{session.data.user && session.data.user.image && (
							<li className="flex">
								<img
									className="h-10 rounded-full border border-zinc-900"
									src={session.data.user.image}
									alt="profile picture"
								/>
							</li>
						)}
					</>
				)}
			</ul>
		</header>
	)
}

export default Header
