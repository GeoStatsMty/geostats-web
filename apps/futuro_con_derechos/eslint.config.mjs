import {base} from 'eslint-config';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([...base, globalIgnores(['dist/', '.turbo/', '.next/'])]);
