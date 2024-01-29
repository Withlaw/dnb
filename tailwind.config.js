import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			keyframes: {
				fade_up: {
					'0%': { transform: 'translateY(50%)', opacity: '0.5' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				shimmer: {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
			},
			animation: {
				tok: 'fade_up 0.3s ease-out',
			},
		},
	},
	plugins: [],
};
