import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = ({ children, ...props }) => (
	<button
		{...props}
		className={
			'rounded border border-zinc-700 p-1 hover:bg-zinc-600 hover:text-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 focus:ring-zinc-400' +
			` ${props.className}`
		}
	>
		{children}
	</button>
)
export default Button
