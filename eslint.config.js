import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      // disable ESLint rules that conflict with Prettier (provide config object for typescript-eslint)
      prettierConfig.configs && prettierConfig.configs.recommended
        ? prettierConfig.configs.recommended
        : {},
    ],
    plugins: {
      // register plugin so we can use the prettier rule
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // run Prettier as an ESLint rule and display issues as ESLint problems
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          semi: true,
          tabWidth: 2,
          printWidth: 80,
          trailingComma: "all",
        },
      ],
      // enforce semicolons at end of statements
      semi: ["error", "always"],
    },
  },
]);
