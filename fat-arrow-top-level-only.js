module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: `
      
        Our ESLint rule is designed to promote a modern, clean, and consistent coding style across your TypeScript project by enforcing the use of ES6 classes and fat arrow functions at the top level. 
        
        Reasons:
        
        Consistency: Ensures uniformity in function declarations throughout your codebase.
        Cleaner Syntax: Takes advantage of the concise syntax that fat arrow functions offer.
        this Binding Clarity: Mitigates common pitfalls associated with the this keyword found in traditional function declarations.
        Modernization: Keeps your codebase in line with modern JavaScript standards.
        Full Use of TypeScript: Encourages the use of TypeScript features like static typing, interfaces, and access modifiers through ES6 classes.
        Avoids Hoisting Issues: By not hoisting fat arrow functions, it requires developers to declare functions before use, preventing potential hoisting-related bugs.
        `,
    },
    messages: {
      noTopLevelFunction: "Top-level function is not allowed.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      FunctionDeclaration(node) {
        if (node.parent.type === "Program") {
          context.report({
            node,
            messageId: "noTopLevelFunction",
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const functionText = sourceCode.getText(node);

              // Extracting the function name
              const functionName = node.id.name;

              // Extracting the parameters
              const params = node.params
                .map((param) => sourceCode.getText(param))
                .join(", ");

              // Extracting the function body
              const bodyText = functionText.slice(
                functionText.indexOf("{"),
                functionText.length
              );

              // Creating the arrow function expression
              const arrowFunctionText = `const ${functionName} = (${params}) => ${bodyText}`;

              // Replacing the function declaration with arrow function expression
              return fixer.replaceText(node, arrowFunctionText);
            },
          });
        }
      },
    };
  },
};
