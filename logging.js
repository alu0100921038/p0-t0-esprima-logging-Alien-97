let escodegen = require('escodegen');
let esprima = require('esprima');
let estraverse = require('estraverse');

function addLogging(code) {
    let ast = esprima.parse(code);
    estraverse.traverse(ast, {
        enter: function(node, parent) {
            if (node.type === 'FunctionDeclaration' ||
                node.type === 'FunctionExpression') {
                addBeforeCode(node);
            }
        }
    });
    return escodegen.generate(ast);
}

function addBeforeCode(node) {
    let name = node.id ? node.id.name : '<anonymous function>';
    let beforeCode = `console.log('Entering ${name}()');`;
    let beforeNodes = esprima.parse(beforeCode).body;
    node.body.body = beforeNodes.concat(node.body.body);
}

const input = `
function foo(a, b) {
  let x = 'blah';
  let y = (function () {
    return 3;
  })();
}
foo(1, 'wut', 3);
`;

const output = addLogging(input);

console.log(`input:\n${input}\n---`);
console.log(`output:\n${output}\n---`);
