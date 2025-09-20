# JavaScript Advanced Concepts

## 1. Callback Functions

### What are Callback Functions?
A callback function is a function that is passed as an argument to another function and is executed after some operation has been completed.

### Simple Example:
```javascript
// Function that takes a callback
function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        console.log("Data fetched!");
        callback(); // Execute the callback function
    }, 2000);
}

// Callback function
function processData() {
    console.log("Processing the fetched data...");
}

// Using the callback
fetchData(processData);
```

### Real-world Example with Parameters:
```javascript
// Calculator with callback
function calculate(a, b, operation) {
    return operation(a, b);
}

// Callback functions
function add(x, y) {
    return x + y;
}

function multiply(x, y) {
    return x * y;
}

function subtract(x, y) {
    return x - y;
}

// Using callbacks
console.log(calculate(5, 3, add));      // 8
console.log(calculate(5, 3, multiply)); // 15
console.log(calculate(5, 3, subtract)); // 2
```

### Interview Answer:
**Question:** What are callback functions and why are they useful?

**Answer:** A callback function is a function that is passed as an argument to another function and gets executed after the main function completes its task. They are useful because:

1. **Asynchronous Operations:** They help handle async operations like API calls, file reading, or timers
2. **Event Handling:** Used in event listeners where the callback executes when an event occurs
3. **Code Organization:** They help separate concerns and make code more modular
4. **Error Handling:** Can be used to handle both success and error scenarios

**Example:** When fetching data from an API, we pass a callback that processes the data once it's received, allowing the program to continue running without blocking.

---

## 2. Higher-Order Functions

### What are Higher-Order Functions?
Higher-order functions are functions that can take other functions as arguments, return functions as their result, or both.

### Example 1: Function as Argument
```javascript
// Higher-order function that takes a function as argument
function performOperation(numbers, operation) {
    return numbers.map(operation);
}

// Functions to be passed as arguments
function double(x) {
    return x * 2;
}

function square(x) {
    return x * x;
}

const numbers = [1, 2, 3, 4, 5];

console.log(performOperation(numbers, double)); // [2, 4, 6, 8, 10]
console.log(performOperation(numbers, square)); // [1, 4, 9, 16, 25]
```

### Example 2: Function as Return Value
```javascript
// Higher-order function that returns a function
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

// Creating specific multiplier functions
const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(double(5));    // 10
console.log(triple(5));    // 15
console.log(quadruple(5)); // 20
```

### Example 3: Both (takes and returns functions)
```javascript
// Function that takes a function and returns a modified version
function withLogging(originalFunction) {
    return function(...args) {
        console.log(`Calling function with arguments: ${args}`);
        const result = originalFunction(...args);
        console.log(`Function returned: ${result}`);
        return result;
    };
}

// Original function
function add(a, b) {
    return a + b;
}

// Enhanced function with logging
const addWithLogging = withLogging(add);

console.log(addWithLogging(3, 5)); // Logs the call and result
```

### Interview Answer:
**Question:** What are higher-order functions and give an example?

**Answer:** Higher-order functions are functions that can accept other functions as arguments, return functions as output, or both. They are a fundamental concept in functional programming.

**Key characteristics:**
1. **Function as Parameter:** Can take functions as arguments
2. **Function as Return Value:** Can return functions
3. **Abstraction:** Help create more generic, reusable code

**Example:** Array methods like `map()`, `filter()`, and `reduce()` are higher-order functions because they take callback functions as arguments.

**Benefits:**
- **Code Reusability:** Write generic functions that work with different operations
- **Composition:** Can combine functions to create complex behaviors
- **Abstraction:** Hide implementation details and focus on what the function does

---

## 3. Closures & Lexical Scope

### What are Closures?
A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.

### Simple Closure Example:
```javascript
function createCounter() {
    let count = 0; // This variable is in the outer scope

    return function() { // This function forms a closure
        count++; // It can access and modify the outer variable
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

### Lexical Scope Example:
```javascript
// Lexical scope determines variable access based on where functions are defined
const globalVar = "I'm global";

function outerFunction() {
    const outerVar = "I'm from outer function";

    function innerFunction() {
        const innerVar = "I'm from inner function";
        console.log(globalVar);    // ✅ Can access global variable
        console.log(outerVar);     // ✅ Can access outer function variable
        console.log(innerVar);      // ✅ Can access own variable
    }

    return innerFunction;
}

const myFunction = outerFunction();
myFunction();
```

### Practical Closure Examples:

#### Example 1: Private Variables
```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable

    return {
        getBalance: function() {
            return balance;
        },
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            return "Insufficient funds";
        }
    };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // 1000
account.deposit(500);              // 1500
console.log(account.getBalance()); // 1500
```

#### Example 2: Function Factory
```javascript
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeting("Hello");
const sayHi = createGreeting("Hi");
const sayGoodMorning = createGreeting("Good morning");

console.log(sayHello("John"));    // "Hello, John!"
console.log(sayHi("Jane"));       // "Hi, Jane!"
console.log(sayGoodMorning("Bob")); // "Good morning, Bob!"
```

### Interview Answer:
**Question:** What are closures and how do they work?

**Answer:** A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has completed execution. It "closes over" the variables in its lexical scope.

**How it works:**
1. **Lexical Scope:** JavaScript uses lexical scoping, meaning functions remember the environment where they were created
2. **Variable Access:** Inner functions can access variables from their outer scope
3. **Persistence:** These variables persist even after the outer function returns

**Example:** When you create a counter function, the inner function maintains access to the count variable even after createCounter() has finished executing.

**Use cases:**
- **Data Privacy:** Creating private variables that can't be accessed from outside
- **Function Factories:** Creating specialized functions based on parameters
- **Maintaining State:** Preserving state between function calls
- **Partial Application:** Pre-filling some function arguments

---

## 4. Pure Functions & Immutability

### What are Pure Functions?
Pure functions are functions that:
1. Always return the same output for the same input
2. Have no side effects (don't modify external state)

### Pure Function Examples:
```javascript
// ✅ Pure function - always returns same output for same input
function add(a, b) {
    return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (always the same)

// ✅ Pure function - no side effects
function multiplyByTwo(numbers) {
    return numbers.map(num => num * 2);
}

const original = [1, 2, 3];
const doubled = multiplyByTwo(original);

console.log(original); // [1, 2, 3] (unchanged)
console.log(doubled);  // [2, 4, 6] (new array)
```

### Impure Function Examples:
```javascript
// ❌ Impure - modifies external state
let total = 0;
function addToTotal(amount) {
    total += amount; // Side effect!
    return total;
}

// ❌ Impure - depends on external state
function getRandomNumber() {
    return Math.random(); // Different output each time
}

// ❌ Impure - modifies input
function addToArray(arr, item) {
    arr.push(item); // Modifies the original array
    return arr;
}
```

### What is Immutability?
Immutability means that once a value is created, it cannot be changed. Instead of modifying existing data, we create new data.

### Immutability Examples:

#### With Primitive Values:
```javascript
// ✅ Immutable - primitives are always immutable
let name = "John";
let newName = name.toUpperCase(); // Creates new string
console.log(name);    // "John" (unchanged)
console.log(newName); // "JOHN" (new value)
```

#### With Objects (Making them Immutable):
```javascript
// ❌ Mutable - can be changed
const person = { name: "John", age: 30 };
person.age = 31; // This modifies the original object

// ✅ Immutable approach - create new object
const updatedPerson = {
    ...person,        // Copy existing properties
    age: 31          // Override specific property
};

console.log(person);        // { name: "John", age: 30 }
console.log(updatedPerson); // { name: "John", age: 31 }
```

#### With Arrays (Making them Immutable):
```javascript
// ❌ Mutable - modifies original array
const numbers = [1, 2, 3];
numbers.push(4); // Modifies original array

// ✅ Immutable approaches
const originalNumbers = [1, 2, 3];

// Method 1: Spread operator
const newNumbers1 = [...originalNumbers, 4];

// Method 2: Array methods that return new arrays
const newNumbers2 = originalNumbers.concat(4);
const newNumbers3 = originalNumbers.map(n => n);
const newNumbers4 = originalNumbers.filter(n => n < 3);

console.log(originalNumbers); // [1, 2, 3] (unchanged)
console.log(newNumbers1);     // [1, 2, 3, 4]
console.log(newNumbers2);     // [1, 2, 3, 4]
```

### Interview Answer:
**Question:** What are pure functions and why is immutability important?

**Answer:** Pure functions are functions that always return the same output for the same input and have no side effects. They don't modify external state or depend on external variables.

**Characteristics of pure functions:**
1. **Deterministic:** Same input always produces same output
2. **No Side Effects:** Don't modify external variables, DOM, files, etc.
3. **Referential Transparency:** Can be replaced with their return value

**Immutability** means data cannot be changed after creation. Instead of modifying existing data, we create new data structures.

**Benefits:**
1. **Predictability:** Pure functions are easier to test and debug
2. **Thread Safety:** No shared mutable state means fewer concurrency issues
3. **Caching:** Results can be cached since they're deterministic
4. **Undo/Redo:** Easier to implement with immutable data structures
5. **Performance:** Modern JavaScript engines optimize immutable operations

**Example:** React uses immutability extensively - when state changes, new objects are created rather than mutating existing ones, making change detection more efficient.

---

## Summary

### Key Takeaways:

1. **Callback Functions:** Functions passed as arguments to other functions, essential for async operations and event handling.

2. **Higher-Order Functions:** Functions that work with other functions, enabling functional programming patterns and code reusability.

3. **Closures:** Functions that capture variables from their lexical scope, useful for data privacy and maintaining state.

4. **Pure Functions & Immutability:** Functions without side effects and data that doesn't change, leading to more predictable and maintainable code.

### Best Practices:
- Use callbacks for async operations
- Leverage higher-order functions for code abstraction
- Use closures for data encapsulation
- Prefer pure functions and immutable data for predictable behavior
- Always consider the scope when writing nested functions

These concepts form the foundation of functional programming in JavaScript and are crucial for writing clean, maintainable, and bug-free code.
