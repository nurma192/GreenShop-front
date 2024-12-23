const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		// "./node_modules/@nextui-org/theme/dist/components/(listbox|divider).js",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#46A358',
				secondary: '#fafafa',
				'text-color':'#3D3D3D'
			},
			fontFamily: {
				'cera': ['"Cera Pro Regular"', 'sans-serif'],
			},
			screens: {
				xs: '480px',
				md: '768px',
				xl: '1000px',
				xl2: '1200px',
			},
		},
	},
	plugins: [nextui({
		theme: {
			colors: {
				primary: '#46A358',
				secondary: '#fafafa',
			},
		},
	})],
};
