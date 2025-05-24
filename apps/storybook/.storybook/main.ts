import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: [
    "../../../apps/**/*.mdx",
    "../../../packages/**/*.mdx",
    "../../../apps/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-actions"],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(viteConfig) {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(svgr());
    return viteConfig;
  },
};

export default config;
