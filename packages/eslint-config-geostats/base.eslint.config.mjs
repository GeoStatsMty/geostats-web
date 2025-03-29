import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginSonarJs from "eslint-plugin-sonarjs";
import pluginSecurity from "eslint-plugin-security";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginDepend from "eslint-plugin-depend";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import { globalIgnores } from "eslint/config";

export default [
  globalIgnores(["./dist/**"]),
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginUnicorn.configs["flat/recommended"],
  pluginSecurity.configs.recommended,
  pluginReactConfig.configs.flat.recommended,
  pluginSonarJs.configs.recommended,
  pluginReactHooks.configs["recommended-latest"],
  pluginDepend.configs["flat/recommended"],
  pluginJsxA11y.flatConfigs.recommended,
  prettierRecommended,
  {
    rules: {
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            props: false,
            ref: false,
            args: false,
            env: false,
          },
        },
      ],
      // "react-redux/no-unused-prop-types": "off", // weird duplicate rule that causes false positives
      "react/react-in-jsx-scope": "off",
    },
  },
];
