/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE');

	return {
		plugins: [react(), eslint()],
		resolve: {
			alias: {
				'@': '/src',
			},
		},
		server: {
			proxy: {
				'/api': {
					target: env.VITE_SUPABASE_BASE_URL,
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
	};
});
