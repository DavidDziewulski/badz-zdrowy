import * as path from 'path';
import { build } from 'esbuild';
import EsbuildStyle from 'esbuild-style-plugin';
import LessGlobImporter from 'less-plugin-glob';

build({
	incremental: true,
	entryPoints: ['./src/frontend/index.tsx'],
	bundle: true,
	minify: true,
	outfile: './public/main.js',
	watch: {
		onRebuild: () => {
			console.log('🔧[frontend]: Builded!');
		},
	},
	sourcemap: 'both',
	plugins: [EsbuildStyle({
		renderOptions: {
			lessOptions: {
				plugins: [LessGlobImporter],
				paths: [path.resolve(__dirname, './src/frontend')],
			},
		},
	})],
}).catch(() => process.exit(1));
