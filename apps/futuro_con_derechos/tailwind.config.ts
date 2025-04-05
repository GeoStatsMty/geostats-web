import sharedConfig from 'tailwind-config-geostats';
import {Config} from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets'> = {
	presets: [sharedConfig],
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
};
export default config;
