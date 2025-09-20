# JavaScript Arrays

### What is an Array?
An array in JavaScript is a special type of object that stores multiple values in a single variable. Arrays are ordered collections where each value (called an "element") has a numeric index starting from 0. Arrays can hold any type of data - numbers, strings, objects, functions, or even other arrays.


---

## 📊 Array Creation & Access

#### Creating Arrays
```javascript
// Method 1: Array Literal (Most Common)
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = ['hello', 42, true, null];

// Method 2: Array Constructor
const emptyArray = new Array();
const arrayWithLength = new Array(5); // Creates array with 5 empty slots
const initializedArray = new Array('apple', 'banana');

// Method 3: Array.of() - Creates array with given elements
const arr1 = Array.of(1, 2, 3); // [1, 2, 3]
const arr2 = Array.of('a', 'b', 'c'); // ['a', 'b', 'c']

// Method 4: Array.from() - Creates array from array-like objects
const str = 'hello';
const arrFromString = Array.from(str); // ['h', 'e', 'l', 'l', 'o']
```

#### Accessing Array Elements
```javascript
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Access by index (0-based)
console.log(fruits[0]); // 'apple' (first element)
console.log(fruits[1]); // 'banana' (second element)
console.log(fruits[3]); // 'grape' (last element)

// Access last element
console.log(fruits[fruits.length - 1]); // 'grape'

// Access non-existent index (returns undefined)
console.log(fruits[10]); // undefined

// Length property
console.log(fruits.length); // 4
```

#### Modifying Arrays
```javascript
const numbers = [1, 2, 3, 4, 5];

// Modify by index
numbers[0] = 10; // [10, 2, 3, 4, 5]
numbers[10] = 100; // [10, 2, 3, 4, 5, empty × 5, 100]

// Add elements (creates sparse array)
numbers[7] = 70; // [10, 2, 3, 4, 5, empty × 2, 70, 100]
```

---

## 🔧 Array Methods

#### Mutating Methods (Modify Original Array)

**push() & pop() - Stack Operations**
```javascript
const stack = [1, 2, 3];

// push() - Add to end
stack.push(4); // [1, 2, 3, 4]
stack.push(5, 6); // [1, 2, 3, 4, 5, 6]

// pop() - Remove from end
const lastElement = stack.pop(); // 6, stack is now [1, 2, 3, 4, 5]
```

**unshift() & shift() - Queue Operations**
```javascript
const queue = [1, 2, 3];

// unshift() - Add to beginning
queue.unshift(0); // [0, 1, 2, 3]
queue.unshift(-2, -1); // [-2, -1, 0, 1, 2, 3]

// shift() - Remove from beginning
const firstElement = queue.shift(); // -2, queue is now [-1, 0, 1, 2, 3]
```

#### Non-Mutating Methods (Return New Values)

**map() - Transform Each Element**
```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Transform to strings
const asStrings = numbers.map(num => `Number: ${num}`);
console.log(asStrings); // ['Number: 1', 'Number: 2', ...]

// Real-world example: Transform user objects
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

const userNames = users.map(user => user.name); // ['John', 'Jane']
```

**filter() - Filter Elements Based on Condition**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Get numbers greater than 5
const greaterThanFive = numbers.filter(num => num > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]

// Real-world example: Filter active users
const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true }
];

const activeUsers = users.filter(user => user.active);
console.log(activeUsers); // [{ id: 1, name: 'John', active: true }, ...]
```

**reduce() - Reduce Array to Single Value**
```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0); // 0 is initial value
console.log(sum); // 15

// Find maximum value
const max = numbers.reduce((max, current) => {
  return current > max ? current : max;
}, numbers[0]);
console.log(max); // 5

```

**find() - Find First Element Matching Condition**
```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Find first even number
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 2

// Find first number greater than 10
const greaterThanTen = numbers.find(num => num > 10);
console.log(greaterThanTen); // undefined

// Real-world example: Find user by ID
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

const user = users.find(user => user.id === 2);
console.log(user); // { id: 2, name: 'Jane' }
```

**forEach() - Execute Function for Each Element**
- forEach passes 3 arguments

- Whenever you call forEach(), it passes three values to your callback function for every element in the array:

``` javascript
(element, index, array)

```

- element → The actual value at the current position

- index → The position of that element in the array (starts from 0)

- array → The entire array itself

``` javascript

const fruits = ["Apple", "Banana", "Mango"];

fruits.forEach((element, index, array) => {
  console.log("Element:", element);
  console.log("Index:", index);
  console.log("Array:", array);
  console.log("------------");
});


```
```javascript
const numbers = [1, 2, 3, 4, 5];

// Simple logging
numbers.forEach(num => {
  console.log(`Number: ${num}`);
});

// Modify external variable
let sum = 0;
numbers.forEach(num => {
  sum += num;
});
console.log(sum); // 15

// Real-world example: Update DOM elements
const tasks = ['Learn JavaScript', 'Practice coding', 'Build projects'];
tasks.forEach((task, index) => {
  console.log(`${index + 1}. ${task}`);
});
```

---

## 🔄 Spread & Rest Operators

#### Spread Operator (...) - Expand Arrays
```javascript
// Copying arrays
const original = [1, 2, 3];
const copy = [...original]; // [1, 2, 3]
const copyWithExtra = [...original, 4, 5]; // [1, 2, 3, 4, 5]

// Merging arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Adding elements to arrays
const numbers = [2, 3, 4];
const withOne = [1, ...numbers, 5]; // [1, 2, 3, 4, 5]

// Converting strings to arrays
const str = 'hello';
const chars = [...str]; // ['h', 'e', 'l', 'l', 'o']

// Function arguments
function add(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6
```

#### Rest Operator (...) - Collect Multiple Elements
```javascript
// Function parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// Multiple parameters with rest
function multiply(multiplier, ...numbers) {
  return numbers.map(num => num * multiplier);
}

console.log(multiply(2, 1, 2, 3)); // [2, 4, 6]

// Destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]
```

---

## 🎯 Interview Questions & Answers

### Arrays Interview Questions

**Q1: What is the difference between push() and unshift()?**
```
Answer: Both methods add elements to an array, but:
- push() adds elements to the END of the array
- unshift() adds elements to the BEGINNING of the array

Example:
const arr = [1, 2, 3];
arr.push(4);    // [1, 2, 3, 4]
arr.unshift(0); // [0, 1, 2, 3, 4]
```

**Q2: What is the difference between map() and forEach()?**
```
Answer: Both iterate over arrays, but:
- map() returns a NEW array with transformed elements
- forEach() returns undefined and is used for side effects

Example:
const numbers = [1, 2, 3];

const doubled = numbers.map(n => n * 2);    // [2, 4, 6] - new array
numbers.forEach(n => console.log(n * 2));  // Logs: 2, 4, 6 - no return value
```

**Q3: Explain the spread operator with arrays.**
```
Answer: The spread operator (...) expands an array into individual elements.

Use cases:
1. Copying arrays: const copy = [...original]
2. Merging arrays: const merged = [...arr1, ...arr2]
3. Function arguments: Math.max(...numbers)
4. Adding elements: const newArr = [1, ...arr, 5]

Example:
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]
```

**Q4: What is the difference between slice() and splice()?**
```
Answer: Both methods work with array portions, but:
- slice(): Returns a SHALLOW COPY of array portion (non-mutating)
- splice(): MODIFIES original array by removing/replacing elements (mutating)

Example:
const arr = [1, 2, 3, 4, 5];

// slice() - non-mutating
const sliced = arr.slice(1, 4); // [2, 3, 4], arr still [1, 2, 3, 4, 5]

// splice() - mutating
const spliced = arr.splice(1, 2); // [2, 3], arr now [1, 4, 5]
```

**Q5: Explain the concept of sparse arrays in JavaScript.**
```
Answer: Sparse arrays have "holes" - missing elements between indices.

Creation:
const sparse = [1, , 3]; // [1, empty, 3]
const sparse2 = new Array(3); // [empty × 3]

Characteristics:
- Length property counts holes: sparse.length // 3
- Holes are different from undefined values
- Iteration skips holes: sparse.forEach(x => console.log(x)) // logs 1, 3

Example:
const arr = [1, 2, 3];
arr[10] = 10; // Creates sparse array [1, 2, 3, empty × 7, 10]
console.log(arr.length); // 11
```

**Q6: What are the different ways to check if a variable is an array?**
```
Answer: Multiple ways to check if something is an array:

1. Array.isArray() - Most reliable
Array.isArray([]); // true
Array.isArray({}); // false

2. instanceof Array
[] instanceof Array; // true

3. constructor property
[].constructor === Array; // true

4. Object.prototype.toString.call()
Object.prototype.toString.call([]); // '[object Array]'

Best practice: Use Array.isArray() as it's most reliable across frames.
```

**Q7: Explain the difference between for...in and for...of loops with arrays.**
```
Answer: Both iterate over arrays, but differently:

for...in:
- Iterates over INDEXES (including prototype properties)
- Can iterate over object properties too
- Slower, not recommended for arrays

for...of:
- Iterates over VALUES
- Works with any iterable (arrays, strings, maps, etc.)
- Respects array holes
- Better performance

Example:
const arr = [1, 2, 3];
arr.custom = 'property';

for (let index in arr) {
  console.log(index); // 0, 1, 2, 'custom' (includes custom property!)
}

for (let value of arr) {
  console.log(value); // 1, 2, 3 (only values, skips holes)
}
```

**Q8: What happens when you try to access an array index that doesn't exist?**
```
Answer: Returns undefined, but doesn't throw an error.

Example:
const arr = [1, 2, 3];
console.log(arr[10]); // undefined
console.log(arr[-1]); // undefined (negative indices don't work like Python)

Important notes:
- arr[10] = 10; creates sparse array with length 11
- typeof arr[10] === 'undefined' // true
- arr[10] === undefined // true
- But arr[10] !== arr[1] (which might be undefined if explicitly set)
```

**Q9: Explain the difference between mutating and non-mutating array methods.**
```
Answer: Mutating vs Non-mutating methods:

Mutating methods (modify original array):
- push(), pop(), shift(), unshift(), splice()
- sort(), reverse(), fill(), copyWithin()

Non-mutating methods (return new array/value):
- slice(), concat(), map(), filter(), reduce()
- find(), findIndex(), includes(), indexOf()
- join(), toString(), every(), some()

Example:
const original = [1, 2, 3];

// Mutating
original.push(4); // original is now [1, 2, 3, 4]

// Non-mutating
const doubled = original.map(x => x * 2); // [2, 4, 6], original unchanged
```

**Q10: What are the performance implications of different array operations?**
```
Answer: Performance considerations:

Fastest operations:
- Push/pop (O(1) - constant time)
- Direct index access (O(1))
- for...of loops (fastest iteration)

Slower operations:
- Shift/unshift (O(n) - linear time, requires reindexing)
- Splice with large deletions (O(n))
- for...in loops (slower, checks prototypes)

Memory considerations:
- Spread operator creates new array (more memory)
- Mutating methods modify in-place (less memory)
- Large arrays with many operations can cause performance issues

Best practices:
- Use appropriate method for the task
- Consider array size for performance-critical code
- Prefer non-mutating methods for functional programming
```

---
