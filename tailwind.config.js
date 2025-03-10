/** @type {import('tailwindcss').Config} */
const { COLORS } = require('./src/constants/colors.ts');

module.exports = {
	darkMode: ['class'],
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: COLORS,
			fontFamily: {
				poppins: ['Poppins', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				slide: {
					'0%, 100%': {
						transform: 'translateX(0)',
					},
					'50%': {
						transform: 'translateX(100%)',
					},
				},
			},
			animation: {
				slide: 'slide 2s ease-in-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
