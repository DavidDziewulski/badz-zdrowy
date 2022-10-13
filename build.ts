import { build } from 'esbuild';

build({
	entryPoints: ['./src/frontend/index.ts'],
	bundle: true,
	outfile: './public/main.js',
	watch: true,
}).catch(() => process.exit(1))