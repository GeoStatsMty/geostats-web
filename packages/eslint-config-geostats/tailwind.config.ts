import type {Config} from 'tailwindcss';
import sharedConfig from 'tailwind-config-geostats';

const config: Pick<Config, 'prefix' | 'presets'> = {
	presets: [sharedConfig],
};

export default config;
