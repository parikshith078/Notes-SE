import type { Config } from 'tailwindcss'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			primary: '#00650F',
			gray: {
        200: '#cccccc',
				400: '#9D9D9E',
				700: '#252628',
				900: '#1E1E1E'
			},
			white: '#f7f7f7'

		},

		extend: {}
	},

	plugins: []
} as Config
