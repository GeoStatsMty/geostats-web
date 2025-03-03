/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.stories.{ts,tsx,jsx,js}",
    "../../packages/geostats-ui/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};