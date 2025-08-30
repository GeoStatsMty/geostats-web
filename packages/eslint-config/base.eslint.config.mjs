import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// no need to replace this for now
// eslint-disable-next-line depend/ban-dependencies
import pluginReact from 'eslint-plugin-react';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginSonarJs from 'eslint-plugin-sonarjs';
import pluginSecurity from 'eslint-plugin-security';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import dependPlugin from 'eslint-plugin-depend';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import {defineConfig} from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
	{languageOptions: {globals: globals.browser}},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	jsxA11yPlugin.flatConfigs.recommended,
	dependPlugin.configs['flat/recommended'],
	jsdocPlugin.configs['flat/recommended-typescript'],
	pluginReactHooks.configs['recommended-latest'],
	pluginSecurity.configs.recommended,
	pluginSonarJs.configs.recommended,
	pluginUnicorn.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		rules: {
			'sonarjs/void-use': 'off',
			'jsdoc/require-jsdoc': [
				'warn',
				{
					// The fixer is annoying
					enableFixer: false,
				},
			],
			// Both the @params and @returns directives are not
			// required on functions that start with a capital letter (React components).
			'jsdoc/require-param': [
				'warn',
				{
					contexts: ['FunctionDeclaration:not([id.name=/^[A-Z].+/])'],
				},
			],
			'jsdoc/require-returns': [
				'warn',
				{
					contexts: ['FunctionDeclaration:not([id.name=/^[A-Z].+/])'],
				},
			],
			'unicorn/no-null': 'off',
			'unicorn/prevent-abbreviations': [
				'error',
				{
					replacements: {
						props: false,
						ref: false,
						args: false,
						env: false,
						utils: false,
					},
				},
			],
			'react/react-in-jsx-scope': 'off',
		},
	},
	{
		ignores: ['dist/**, src/routeTree.gen.ts'],
	},
]);
