import {defineConfig} from 'tsup';
import svgr from 'esbuild-plugin-svgr';
import jsx from '@svgr/plugin-jsx';
import {preserveDirectivesPlugin} from 'esbuild-plugin-preserve-directives';

export default defineConfig(options => ({
	banner: {},
	entry: ['src/**/*.tsx', 'src/**/*.ts'],
	format: ['esm'],
	dts: true,
	sourcemap: true,
	external: ['react', 'react-dom'],
	esbuildPlugins: [
		svgr({svgo: false, plugins: [jsx]}),
		preserveDirectivesPlugin({
			directives: ['use client'],
			include: /\.(js|ts|jsx|tsx)$/,
			exclude: /node_modules/,
		}),
	],
	...options,
}));
