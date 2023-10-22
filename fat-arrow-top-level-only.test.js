const { RuleTester } = require("eslint");
const fatArrowsOnly = require("./fat-arrow-top-level-only.js");

const ruleTester = new RuleTester({
  // Must use at least ecmaVersion 2015 because
  // that's when `const` variables were introduced.
  parserOptions: { ecmaVersion: 6 },
});

ruleTester.run("fat-arrows-only", fatArrowsOnly, {
  valid: [
    {
      code: "const foo = (param) => { return param + 1; }",
    },
  ],
  invalid: [
    {
      code: "function foo(param) { return param + 1; }",
      output: "const foo = (param) => { return param + 1; }",
      errors: [
        {
          message: "Top-level function is not allowed.",
          type: "FunctionDeclaration",
        },
      ],
    },
  ],
});

console.log("All tests passed!");
