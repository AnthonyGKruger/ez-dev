import js from "@eslint/js";
import pluginRouter from "@tanstack/eslint-plugin-router";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".output", ".vercel", ".tanstack", "docs", "src/routeTree.gen.ts"] },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  { files: ["**/*.js"], extends: [tseslint.configs.disableTypeChecked] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      reactHooks.configs.flat["recommended-latest"],
      jsxA11y.flatConfigs.recommended,
      pluginRouter.configs["flat/recommended"],
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["scripts/**/*.ts", "vite.config.ts", "eslint.config.js"],
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      // House style: arrow functions, not function declarations.
      "func-style": ["error", "expression"],
      "prefer-arrow-callback": "error",
    },
  },
);
