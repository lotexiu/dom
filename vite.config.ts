import { defineConfig } from 'vite';

const external = [/^@lotexiu\/typescript($|\/)/];

export default defineConfig({
	build: {
		minify: false,
		lib: {
			entry: './src/index.ts',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
		},
		rollupOptions: { external },
	},
});
