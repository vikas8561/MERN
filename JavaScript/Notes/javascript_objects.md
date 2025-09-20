# JavaScript Objects

### What is an Object?
An object in JavaScript is a collection of key-value pairs, similar to a dictionary or hash map in other programming languages. Objects are used to store and organize data, and they can contain properties (data) and methods (functions). Objects are reference types and are fundamental to JavaScript programming.

**Key Characteristics:**
- **Unordered**: Properties don't maintain insertion order (though modern JS engines preserve it)
- **Key-Value**: Each property has a name (key) and value
- **Dynamic**: Can add, modify, or delete properties at runtime
- **Flexible**: Can store any data type as values, including other objects

**Why Use Objects?**
- Represent real-world entities (users, products, etc.)
- Store configuration settings
- Group related data and functionality
- Create complex data structures

## 📋 Table of Contents
1. [Key-Value Pairs](#key-value-pairs)
2. [Dot vs Bracket Notation](#dot-vs-bracket-notation)
3. [Object Methods](#object-methods)
4. [Destructuring](#destructuring)
5. [Interview Questions & Answers](#interview-questions--answers)

---

## 🏗️ Key-Value Pairs

#### Creating Objects
```javascript
// Object Literal (Most Common)
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// Object Constructor
const car = new Object();
car.make = 'Toyota';
car.model = 'Camry';
car.year = 2020;

// Object with methods
const calculator = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

// Nested objects
const company = {
  name: 'Tech Corp',
  address: {
    street: '123 Main St',
    city: 'New York',
    zipCode: '10001'
  },
  employees: ['John', 'Jane', 'Bob']
};
```

#### Accessing Object Properties
```javascript
const person = {
  name: 'John',
  age: 30,
  'favorite color': 'blue' // Property with space
};

// Access using dot notation
console.log(person.name); // 'John'
console.log(person.age);  // 30

// Access using bracket notation
console.log(person['name']); // 'John'
console.log(person['favorite color']); // 'blue'

// Dynamic property access
const propertyName = 'age';
console.log(person[propertyName]); // 30
```

---

## 📍 Dot vs Bracket Notation

#### Dot Notation (.)
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// ✅ Use dot notation when:
console.log(person.name);    // Property name is known and valid identifier
console.log(person.city);    // Simple property access

// ❌ Cannot use dot notation for:
console.log(person.favorite color); // SyntaxError - space in property name
console.log(person['age']);         // Must use brackets for dynamic access
```

#### Bracket Notation []
```javascript
const person = {
  name: 'John',
  age: 30,
  'favorite color': 'blue',
  'special-property': 'value'
};

// ✅ Use bracket notation when:
console.log(person['name']);           // Dynamic property access
console.log(person['favorite color']); // Property name with special characters
console.log(person['special-property']); // Property name with hyphens

// Dynamic property access
const propertyName = 'age';
console.log(person[propertyName]); // 30

// Computed property names
const key = 'dynamicKey';
const obj = {
  [key]: 'dynamic value'
};
console.log(obj.dynamicKey); // 'dynamic value'
```

#### When to Use Which?
```javascript
const user = {
  name: 'John',
  age: 30,
  'user-role': 'admin',
  'special data': 'secret'
};

// Dot notation - for simple, known property names
console.log(user.name);  // ✅ 'John'
console.log(user.age);   // ✅ 30

// Bracket notation - for dynamic or special property names
console.log(user['user-role']);      // ✅ 'admin'
console.log(user['special data']);   // ✅ 'secret'

// Dynamic access
const properties = ['name', 'age', 'user-role'];
properties.forEach(prop => {
  console.log(user[prop]); // Works with both simple and special names
});
```

---

## 🔧 Object Methods

### Understanding Object Methods
Object methods are built-in functions that help you work with objects more effectively. They provide ways to:
- Extract data from objects (keys, values, entries)
- Copy or merge objects
- Check object properties
- Convert between objects and other data structures

**Common Use Cases:**
- **Iteration**: Loop through object properties
- **Data Transformation**: Convert objects to arrays or vice versa
- **Object Manipulation**: Copy, merge, or modify objects safely
- **Validation**: Check if properties exist or have certain values

#### Object.keys() - Get All Property Names
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  email: 'john@example.com'
};

// Get all property names (keys)
const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city', 'email']

// Use with forEach
Object.keys(person).forEach(key => {
  console.log(`${key}: ${person[key]}`);
});

// Check if object has specific property
console.log(Object.keys(person).includes('name')); // true
console.log(Object.keys(person).length); // 4
```

#### Object.values() - Get All Property Values
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  email: 'john@example.com'
};

// Get all property values
const values = Object.values(person);
console.log(values); // ['John', 30, 'New York', 'john@example.com']

// Calculate sum of numeric values
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const sum = Object.values(numbers).reduce((total, num) => total + num, 0);
console.log(sum); // 10
```

#### Object.entries() - Get Key-Value Pairs as Arrays
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// Get key-value pairs as arrays
const entries = Object.entries(person);
console.log(entries);
// [['name', 'John'], ['age', 30], ['city', 'New York']]

// Convert to object from entries
const newPerson = Object.fromEntries(entries);
console.log(newPerson); // { name: 'John', age: 30, city: 'New York' }

// Transform entries
const transformed = Object.entries(person).map(([key, value]) => {
  return [key.toUpperCase(), value];
});
console.log(transformed); // [['NAME', 'John'], ['AGE', 30], ['CITY', 'New York']]
```

#### Object.assign() - Copy/Merge Objects
```javascript
// Copy object
const original = { name: 'John', age: 30 };
const copy = Object.assign({}, original);
console.log(copy); // { name: 'John', age: 30 }

// Merge multiple objects
const person = { name: 'John' };
const details = { age: 30, city: 'New York' };
const merged = Object.assign({}, person, details);
console.log(merged); // { name: 'John', age: 30, city: 'New York' }

// Add properties to existing object
const user = { name: 'John' };
Object.assign(user, { age: 30, email: 'john@example.com' });
console.log(user); // { name: 'John', age: 30, email: 'john@example.com' }

// Deep merge (nested objects)
const obj1 = { a: 1, nested: { b: 2 } };
const obj2 = { c: 3, nested: { d: 4 } };
const deepMerge = Object.assign({}, obj1, obj2);
console.log(deepMerge); // { a: 1, c: 3, nested: { d: 4 } } (nested.b is lost!)
```

---

## 🔀 Destructuring

#### Object Destructuring
```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  email: 'john@example.com'
};

// Basic object destructuring
const { name, age, city } = person;
console.log(name); // 'John'
console.log(age);  // 30
console.log(city); // 'New York'

// Different variable names
const { name: personName, age: personAge } = person;
console.log(personName); // 'John'
console.log(personAge);  // 30

// Default values
const { name, age, country = 'USA' } = person;
console.log(country); // 'USA'

// Nested object destructuring
const user = {
  name: 'John',
  details: {
    age: 30,
    address: {
      city: 'New York',
      zipCode: '10001'
    }
  }
};

const { details: { address: { city, zipCode } } } = user;
console.log(city);    // 'New York'
console.log(zipCode); // '10001'
```

#### Array Destructuring (Related to Objects)
```javascript
// Basic array destructuring
const fruits = ['apple', 'banana', 'orange'];
const [first, second, third] = fruits;

console.log(first);  // 'apple'
console.log(second); // 'banana'
console.log(third);  // 'orange'

// Skip elements
const numbers = [1, 2, 3, 4, 5];
const [firstNum, , thirdNum, , fifthNum] = numbers;

console.log(firstNum); // 1
console.log(thirdNum); // 3
console.log(fifthNum); // 5

// Rest operator with destructuring
const [firstFruit, ...restFruits] = fruits;
console.log(firstFruit);   // 'apple'
console.log(restFruits);   // ['banana', 'orange']

// Default values
const [a, b, c = 'default'] = [1, 2];
console.log(a, b, c); // 1, 2, 'default'
```

#### Function Parameters Destructuring
```javascript
// Object destructuring in function parameters
function printPerson({ name, age, city }) {
  console.log(`${name} is ${age} years old and lives in ${city}`);
}

const person = { name: 'John', age: 30, city: 'New York' };
printPerson(person); // John is 30 years old and lives in New York

// Default parameters with destructuring
function createUser({ name, age, city = 'Unknown', country = 'USA' } = {}) {
  return { name, age, city, country };
}

console.log(createUser({ name: 'John', age: 30 })); // { name: 'John', age: 30, city: 'Unknown', country: 'USA' }
```

---

## 🎯 Interview Questions & Answers

### Objects Interview Questions

**Q1: What is the difference between dot notation and bracket notation?**
```
Answer: Both access object properties, but:
- Dot notation: Use when property name is known and valid identifier
- Bracket notation: Use for dynamic access or special property names

Example:
const obj = { name: 'John', 'special-prop': 'value' };

console.log(obj.name);              // ✅ 'John'
console.log(obj['special-prop']);   // ✅ 'value'
console.log(obj['name']);           // ✅ 'John' (dynamic)
```

**Q2: What do Object.keys(), Object.values(), and Object.entries() return?**
```
Answer:
- Object.keys(obj): Returns array of property names (keys)
- Object.values(obj): Returns array of property values
- Object.entries(obj): Returns array of [key, value] pairs

Example:
const person = { name: 'John', age: 30 };

Object.keys(person);     // ['name', 'age']
Object.values(person);   // ['John', 30]
Object.entries(person);  // [['name', 'John'], ['age', 30]]
```

**Q3: Explain destructuring in JavaScript.**
```
Answer: Destructuring extracts values from arrays/objects into variables.

Object destructuring:
const { name, age } = { name: 'John', age: 30 };

Array destructuring:
const [a, b] = [1, 2]; // a=1, b=2

Benefits:
- Less code
- More readable
- Default values: const { a = 10 } = {}
- Rest operator: const { a, ...rest } = obj
```

**Q4: What is the difference between Object.freeze() and Object.seal()?**
```
Answer: Both restrict object modifications, but differently:

Object.freeze():
- Makes object completely immutable
- Cannot add, delete, or modify properties
- Property values cannot be changed
- Object.isFrozen(obj) returns true

Object.seal():
- Can modify existing property values
- Cannot add new properties or delete existing ones
- Object.isSealed(obj) returns true

Example:
const obj = { a: 1, b: 2 };

// Freeze - completely immutable
const frozen = Object.freeze(obj);
frozen.a = 10; // No effect, still 1
delete frozen.b; // No effect, still exists

// Seal - can modify values but not structure
const sealed = Object.seal(obj);
sealed.a = 10; // Works, a is now 10
delete sealed.b; // No effect, still exists
// sealed.c = 3; // Cannot add new properties
```

**Q5: Explain the concept of prototype in JavaScript objects.**
```
Answer: Prototype is the mechanism for inheritance in JavaScript.

Every object has a prototype (except Object.prototype which is null).
Objects inherit properties and methods from their prototype.

Example:
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const john = new Person('John');
console.log(john.greet()); // 'Hello, I'm John'
console.log(john.hasOwnProperty('name')); // true
console.log(john.hasOwnProperty('greet')); // false (inherited)

Prototype chain:
john -> Person.prototype -> Object.prototype -> null
```

**Q6: What are the different ways to create objects in JavaScript?**
```
Answer: Multiple ways to create objects:

1. Object Literal (Most Common)
const obj = { name: 'John', age: 30 };

2. Object Constructor
const obj = new Object();
obj.name = 'John';

3. Constructor Function
function Person(name) { this.name = name; }
const person = new Person('John');

4. Object.create()
const obj = Object.create({ inherited: 'property' });

5. Class (ES6)
class Person { constructor(name) { this.name = name; } }
const person = new Person('John');

6. Factory Function
function createPerson(name) { return { name }; }
const person = createPerson('John');

Best practices:
- Use literals for simple objects
- Use classes for complex objects with methods
- Use factory functions for multiple similar objects
```

**Q7: Explain the difference between hasOwnProperty(), in operator, and property existence checking.**
```
Answer: Different ways to check object properties:

1. hasOwnProperty() - checks only own properties
obj.hasOwnProperty('prop'); // true/false

2. 'in' operator - checks own + inherited properties
'prop' in obj; // true/false

3. Direct property access - checks if property exists
obj.prop !== undefined; // but 0, false, null are falsy

4. Object.prototype.hasOwnProperty.call()
Object.prototype.hasOwnProperty.call(obj, 'prop');

Example:
const obj = { own: 'property' };
obj.__proto__.inherited = 'property';

console.log(obj.hasOwnProperty('own')); // true
console.log(obj.hasOwnProperty('inherited')); // false
console.log('own' in obj); // true
console.log('inherited' in obj); // true
console.log(obj.own !== undefined); // true
console.log(obj.inherited !== undefined); // true
```

**Q8: What is the difference between shallow copy and deep copy of objects?**
```
Answer: Copying objects creates references, not new objects.

Shallow Copy:
- Copies only top-level properties
- Nested objects are still references
- Changes to nested objects affect both copies

Deep Copy:
- Copies all levels of properties
- Nested objects are completely independent
- Changes don't affect each other

Example:
const original = { a: 1, nested: { b: 2 } };

// Shallow copy
const shallow = { ...original };
shallow.a = 10; // original.a still 1
shallow.nested.b = 20; // original.nested.b also becomes 20

// Deep copy (one way)
const deep = JSON.parse(JSON.stringify(original));
deep.nested.b = 30; // original.nested.b still 2

Note: JSON methods don't copy functions, undefined, or circular references.
```

**Q9: Explain the concept of 'this' keyword in JavaScript objects.**
```
Answer: 'this' refers to the context where a function is called.

In objects:
- Method calls: 'this' refers to the object
- Regular function calls: 'this' refers to global object (or undefined in strict mode)
- Arrow functions: 'this' inherits from parent scope

Example:
const person = {
  name: 'John',
  regularFunction: function() { return this.name; },
  arrowFunction: () => this.name,
  getName() { return this.name; }
};

console.log(person.getName()); // 'John' (method call)
console.log(person.regularFunction()); // 'John' (method call)

const func = person.regularFunction;
console.log(func()); // undefined (global context)

console.log(person.arrowFunction()); // undefined (inherits from global)

Common pitfalls:
- Losing 'this' context in callbacks
- Arrow functions don't have their own 'this'
```

**Q10: What are the performance implications of different object operations?**
```
Answer: Performance considerations for objects:

Fast operations:
- Property access: obj.prop (O(1))
- hasOwnProperty() (O(1))
- Object.keys() on small objects (O(n))

Slower operations:
- Object.keys() on large objects (O(n))
- for...in loops (slower than for...of)
- Deep cloning large objects (O(n²) or worse)

Memory considerations:
- Objects use more memory than arrays for same data
- Deleting properties doesn't reduce memory immediately
- Circular references prevent garbage collection

Best practices:
- Use Map for frequent key-value operations
- Use arrays for ordered collections
- Avoid creating objects in loops
- Use Object.create(null) for dictionary-like objects
- Cache object keys when iterating frequently

Example:
const largeObj = { /* 1000 properties */ };
console.time('keys');
Object.keys(largeObj); // Measure time
console.timeEnd('keys');
```

**Q11: Explain the difference between null and undefined in object properties.**
```
Answer: null vs undefined in objects:

undefined:
- Property doesn't exist
- Default value for uninitialized variables
- Return value of functions without return statement
- Accessing non-existent object properties

null:
- Intentional absence of value
- Explicitly set by developer
- Different from undefined in comparisons

Example:
const obj = { a: undefined, b: null };

console.log(obj.a); // undefined
console.log(obj.b); // null
console.log('a' in obj); // true (property exists)
console.log('c' in obj); // false (property doesn't exist)

console.log(obj.a === undefined); // true
console.log(obj.b === null); // true
console.log(obj.a === null); // false
console.log(obj.b === undefined); // false

Checking patterns:
- Property exists: 'prop' in obj
- Property exists and not null: 'prop' in obj && obj.prop !== null
- Property exists and truthy: 'prop' in obj && obj.prop
```

**Q12: What are getters and setters in JavaScript objects?**
```
Answer: Getters and setters control property access and modification.

Syntax:
const obj = {
  _name: 'John',
  get name() { return this._name; },
  set name(value) { this._name = value.toUpperCase(); }
};

Usage:
console.log(obj.name); // 'John' (calls getter)
obj.name = 'Jane'; // 'JANE' (calls setter)
console.log(obj.name); // 'JANE'

Benefits:
- Data validation
- Computed properties
- Encapsulation
- Logging property access
- Lazy evaluation

Example with validation:
const person = {
  _age: 0,
  get age() { return this._age; },
  set age(value) {
    if (value < 0 || value > 150) {
      throw new Error('Invalid age');
    }
    this._age = value;
  }
};

person.age = 25; // Works
person.age = 200; // Throws error
```

---

## 📝 Summary

### Key Takeaways:

1. **Object Creation:**
   - Object literals: const obj = { key: 'value' }
   - Constructor: new Object()
   - Nested objects for complex data structures

2. **Property Access:**
   - Dot notation: obj.property (simple, known names)
   - Bracket notation: obj['property'] (dynamic, special characters)
   - Choose based on use case

3. **Object Methods:**
   - Object.keys(): Get property names
   - Object.values(): Get property values
   - Object.entries(): Get key-value pairs
   - Object.assign(): Copy/merge objects

4. **Destructuring:**
   - Extract values into variables
   - Works with objects and arrays
   - Default values and rest operator support
   - Great for function parameters

### Best Practices:
- Use const for objects you don't reassign
- Prefer object literals over constructors
- Use dot notation when possible, bracket for dynamic access
- Use destructuring for cleaner, more readable code
- Use Object methods for iteration and manipulation

### Common Use Cases:
- Representing entities (users, products, etc.)
- Configuration objects
- API request/response data
- Key-value storage and lookup
- Complex nested data structures

Objects are the foundation of JavaScript programming and are essential for organizing and manipulating data in any JavaScript application!
