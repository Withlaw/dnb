/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	plugins: [react(), eslint()],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://openapi.naver.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test-setup.ts',
		css: false,
	},
});
