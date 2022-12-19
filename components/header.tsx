import NextLink from 'next/link'

const Header: React.FC = () => (
	<header className="flex justify-around p-4 items-center border-b-2 border-zinc-900 text-zinc-900">
		<NextLink href="/">
			<h2 className="font-bold text-2xl">HATEJS</h2>
		</NextLink>
		<ul className="flex gap-8 font-semibold">
			<NextLink href="/">
				<li>HOME</li>
			</NextLink>
			<NextLink href="/blog">
				<li>BLOG</li>
			</NextLink>
		</ul>
	</header>
)

export default Header
