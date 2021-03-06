Explicación código práctica esprima, fichero logging.js, se encuentra abajo

## About

This repository contains code samples from the talks:

1. [Parsing, Compiling, and
Static Metaprogramming][talk] at JSConfEU 2013 by Patrick Dubroy. 
    - You can find [slides for the talk on Speaker Deck](https://speakerdeck.com/pdubroy/parsing-compiling-and-static-metaprogramming)
2. [Master the Art of the AST and Take Control of Your JS][ast]  by Yonatan Mevorach. 
    - [Here are the slides](ast-talk-codemotion-170406094223.pdf)
3. [Talk on the same topic at Javascript Israel](https://500tech.com/blog/all/yonatan-mevorach-on-abstract-syntax-trees)  by Yonatan Mevorach

[talk]: http://2013.jsconf.eu/speakers/patrick-dubroy-parsing-compiling-and-static-metaprogramming.html

## Talk Master the Art of the AST and Take Control of Your JS by Yonatan Mevorach

* See also the video [Master the Art of the AST and Take Control of Your JS][ast]. 
* [Here is another version of the talk at Javascript Israel](https://500tech.com/blog/all/yonatan-mevorach-on-abstract-syntax-trees) 
* [Here are the slides](ast-talk-codemotion-170406094223.pdf)

[ast]: https://youtu.be/C06MohLG_3s

### ASTExplorer

* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>

### ESLint Piggyback example

* <a href="https://eslint.org/docs/developer-guide/working-with-plugins" target="_blank">ESLint: Working with Plugins</a>
* <a href="https://github.com/cowchimp/eslint-plugin-piggyback" target="_blank">eslint-plugin-piggyback</a>

### Babel remove "debugger" example

* <a href="http://docs.w3cub.com/babel/plugins/transform-remove-debugger/" target="_blank">Babel plugin Remove debugger transform. This plugin removes all `debugger;` statements</a>
* <a href="https://github.com/babel/minify/tree/a24dd066f16db5a7d5ab13c2af65e767347ef550/packages/babel-plugin-transform-remove-debugger" target="_blank">babel-plugin-transform-remove-debugger at GitHub</a>

### jscodeshift example

* <a href="https://github.com/facebook/jscodeshift" target="_blank">codeshift at GitHub</a>
* <a href="https://www.toptal.com/javascript/write-code-to-rewrite-your-code" target="_blank">Write Code to Rewrite Your Code: jscodeshift</a>
* <a href="https://glebbahmutov.com/blog/jscodeshift-example/" target="_blank">jscodeshift example</a>
* <a href="https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js" target="_blank">jscodeshift cpojer/js-codemod no-vars.js</a>

### Repositorios interesantes de cowchimp

* <a href="https://github.com/cowchimp/astscout" target="_blank">AST Scout is a tool for analyzing and visualizing the relationship between the public API of a Class\Module and its implementations details (e.g. private methods, dependencies used).</a>
* <a href="https://github.com/cowchimp/astexplorer" target="_blank">A web tool to explore the ASTs generated by various parsers. https://astexplorer.net/</a>
* <a href="https://github.com/cowchimp/awesome-ast" target="_blank">A curated list of awesome AST resources</a>


##  Talk Parsing, Compiling, and Static Metaprogramming at JSConfEU 2013 by Patrick Dubroy. 

### Esprima Examples

* `checkstyle.coffee` and `logging.coffee` contain the original source code for
the style checker and logging examples presented in the talk. 
* `checkstyle.js` and `logging.js` are the slightly simplified JS versions that were shown in
the talk.
* `syntax-highlight.js` is taken from the Esprima tutorial [Chapter 3. Lexical Analysis (Tokenization)¶](http://esprima.readthedocs.io/en/latest/lexical-analysis.html)

### PEG.js Example

`altjs.coffee` is the code for the "AltJS language in 5 minutes" section
presented in the second half of the talk.

### Extra Special Bonus!

`idgrep.coffee` (and `idgrep.js`) is another example of using Esprima
to do static analysis on JavaScript code.

### REPL example

```js
> esprima = require('esprima')
{ parse: [Function: parse],
  parseModule: [Function: parseModule],
  parseScript: [Function: parseScript],
  tokenize: [Function: tokenize],
  Syntax: 
   { ... },
  version: '4.0.1' }

> esprima.tokenize('answer = 42', { range: true })
[ { type: 'Identifier', value: 'answer', range: [ 0, 6 ] },
  { type: 'Punctuator', value: '=', range: [ 7, 8 ] },
  { type: 'Numeric', value: '42', range: [ 9, 11 ] } ]

> esprima.parseScript('const answer = 42', { tokens: true })
Script {
  type: 'Program',
  body: 
   [ VariableDeclaration {
       type: 'VariableDeclaration',
       declarations: [Array],
       kind: 'const' } ],
  sourceType: 'script',
  tokens: 
   [ { type: 'Keyword', value: 'const' },
     { type: 'Identifier', value: 'answer' },
     { type: 'Punctuator', value: '=' },
     { type: 'Numeric', value: '42' } ] }

> inspect = require('util')
{ ... }

> console.log(util.inspect(esprima.parseScript('answer = 42'), {depth: null}))
Script {
  type: 'Program',
  body: 
   [ ExpressionStatement {
       type: 'ExpressionStatement',
       expression: 
        AssignmentExpression {
          type: 'AssignmentExpression',
          operator: '=',
          left: Identifier { type: 'Identifier', name: 'answer' },
          right: Literal { type: 'Literal', value: 42, raw: '42' } } } ],
  sourceType: 'script' }
undefined
> 
```
---------------------------------------------------------------------------------------------------------------------------
## Explicación código logging.js

* Este fichero contiene el código para el análisis de una cadena que recibe como entrada, esta cadena consiste en una función no anónima que contiene llamadas a funciones anónimas, el código en Javascript identifica dichas funciones y las muestra por pantalla.

- A continuación se explica el cometido de las funciones implementadas:

- let escodegen = require('escodegen');  Herramienta que genera el output
- let esprima = require('esprima'); Parseador, genera los tokens a partir del input, y a partir de estos construye el Abstract Syntax Tree (AST)
- let estraverse = require('estraverse'); Herramienta para recorrer un Abstract Syntax Tree, un árbol de 

-------------------------------------------------------

## addLogging(code)

* Función que analiza el AST en busca de funciones anónimas y no anónimas
function addLogging(code) { 
    - let ast = esprima.parse(code); Parsea el código de entrada generando el Abstract Syntax Tree
    - estraverse.traverse(ast, {  Se realiza el recorrido del árbol de sintaxis abstracto para clasificar los tokens, en este
        - enter: function(node, parent) { Funcion anónima, recibe como parámetros el nodo que se analiza actualmente y su nodo padre
            - if (node.type === 'FunctionDeclaration' ||  Se comprueba si el nodo contiene una función no anónima (FunctionDeclaration) o una función  anónima (FuntionExpression), si se cumple cualquiera de los dos casos, se invoca el método addBeforeCode, que muestra por pantalla el tipo de función 
                node.type === 'FunctionExpression') { 
                addBeforeCode(node); 
            } 
        }
    });
    - return escodegen.generate(ast); //Genera el código a partir del análisis del AST
}

## addBeforeCode(node)

* Función que agrega los comentarios al input
function addBeforeCode(node) {
    - let name = node.id ? node.id.name : '<anonymous function>';  El identificador del nodo o token indica su nombre, si la función no tiene nombre, es decir, su id está a NULL, eso significa  que es anónima, de lo contrario, se considera no anónima.

    - let beforeCode = `console.log('Entering ${name}()');`;  let es un tipo de variable que existe dentro del contexto léxico en el que se ha definido, en este caso, la función, se le podría llamar variable local, en este caso estamos mostrando el mensaje que indica si es una variable anónima o tiene un nombre, de acuerdo a lo especificado en la línea 153


    - let beforeNodes = esprima.parse(beforeCode).body; 
    node.body.body = beforeNodes.concat(node.body.body);
}

* const input = ` 
function foo(a, b) {
  var x = 'blah';
  var y = (function ()  {
    return 3;
  })();
}
foo(1, 'wut', 3);
`;

* const output = addLogging(input); El output es el resultado de la ejecución de addLogging, que a su vez invoca a addBeforeCode como hemos explicado


* console.log(`input:\n${input}\n---`); //  Se imprime por pantalla la cadena de entrada
* console.log(`output:\n${output}\n---`);// Se imprime por pantalla la salida, que incluye las cadenas que indican el tipo de función.
