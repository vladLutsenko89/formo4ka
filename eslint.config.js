const js = require("@eslint/js");

export default [
  js.configs.recommended,
  {
    plugins: ["prettier"],
    rules: {
      quotes: "single",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "prettier/prettier": ["error", { singleQuote: true }],
    },
  },
];
