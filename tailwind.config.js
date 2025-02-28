/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				basicGreen: '#00B69B',
				grayTxt: '#666',
				graphBlack: '#333333',
				graphGreen: '#34C6BD',
				basicWhite: '#fff',
				basicBlack: '#000',
				mistGray: '#f8f9fa',
				paleGray: '#F6F6FB',
				basicZinc: '#ACB9C1',
				silverGray: '#BCBCBC',
				slateGrey: '#839198',
				colorMint: '#E5F8F5',
				basicRed: '#EC2E2E',
				basicSilver: '#C7C7C7',
				softBlue: '#CCE1FB',
				darkBlue: '#0171FF',
				accentBlue: '#6467FF',
				neutralGray: '#787878',
			},
			fontFamily: {
				poppins: ['Poppins', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
