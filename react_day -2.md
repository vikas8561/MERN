# State, Events & Conditional Rendering

---

## 1. useState Hook — Managing Data

### What is State?

**State** in React is data that can change over time. When state changes, React automatically re-renders the component to show the updated data.

**Think of it like this:**
- **Props** = Data passed FROM parent TO child (one-way, read-only)
- **State** = Data that BELONGS to the component itself (can be changed)

### 🔍 Why Do We Need useState?

In React, we can't just use regular variables to store data that changes. Here's why:

```javascript
// ❌ This WON'T work in React
function Counter() {
  let count = 0;
  
  const increment = () => {
    count = count + 1;  // This changes, but React doesn't know!
    console.log(count); // Shows updated value
  };
  
  return (
    <div>
      <p>Count: {count}</p>  {/* Always shows 0! */}
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

**Problem:** React doesn't know the variable changed, so it won't re-render the component.

**Solution:** Use `useState` hook! React will track the state and re-render when it changes.

### 📖 Basic Syntax

```javascript
import { useState } from 'react';

function MyComponent() {
  // useState returns an array with 2 elements:
  // [currentValue, functionToUpdateValue]
  const [state, setState] = useState(initialValue);
  
  return <div>...</div>;
}
```

### Simple Example: Counter App

```javascript
import { useState } from 'react';

function Counter() {
  // Initialize count with 0
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);  // Update state
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  const reset = () => {
    setCount(0);
  };
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**What happens:**
1. Component renders with `count = 0`
2. User clicks "+" button
3. `setCount(1)` is called
4. React detects state change
5. Component re-renders with `count = 1`
6. UI updates automatically!

### 📝 Different Data Types with useState

#### 1. **String State**
```javascript
const [name, setName] = useState('');

const handleChange = (e) => {
  setName(e.target.value);
};
// What is e?
// e stands for event.
// When an input changes, React automatically sends an event object to the handler function. Developers commonly call it: e, event, evt. All are the same thing.
return <input value={name} onChange={handleChange} />;
```

#### 2. **Number State**
```javascript
const [age, setAge] = useState(0);
const [price, setPrice] = useState(100);
```

#### 3. **Boolean State**
```javascript
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isVisible, setIsVisible] = useState(true);

// Toggle function
const toggle = () => {
  setIsVisible(!isVisible);
};
```

#### 4. **Array State**
```javascript
const [items, setItems] = useState([]);
const [numbers, setNumbers] = useState([1, 2, 3]);

// Adding to array
const addItem = (newItem) => {
  setItems([...items, newItem]);  // Spread operator
};

// Removing from array
const removeItem = (index) => {
  setItems(items.filter((item, i) => i !== index));
};
```

#### 5. **Object State**
```javascript
const [user, setUser] = useState({
  name: '',
  email: '',
  age: 0
});

// Update object (IMPORTANT: Always spread existing properties!)
const updateName = (newName) => {
  setUser({ ...user, name: newName });
};

// Update multiple properties
const updateUser = (name, email) => {
  setUser({ ...user, name, email });
};
```

### ⚠️ Important Rules & Common Mistakes

#### ❌ **MISTAKE 1: Direct Mutation**
```javascript
// ❌ WRONG - Don't mutate state directly!
const [user, setUser] = useState({ name: 'John' });
user.name = 'Jane';  // This won't trigger re-render!

// ✅ CORRECT - Create new object
setUser({ ...user, name: 'Jane' });
```

#### ❌ **MISTAKE 2: Mutating Arrays**
```javascript
// ❌ WRONG
const [items, setItems] = useState([1, 2, 3]);
items.push(4);  // Won't work!

// ✅ CORRECT
setItems([...items, 4]);
// OR
setItems(items.concat(4));
```

#### ❌ **MISTAKE 3: Using State Value Immediately After setState**
```javascript
// ❌ WRONG - State updates are asynchronous!
const [count, setCount] = useState(0);
setCount(count + 1);
console.log(count);  // Still shows old value!

// ✅ CORRECT - Use the updated value in next render
// OR use functional update (see below)
```

#### ✅ **Functional Updates (Best Practice)**
When new state depends on previous state, use functional form:

```javascript
// ✅ CORRECT - Functional update
const [count, setCount] = useState(0);

const increment = () => {
  setCount(prevCount => prevCount + 1);  // Uses previous value
};

// This is especially important when updating multiple times:
const incrementBy3 = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // Result: +3 (not +1!)
};
```

### 🎓 Real-World Example: Todo Item

```javascript
import { useState } from 'react';

function TodoItem() {
  const [todo, setTodo] = useState({
    text: '',
    completed: false,
    priority: 'medium'
  });
  
  const toggleComplete = () => {
    setTodo({ ...todo, completed: !todo.completed });
  };
  
  const updatePriority = (newPriority) => {
    setTodo({ ...todo, priority: newPriority });
  };
  
  return (
    <div>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none' 
      }}>
        {todo.text}
      </span>
      <select 
        value={todo.priority}
        onChange={(e) => updatePriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
```

### 🔢 Multiple useState Hooks

You can use `useState` multiple times in one component:

```javascript
function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  // Each state is independent!
  
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
      />
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  );
}
```

### 🎯 Placement Interview Questions

**Q1: What is useState and why do we need it?**
- useState is a React Hook that lets you add state to functional components
- It returns an array with the current state value and a function to update it
- We need it because React needs to track changes to re-render components

**Q2: Can you use useState in class components?**
- No, useState is only for functional components
- Class components use `this.state` and `this.setState()`

**Q3: What happens if you call setState with the same value?**
- React will still re-render (in development mode)
- In production, React may skip re-rendering if the value hasn't changed

**Q4: How do you update state based on previous state?**
- Use functional updates: `setCount(prev => prev + 1)`
- This ensures you're working with the latest state value

**Q5: Can you use useState conditionally?**
- No! Hooks must be called in the same order every render
- Don't put useState inside if statements, loops, or nested functions

**Q6: What's the difference between useState and useReducer?**
- useState is simpler, good for single values or simple state
- useReducer is better for complex state logic with multiple sub-values

### 📋 Practice Exercises

1. **Create a counter that can increment, decrement, and reset**
2. **Build a toggle button that shows/hides text**
3. **Make a form with name, email, and age fields using separate useState for each**
4. **Create a shopping cart that can add/remove items**

### ✅ Key Takeaways

1. ✅ State makes components dynamic and interactive
2. ✅ Always use `setState` function, never mutate state directly
3. ✅ Use functional updates when new state depends on previous state
4. ✅ useState can hold any data type (string, number, boolean, array, object)
5. ✅ You can use multiple useState hooks in one component
6. ✅ State updates are asynchronous - don't expect immediate changes

---

## 2️⃣ Handling Events (onClick, onChange)

### 🎯 What are Events?

**Events** are actions that happen in the browser, like:
- User clicks a button
- User types in an input field
- User submits a form
- User hovers over an element

In React, we handle these events to make our components interactive.

### 🔍 React Events vs HTML Events

**Key Differences:**

| HTML | React |
|------|-------|
| `onclick="handleClick()"` | `onClick={handleClick}` |
| `onchange="handleChange()"` | `onChange={handleChange}` |
| Lowercase | **camelCase** |
| String with quotes | **Function reference** (no parentheses) |

**Important:** React uses **camelCase** for event names, not lowercase!

### 📖 onClick Event Handler

The `onClick` event fires when a user clicks an element (usually a button).

#### Basic Syntax

```javascript
function Button() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

#### Different Ways to Write onClick

**Method 1: Separate Function (Recommended)**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

**Method 2: Inline Arrow Function**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Method 3: Inline with Multiple Statements**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => {
      setCount(count + 1);
      console.log('Count updated!');
    }}>
      Count: {count}
    </button>
  );
}
```

#### ⚠️ Common onClick Mistakes

**❌ MISTAKE 1: Calling Function Immediately**
```javascript
// ❌ WRONG - This calls the function immediately on render!
<button onClick={handleClick()}>Click Me</button>

// ✅ CORRECT - Pass function reference
<button onClick={handleClick}>Click Me</button>
```

**❌ MISTAKE 2: Using onClick on Non-Interactive Elements**
```javascript
// ❌ WRONG - div is not keyboard accessible
<div onClick={handleClick}>Click me</div>

// ✅ CORRECT - Use button or add role/onKeyDown
<button onClick={handleClick}>Click me</button>

// OR make it accessible:
<div 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  role="button"
  tabIndex={0}
>
  Click me
</div>
```

### 📝 onChange Event Handler

The `onChange` event fires when the value of an input, select, or textarea changes.

#### Basic Syntax

```javascript
function InputField() {
  const [value, setValue] = useState('');
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  return <input value={value} onChange={handleChange} />;
}
```

#### Understanding event.target

The `event` object contains information about the event. Most commonly, we use:
- `event.target.value` - The current value of the input
- `event.target.name` - The name attribute of the input
- `event.target.type` - The type of the input

```javascript
function Form() {
  const [name, setName] = useState('');
  
  const handleChange = (e) => {
    console.log(e.target.value);  // Current input value
    console.log(e.target.name);   // Input's name attribute
    setName(e.target.value);
  };
  
  return (
    <input 
      name="username"
      value={name}
      onChange={handleChange}
      placeholder="Enter your name"
    />
  );
}
```

#### Different Input Types with onChange

**1. Text Input**
```javascript
const [text, setText] = useState('');

<input 
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

**2. Number Input**
```javascript
const [age, setAge] = useState(0);

<input 
  type="number"
  value={age}
  onChange={(e) => setAge(Number(e.target.value))}
/>
```

**3. Checkbox**
```javascript
const [isChecked, setIsChecked] = useState(false);

<input 
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}  // Note: e.target.checked, not .value!
/>
```

**4. Radio Buttons**
```javascript
const [selectedOption, setSelectedOption] = useState('');

<input 
  type="radio"
  value="option1"
  checked={selectedOption === 'option1'}
  onChange={(e) => setSelectedOption(e.target.value)}
/>
<input 
  type="radio"
  value="option2"
  checked={selectedOption === 'option2'}
  onChange={(e) => setSelectedOption(e.target.value)}
/>
```

**5. Select Dropdown**
```javascript
const [country, setCountry] = useState('');

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="">Select a country</option>
  <option value="india">India</option>
  <option value="usa">USA</option>
  <option value="uk">UK</option>
</select>
```

**6. Textarea**
```javascript
const [message, setMessage] = useState('');

<textarea 
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={4}
/>
```

### 🎓 Handling Multiple Inputs

When you have multiple inputs, you can use one handler for all:

**Method 1: Using name attribute**
```javascript
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value  // Dynamic property name
    });
  };
  
  return (
    <form>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
    </form>
  );
}
```

**Method 2: Separate Handlers (Simpler for beginners)**
```javascript
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### 🔥 Other Common Events

#### onSubmit (Form Submission)
```javascript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevents page refresh
    console.log('Email:', email);
    console.log('Password:', password);
    // Handle form submission here
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

**Important:** Always use `e.preventDefault()` in form submission to prevent page refresh!

#### onFocus & onBlur
```javascript
const [isFocused, setIsFocused] = useState(false);

<input
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  style={{
    border: isFocused ? '2px solid blue' : '1px solid gray'
  }}
/>
```

#### onMouseEnter & onMouseLeave
```javascript
const [isHovered, setIsHovered] = useState(false);

<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    backgroundColor: isHovered ? 'lightblue' : 'white'
  }}
>
  Hover me!
</div>
```

#### onKeyDown, onKeyUp, onKeyPress
```javascript
const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    console.log('Enter key pressed!');
  }
  if (e.key === 'Escape') {
    console.log('Escape key pressed!');
  }
};

<input onKeyDown={handleKeyDown} />
```

### 🎯 Event Object Properties

Common properties you might need:

```javascript
const handleEvent = (e) => {
  console.log(e.target.value);      // Input value
  console.log(e.target.name);       // Element name
  console.log(e.target.type);       // Element type
  console.log(e.target.checked);    // For checkboxes/radios
  console.log(e.key);               // Key pressed (for keyboard events)
  console.log(e.preventDefault);    // Function to prevent default behavior
  console.log(e.stopPropagation);   // Function to stop event bubbling
};
```

### ⚠️ Important Concepts

#### 1. Event Bubbling
Events bubble up from child to parent elements:

```javascript
function Parent() {
  const handleParentClick = () => {
    console.log('Parent clicked');
  };
  
  return (
    <div onClick={handleParentClick}>
      <button onClick={() => console.log('Button clicked')}>
        Click Me
      </button>
      {/* Clicking button will log both messages! */}
    </div>
  );
}
```

**To stop bubbling:**
```javascript
<button onClick={(e) => {
  e.stopPropagation();  // Stops event from bubbling up
  console.log('Button clicked');
}}>
  Click Me
</button>
```

#### 2. Synthetic Events
React wraps native browser events in **SyntheticEvent** objects. They work the same way but are optimized for performance.

```javascript
// React's SyntheticEvent
const handleClick = (e) => {
  e.preventDefault();  // Works just like native event
  e.stopPropagation();
};
```

### 🎓 Complete Example: Login Form

```javascript
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          Remember me
        </label>
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### 🎯 Placement Interview Questions

**Q1: What's the difference between onClick={handleClick} and onClick={handleClick()}?**
- `onClick={handleClick}` - Passes function reference (correct)
- `onClick={handleClick()}` - Calls function immediately on render (wrong)

**Q2: Why do we use e.preventDefault() in form submission?**
- Prevents the default browser behavior of refreshing the page
- Allows React to handle the form submission

**Q3: What is event.target?**
- `event.target` refers to the DOM element that triggered the event
- Commonly used: `e.target.value`, `e.target.name`, `e.target.checked`

**Q4: How do you handle multiple inputs with one onChange handler?**
- Use the `name` attribute on inputs
- Use computed property names: `[name]: value`
- Or use separate handlers for each input

**Q5: What's the difference between onChange and onInput?**
- `onChange` fires when input loses focus (blur) or value changes
- `onInput` fires on every keystroke
- React recommends using `onChange`

**Q6: What is event bubbling?**
- Events bubble up from child to parent elements
- Use `e.stopPropagation()` to prevent bubbling

**Q7: How do you handle checkbox onChange?**
- Use `e.target.checked` instead of `e.target.value`
- Example: `onChange={(e) => setIsChecked(e.target.checked)}`

### 📋 Practice Exercises

1. **Create a button that changes color when clicked**
2. **Build a form with name, email, and password fields**
3. **Make a toggle switch using checkbox**
4. **Create a search input that filters a list as you type**
5. **Build a form with validation that shows errors**

### ✅ Key Takeaways

1. ✅ React events use **camelCase** (onClick, onChange, not onclick, onchange)
2. ✅ Pass function reference, don't call it: `onClick={handleClick}` not `onClick={handleClick()}`
3. ✅ Use `e.preventDefault()` in form submission to prevent page refresh
4. ✅ For inputs: use `e.target.value`, for checkboxes: use `e.target.checked`
5. ✅ You can handle multiple inputs with one handler using `name` attribute
6. ✅ Events bubble up from child to parent (use `e.stopPropagation()` to stop)

---

## 3️⃣ Conditional Rendering (`&&`, ternary)

### 🎯 What is Conditional Rendering?

**Conditional Rendering** means showing different UI elements based on certain conditions. It's like using `if-else` statements, but for JSX.

**Real-world examples:**
- Show "Login" button if user is not logged in, "Logout" if logged in
- Display error message only if there's an error
- Show loading spinner while data is being fetched
- Display different content based on user role (admin vs regular user)

### 🔍 Why Do We Need Conditional Rendering?

In React, we often need to:
- Show/hide elements based on state
- Display different content for different scenarios
- Handle loading, error, and success states
- Create dynamic UIs that respond to user actions

### 📖 Method 1: if-else Statements (Outside JSX)

You can use regular JavaScript `if-else` statements before the return statement:

```javascript
function Greeting({ isLoggedIn }) {
  let message;
  
  if (isLoggedIn) {
    message = <h1>Welcome back!</h1>;
  } else {
    message = <h1>Please log in.</h1>;
  }
  
  return <div>{message}</div>;
}
```

**Or with early return:**

```javascript
function UserProfile({ user }) {
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### 📖 Method 2: Logical AND Operator (`&&`)

The `&&` operator is perfect for showing/hiding a single element.

#### Basic Syntax

```javascript
{condition && <JSX Element />}
```

**How it works:**
- If `condition` is `true`, the element after `&&` is rendered
- If `condition` is `false`, nothing is rendered (React renders `null`)

#### Simple Examples

```javascript
function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState(0);
  
  return (
    <div>
      {/* Show message only if isVisible is true */}
      {isVisible && <p>This is visible!</p>}
      
      {/* Show count only if it's greater than 0 */}
      {count > 0 && <p>Count: {count}</p>}
      
      {/* Show error only if there's an error */}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

#### Real-World Example: Loading State

```javascript
function DataDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && !loading && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      )}
    </div>
  );
}
```

#### ⚠️ Common Mistake with `&&`

**❌ WRONG - Using numbers/strings directly:**
```javascript
// ❌ If count is 0, React will render "0" on screen!
{count && <p>Count: {count}</p>}

// ✅ CORRECT - Use boolean explicitly
{count > 0 && <p>Count: {count}</p>}
// OR
{!!count && <p>Count: {count}</p>}
```

**Why?** Because:
- `0 && <p>...</p>` evaluates to `0` (falsy), and React renders `0`
- `count > 0 && <p>...</p>` evaluates to `false` (falsy), and React renders nothing

**Other falsy values to watch out for:**
```javascript
// ❌ These will cause issues:
{items.length && <List items={items} />}  // If length is 0, shows "0"
{user.name && <p>{user.name}</p>}  // If name is "", shows nothing (okay)

// ✅ Better:
{items.length > 0 && <List items={items} />}
{user.name !== '' && <p>{user.name}</p>}
```

### 📖 Method 3: Ternary Operator (`? :`)

The ternary operator is perfect for choosing between two options.

#### Basic Syntax

```javascript
{condition ? <JSX if true> : <JSX if false>}
```

#### Simple Examples

```javascript
function LoginButton({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

#### Multiple Use Cases

**1. Toggle Content**
```javascript
function ToggleContent() {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Details
      </button>
      {showDetails ? (
        <div>
          <p>These are the details...</p>
          <p>More information here...</p>
        </div>
      ) : (
        <p>Click button to see details</p>
      )}
    </div>
  );
}
```

**2. Conditional Styling**
```javascript
function StatusBadge({ status }) {
  return (
    <span
      style={{
        color: status === 'active' ? 'green' : 'red',
        backgroundColor: status === 'active' ? 'lightgreen' : 'lightcoral'
      }}
    >
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  );
}
```

**3. Conditional Classes**
```javascript
function Button({ isDisabled }) {
  return (
    <button
      className={isDisabled ? 'btn btn-disabled' : 'btn btn-active'}
      disabled={isDisabled}
    >
      Click Me
    </button>
  );
}
```

**4. Nested Ternary (Use Sparingly)**
```javascript
function StatusMessage({ status }) {
  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>Error occurred!</p>
      ) : (
        <p>Success!</p>
      )}
    </div>
  );
}
```

**Note:** For complex conditions, prefer `if-else` or `switch` statements for better readability.

### 📖 Method 4: Multiple Conditions (if-else-if)

For multiple conditions, use `if-else` statements:

```javascript
function UserRole({ role }) {
  let content;
  
  if (role === 'admin') {
    content = <AdminPanel />;
  } else if (role === 'moderator') {
    content = <ModeratorPanel />;
  } else if (role === 'user') {
    content = <UserPanel />;
  } else {
    content = <GuestPanel />;
  }
  
  return <div>{content}</div>;
}
```

**Or with early returns:**

```javascript
function UserRole({ role }) {
  if (role === 'admin') {
    return <AdminPanel />;
  }
  
  if (role === 'moderator') {
    return <ModeratorPanel />;
  }
  
  if (role === 'user') {
    return <UserPanel />;
  }
  
  return <GuestPanel />;
}
```

### 🎓 Combining Multiple Methods

You can combine different conditional rendering methods:

```javascript
function ProductCard({ product, user }) {
  const [isInCart, setIsInCart] = useState(false);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      
      {/* Show discount badge only if product is on sale */}
      {product.onSale && (
        <span className="badge">On Sale!</span>
      )}
      
      {/* Show different buttons based on user status */}
      {user ? (
        <button onClick={() => setIsInCart(!isInCart)}>
          {isInCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      ) : (
        <button>Login to Purchase</button>
      )}
      
      {/* Show stock status */}
      {product.stock === 0 ? (
        <p className="out-of-stock">Out of Stock</p>
      ) : product.stock < 10 ? (
        <p className="low-stock">Only {product.stock} left!</p>
      ) : (
        <p className="in-stock">In Stock</p>
      )}
    </div>
  );
}
```

### 🎯 Real-World Example: Complete Form with Validation

```javascript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.message) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    // Submit form (simulate API call)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };
  
  // Show success message after submission
  if (isSubmitted) {
    return (
      <div className="success-message">
        <h2>Thank you!</h2>
        <p>Your message has been sent successfully.</p>
        <button onClick={() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }}>
          Send Another Message
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Your Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Your Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Your Message"
        />
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### ⚠️ Common Mistakes & Best Practices

#### ❌ **MISTAKE 1: Rendering Falsy Values**
```javascript
// ❌ WRONG
{items.length && <List items={items} />}  // Shows "0" if empty

// ✅ CORRECT
{items.length > 0 && <List items={items} />}
```

#### ❌ **MISTAKE 2: Complex Nested Ternaries**
```javascript
// ❌ WRONG - Hard to read
{status === 'loading' ? <Loader /> : status === 'error' ? <Error /> : status === 'success' ? <Success /> : <Default />}

// ✅ CORRECT - Use if-else or early returns
if (status === 'loading') return <Loader />;
if (status === 'error') return <Error />;
if (status === 'success') return <Success />;
return <Default />;
```

#### ❌ **MISTAKE 3: Forgetting to Return JSX**
```javascript
// ❌ WRONG
function Component({ condition }) {
  if (condition) {
    <div>Content</div>  // Missing return!
  }
  return <div>Default</div>;
}

// ✅ CORRECT
function Component({ condition }) {
  if (condition) {
    return <div>Content</div>;
  }
  return <div>Default</div>;
}
```

#### ✅ **BEST PRACTICE: Extract Complex Logic**
```javascript
// ✅ GOOD - Extract to function
function getStatusBadge(status) {
  if (status === 'active') {
    return <span className="badge-success">Active</span>;
  }
  if (status === 'pending') {
    return <span className="badge-warning">Pending</span>;
  }
  return <span className="badge-error">Inactive</span>;
}

function UserCard({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      {getStatusBadge(user.status)}
    </div>
  );
}
```

### 🎯 When to Use Which Method?

| Method | Use When | Example |
|--------|----------|---------|
| `if-else` (outside JSX) | Multiple conditions, complex logic | User roles, form validation |
| `&&` | Show/hide single element | Error messages, loading spinners |
| `ternary` | Choose between 2 options | Login/Logout button, show/hide toggle |
| Early return | Guard clauses, prevent rendering | Authentication checks |

### 🎯 Placement Interview Questions

**Q1: What is conditional rendering in React?**
- Showing different UI elements based on conditions
- Similar to if-else statements but for JSX
- Essential for creating dynamic, interactive UIs

**Q2: What's the difference between `&&` and ternary operator?**
- `&&` is for showing/hiding a single element (one-way)
- Ternary is for choosing between two options (two-way)
- `condition && <Element />` vs `condition ? <A /> : <B />`

**Q3: What happens if you use `0 && <Component />`?**
- React will render `0` on the screen (not nothing!)
- Always use boolean conditions: `count > 0 && <Component />`
- Or convert to boolean: `!!count && <Component />`

**Q4: Can you use if-else inside JSX?**
- No, you can't use if-else statements directly inside JSX
- Use ternary operator or logical operators instead
- Or use if-else before the return statement

**Q5: What's the best way to handle multiple conditions?**
- Use if-else statements before return (most readable)
- Or use early returns for guard clauses
- Avoid deeply nested ternary operators

**Q6: How do you conditionally render nothing?**
- Return `null` from component
- Or use `condition && <Element />` where condition is false
- React won't render `null` or `false`

**Q7: Can you use switch statements for conditional rendering?**
- Yes, but outside JSX (before return)
- Store result in variable, then render it
- Good for multiple conditions with same variable

### 📋 Practice Exercises

1. **Create a component that shows "Hello" if user is logged in, "Please login" if not**
2. **Build a notification component that shows different messages based on type (success, error, warning)**
3. **Make a product card that shows "Out of Stock" badge when stock is 0**
4. **Create a form that shows validation errors only when they exist**
5. **Build a toggle component that shows/hides content with a button**

### ✅ Key Takeaways

1. ✅ Use `&&` for showing/hiding single elements: `{condition && <Element />}`
2. ✅ Use ternary for choosing between two options: `{condition ? <A /> : <B />}`
3. ✅ Use `if-else` for complex logic (before return statement)
4. ✅ Always use boolean conditions with `&&` to avoid rendering falsy values
5. ✅ Early returns are great for guard clauses and preventing rendering
6. ✅ Extract complex conditional logic into separate functions for readability
7. ✅ React renders `null` and `false` as nothing (won't show on screen)

---

**Next Topic:** Rendering Lists & Using Keys → Coming next!

