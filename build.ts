import { build } from 'esbuild';

build({
	entryPoints: ['./src/frontend/index.tsx'],
	bundle: true,
	outfile: './public/main.js',
	watch: true,
	sourcemap: 'both',
}).catch(() => process.exit(1))