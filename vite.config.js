import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';
import postcssNesting from 'postcss-nesting';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
	plugins: [vue(), mkcert()],
	resolve: {
		alias: {
			'@': fileURLToPath(
				new URL('./src/', import.meta.url), //
			),
		},
	},
	build: {
		emptyOutDir: true,
		target:
			process.env.TAURI_ENV_PLATFORM == 'windows'
				? 'chrome105'
				: 'safari13',
		minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
		sourcemap: !!process.env.TAURI_ENV_DEBUG,
	},
	server: {
		https: true,
		port: 5173,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: 'ws',
					host,
					port: 1421,
			  }
			: undefined,
		watch: {
			ignored: ['**/src-tauri/**'],
		},
	},
	envPrefix: ['VITE_', 'TAURI_ENV_*'],
	css: {
		postcss: {
			plugins: [postcssNesting],
		},
	},
	clearScreen: false,
});
