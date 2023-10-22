// Import the ESLint plugin locally
const fatArrowsTopLevel = require("./eslint-fat-arrow-plugin");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
    },
    plugins: { fatArrowsOnly: fatArrowsTopLevel },
    rules: {
      "fatArrowsOnly/fat-arrows-top-level-only": "error",
    },
  },
];
