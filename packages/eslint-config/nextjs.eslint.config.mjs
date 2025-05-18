import config from './base.eslint.config.mjs';
//import nextEslintConfig from 'eslint-config-next';
import {defineConfig} from 'eslint/config';

// temporarily removed nextjs's eslint config because of an internal compatibility issue
export default defineConfig([...config /**...nextEslintConfig**/]);
