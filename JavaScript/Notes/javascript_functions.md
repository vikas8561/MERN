# JavaScript Functions

## 1. Ways to Write Functions

In JavaScript, functions can be written in several ways:

### Function Declaration
```javascript
function greet() {
  console.log("Hello!");
}
```

### Function Expression
```javascript
const greet = function() {
  console.log("Hello!");
};
```

### Arrow Function Expression
```javascript
const greet = () => {
  console.log("Hello!");
};
```

### Named Function Expression
```javascript
const greet = function greetFunction() {
  console.log("Hello!");
};
```

### Immediately Invoked Function Expression (IIFE)
```javascript
(function() {
  console.log("Hello!");
})();
```

---

## 2. Function Parameters and Arguments

### Parameters vs Arguments
- **Parameters** are the placeholders (variables) listed in the function definition. They act as local variables within the function.
- **Arguments** are the actual values passed to the function when it is called. These values are assigned to the parameters.

Example:
```javascript
function add(a, b) { // a and b are parameters
  return a + b;
}

add(2, 3); // 2 and 3 are arguments
```

### Flexible Argument Handling
JavaScript functions can be called with any number of arguments, regardless of the number of parameters defined. This is due to JavaScript's dynamic nature.

- If fewer arguments are passed than parameters, the extra parameters are `undefined`.
- If more arguments are passed, the extra ones are ignored unless accessed via the `arguments` object.

Example:
```javascript
function sum(a, b, c) {
  console.log(a, b, c); // 1, 2, undefined
}

sum(1, 2); // Only two arguments passed
```

### Default Parameters
Default parameters allow you to set default values for parameters if no argument is provided or if `undefined` is passed.

```javascript
function greet(name = "Guest", age = 18) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet(); // Hello, Guest! You are 18 years old.
greet("Alice"); // Hello, Alice! You are 18 years old.
greet("Bob", 25); // Hello, Bob! You are 25 years old.
greet("Charlie", undefined); // Hello, Charlie! You are 18 years old.
```

---

---

## 4. Scope of Function

- **Global Scope:** Variables declared outside any function are global.
- **Function Scope:** Variables declared inside a function are local to that function.
- **Block Scope:** Variables declared with `let` or `const` inside blocks `{}` are block-scoped.

Example:
```javascript
let globalVar = "I am global";

function testScope() {
  let localVar = "I am local";
  if(true) {
    let blockVar = "I am block scoped";
    console.log(blockVar); // accessible here
  }
  // console.log(blockVar); // Error: blockVar is not defined
  console.log(localVar); // accessible here
}

testScope();
console.log(globalVar); // accessible here
// console.log(localVar); // Error: localVar is not defined
```

---

## 5. Hoisting in Detail with Execution Context and Example

### What is Hoisting?

Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope (script or function) during the compilation phase.

- Variable declarations (`var`) and function declarations are hoisted.
- Variables declared with `let` and `const` are hoisted but not initialized (Temporal Dead Zone).
- Function expressions and arrow functions are not hoisted.
- Native JS behavior: let / const before declaration → ReferenceError.
- If you see undefined, it’s because:
- Your code is transpiled to var by Babel/TypeScript.
- Or you are using a REPL/IDE that pre-processes/hoists variables.

### Execution Context

- **Creation Phase:** Memory is allocated for variables and functions.
- **Execution Phase:** Code is executed line by line.

# Lexical Scope Example

Lexical scope means variables are accessible based on **where they are written** in the code, not where they are called from.

Here’s an example:


### Example of Hoisting with Variable Declaration
```javascript
console.log(a); // undefined
var a = 5;
console.log(a); // 5
```

### Example of Temporal Dead Zone with `let` and `const`
```javascript
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

### Example of Function Expression Hoisting
```javascript
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log("Hi!");
};
```

![Lexical Scope Diagram](./GEC%20Image.png)



---

