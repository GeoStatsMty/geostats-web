import baseConfig from "./base.eslint.config.mjs";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  ...baseConfig,
  ...compat.config({
    extends: ["plugin:@next/next/recommended"],
  }),
];
