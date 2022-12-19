/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			body: ['"Fira Sans"', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}
