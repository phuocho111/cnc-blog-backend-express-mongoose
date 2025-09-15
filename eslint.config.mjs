import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "off",

      "nuxt/no-globals-in-created": "off",
      "vue/no-lone-template": "off",
      "vue/no-unused-components": "warn",
      "vue/attribute-hyphenation": "off",
    },
  },
]);
