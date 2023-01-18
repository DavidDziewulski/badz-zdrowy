import * as path from 'path';
import Esbuild from 'esbuild';
import EsbuildStyle from 'esbuild-style-plugin';
import LessGlobImporter from 'less-plugin-glob';
import Chokidar from 'chokidar';

const logRebuild = () => console.log('🔧[frontend]: Builded!');

const build = async () => {
	const builder = await Esbuild.build({
		incremental: true,
		entryPoints: ['./src/frontend/index.tsx'],
		bundle: true,
		minify: true,
		outfile: './public/main.js',
		watch: {
			onRebuild: logRebuild,
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
	});
	Chokidar
		.watch('./src/**/*.less', {
			persistent: true,
			ignoreInitial: true,
		})
		.on('all', () => {
			builder.rebuild().then(logRebuild);
		});

	logRebuild();
};

build().catch(() => {
	process.exit(1);
});
