import baseConfig from 'eslint-config-geostats/base.eslint.config.mjs';
import {globalIgnores} from 'eslint/config';

export default [...baseConfig, globalIgnores(['dist/'])];
