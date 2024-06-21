import { SvelteKitPWA } from '@vite-pwa/sveltekit'
import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'prompt',
			injectRegister: false,

			pwaAssets: {
				disabled: false,
				config: true
			},

			manifest: {
				name: 'Notes SE',
				short_name: 'Notes SE',
				description: 'Scratch notes with fast cross sync',
				theme_color: '#252628'
			},

			workbox: {
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp}'],
				cleanupOutdatedCaches: true,
				clientsClaim: true
			},

			devOptions: {
				enabled: false,
				suppressWarnings: true,
				navigateFallback: '/',
				navigateFallbackAllowlist: [/^\/$/],
				type: 'module'
			}
		})
	]
})
