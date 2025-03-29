import sharedConfig from 'eslint-config-geostats/nextjs.eslint.config.mjs';
import {globalIgnores} from 'eslint/config';

export default [...sharedConfig, globalIgnores(['coverage/**'])];
