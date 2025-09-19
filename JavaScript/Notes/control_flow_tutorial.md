# Control Flow

## 1. What is Control Flow?
Control flow is like the "brain" of your program—it decides what happens next based on conditions or repeats actions. Without it, code would run straight from top to bottom, like a boring story with no choices.

- **Why it matters**: It lets your program react to user input, handle errors, or process data dynamically.
- **Analogy**: Imagine driving a car. You check traffic lights (conditions) and decide to stop or go. Loops are like repeating a route until you reach your destination.

In programming, we use **conditional statements** (for decisions) and **loops** (for repetition).

**Example 1: Simple Decision**
```javascript
let age = 18;
if (age >= 18) {
    console.log("You can vote!");
}
```

**Example 2: Repeating a Task**
```javascript
for (let i = 1; i <= 3; i++) {
    console.log("Hello, world!");
}
// Output: Hello, world! (3 times)
```

## 2. Conditional Statements: if, else if, else
These are like "if-then" rules. Your code checks a condition (true or false) and runs different blocks of code accordingly.

### Basic if Statement
- **Syntax**:
  ```javascript
  if (condition) {
      // Code to run if condition is true
  }
  ```
- **Example**: Check if a student passed an exam.
  ```javascript
  let marks = 75;
  if (marks >= 50) {
      console.log("You passed! 🎉");
  }
  ```
  - If `marks` is 75 (true), it prints "You passed!". If less than 50, nothing happens.
- **Analogy**: "If it's raining, take an umbrella."

### else if and else
- Use `else if` for multiple conditions, and `else` as a fallback.
- **Syntax**:
  ```javascript
  if (condition1) {
      // Code for condition1
  } else if (condition2) {
      // Code for condition2
  } else {
      // Code if none match
  }
  ```
- **Example**: Grading system.
  ```javascript
  let marks = 85;
  if (marks >= 90) {
      console.log("Grade: A");
  } else if (marks >= 75) {
      console.log("Grade: B");
  } else if (marks >= 50) {
      console.log("Grade: C");
  } else {
      console.log("Grade: F - Try again!");
  }
  ```
  - For 85, it prints "Grade: B". For 45, "Grade: F".

**Example 2**: Weather check.
  ```javascript
  let temperature = 25;
  if (temperature > 30) {
      console.log("It's hot outside!");
  } else if (temperature > 20) {
      console.log("It's pleasant.");
  } else {
      console.log("It's cold, wear a jacket.");
  }
  ```
  - For 25, it prints "It's pleasant."
- **Tips**:
  - Conditions are checked from top to bottom.
  - Use `===` for exact equality (e.g., `marks === 100`).
  - Avoid too many `else if`—it can get messy; consider `switch` later.

## 3. Switch Statement
`switch` is like a menu: it checks one value against multiple cases and runs the matching one. It's cleaner than many `else if` for exact matches.

- **Syntax**:
  ```javascript
  switch (expression) {
      case value1:
          // Code for value1
          break;
      case value2:
          // Code for value2
          break;
      default:
          // Code if no match
  }
  ```
- **Example 1**: Day of the week.
  ```javascript
  let day = "Monday";
  switch (day) {
      case "Monday":
          console.log("Start of the week!");
          break;
      case "Friday":
          console.log("TGIF!");
          break;
      default:
          console.log("Just another day.");
  }
  ```
  - For "Monday", it prints "Start of the week!". The `break` stops it from checking further.

- **Example 2**: Simple calculator.
  ```javascript
  let operator = "+";
  let a = 5, b = 3;
  switch (operator) {
      case "+":
          console.log(a + b);
          break;
      case "-":
          console.log(a - b);
          break;
      default:
          console.log("Invalid operator");
  }
  ```
  - For operator "+", it prints 8.

- **Analogy**: Choosing a dish from a menu—pick one and stop.
- **Tips**:
  - Always use `break` to avoid "fall-through" (running multiple cases).
  - `default` is optional but good for handling unexpected values.
  - Best for fixed values (numbers, strings); not ranges.

## 4. Loops: for, while, do..while
Loops repeat code until a condition is met. They're essential for tasks like processing lists or waiting for input.

### for Loop
- **When to use**: When you know how many times to repeat (e.g., count from 1 to 10).
- **Syntax**:
  ```javascript
  for (initialization; condition; increment) {
      // Code to repeat
  }
  ```
- **Example 1**: Print numbers 1 to 5.
  ```javascript
  for (let i = 1; i <= 5; i++) {
      console.log(i);
  }
  // Output: 1, 2, 3, 4, 5
  ```

- **Example 2**: Sum of first 10 numbers.
  ```javascript
  let sum = 0;
  for (let i = 1; i <= 10; i++) {
      sum += i;
  }
  console.log("Sum:", sum); // Output: Sum: 55
  ```

- **Example 3**: Iterate over an array.
  ```javascript
  let fruits = ["apple", "banana", "cherry"];
  for (let i = 0; i < fruits.length; i++) {
      console.log(fruits[i]);
  }
  // Output: apple, banana, cherry
  ```

- **Analogy**: Counting sheep to fall asleep—you know the number.

### while Loop
- **When to use**: When you don't know the exact count, but have a condition (e.g., keep asking for input until correct).
- **Syntax**:
  ```javascript
  while (condition) {
      // Code to repeat
  }
  ```
- **Example 1**: Keep guessing until correct.
  ```javascript
  let guess = 0;
  while (guess !== 42) {
      guess = Math.floor(Math.random() * 100); // Random number
      console.log("Guessed:", guess);
  }
  console.log("Correct!");
  ```
  - Loops until `guess` is 42. Be careful— if condition never becomes false, it's an infinite loop!

- **Example 2**: Countdown timer.
  ```javascript
  let count = 10;
  while (count > 0) {
      console.log(count);
      count--;
  }
  console.log("Blast off!");
  ```
  - Prints 10 to 1, then "Blast off!".

- **Example 3**: Read user input until valid.
  ```javascript
  let input = "";
  while (input !== "yes" && input !== "no") {
      input = prompt("Enter yes or no:");
  }
  console.log("You entered:", input);
  ```
  - Keeps prompting until "yes" or "no".

- **Analogy**: Eating snacks while watching TV—stop when full.

### do..while Loop
- **When to use**: Like `while`, but runs at least once (checks condition after).
- **Syntax**:
  ```javascript
  do {
      // Code to repeat
  } while (condition);
  ```
- **Example 1**: Menu selection.
  ```javascript
  let choice;
  do {
      choice = prompt("Enter 1 for tea, 2 for coffee:");
  } while (choice !== "1" && choice !== "2");
  console.log("Enjoy your drink!");
  ```
  - Runs once, then checks. Good for menus or retries.

- **Example 2**: Game score update.
  ```javascript
  let score = 0;
  do {
      score += 10;
      console.log("Score:", score);
  } while (score < 50);
  console.log("Game over!");
  ```
  - Updates score until 50.

- **Example 3**: Password prompt.
  ```javascript
  let password;
  do {
      password = prompt("Enter password:");
  } while (password !== "secret");
  console.log("Access granted!");
  ```
  - Prompts until correct password.

- **Analogy**: Trying a new food—you eat first, then decide if you want more.

## 5. break & continue
These are loop controls to exit early or skip iterations.

### break
- **What it does**: Exits the loop immediately.
- **Example 1**: Stop searching an array.
  ```javascript
  let numbers = [1, 2, 3, 4, 5];
  for (let num of numbers) {
      if (num === 3) {
          console.log("Found 3!");
          break; // Stops here
      }
      console.log(num);
  }
  // Output: 1, 2, Found 3!
  ```

- **Example 2**: Exit on error.
  ```javascript
  for (let i = 1; i <= 10; i++) {
      if (i === 7) {
          console.log("Error at 7!");
          break;
      }
      console.log(i);
  }
  // Output: 1, 2, 3, 4, 5, 6, Error at 7!
  ```

- **Analogy**: Leaving a party early when you find what you need.

### continue
- **What it does**: Skips the rest of the current iteration and moves to the next.
- **Example 1**: Skip even numbers.
  ```javascript
  for (let i = 1; i <= 5; i++) {
      if (i % 2 === 0) {
          continue; // Skip even
      }
      console.log(i); // Prints odd numbers
  }
  // Output: 1, 3, 5
  ```

- **Example 2**: Skip negative numbers.
  ```javascript
  let numbers = [1, -2, 3, -4, 5];
  for (let num of numbers) {
      if (num < 0) {
          continue; // Skip negatives
      }
      console.log(num);
  }
  // Output: 1, 3, 5
  ```

- **Analogy**: Skipping a boring song in a playlist.

## Final Tips for BTech Students
- **Practice**: Write small programs combining these (e.g., a calculator with loops).
- **Common Mistakes**: Forgetting `break` in `switch`, or creating infinite loops in `while`.
- **Debugging**: Use `console.log` to see what's happening.
- **Next Steps**: Explore nested loops or functions for more control.

If you have questions or want examples in another language, let me know. Happy coding! 🚀
