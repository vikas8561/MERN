# Redux in React — Complete Guide & Notes

---

## What is Redux?

**Redux** is a predictable state management library for JavaScript applications, most commonly used with React. It helps you manage global application state in a centralized store, making it easier to debug, test, and maintain large applications.

### Why Redux?

**Problems Redux Solves:**

1. **Prop Drilling**: Passing props through many component levels
2. **State Management Complexity**: Managing state across multiple components
3. **Predictable State Updates**: All state changes happen in one place
4. **Time-Travel Debugging**: Redux DevTools allows you to see every state change
5. **Testability**: Pure functions make testing easier

**When to Use Redux:**

- ✅ Large applications with complex state
- ✅ State needs to be shared across many components
- ✅ Need time-travel debugging
- ✅ Want predictable state updates
- ✅ Working with a team (consistent patterns)

**When NOT to Use Redux:**

- ❌ Small applications (use `useState` or `useContext`)
- ❌ Simple state that doesn't need to be shared
- ❌ Learning React (master React first!)

---

## Core Concepts of Redux

Redux is built on three fundamental principles:

### 1. **Single Source of Truth**
- All application state is stored in one object tree (the **store**)
- Makes it easier to debug and understand your app

### 2. **State is Read-Only**
- The only way to change state is to dispatch an **action**
- Actions describe what happened, not how to change state

### 3. **Changes are Made with Pure Functions**
- **Reducers** are pure functions that take previous state and an action, and return new state
- No side effects, no mutations

---

## Redux Architecture

```
┌─────────────┐
│   React     │
│ Components  │
└──────┬──────┘
       │ dispatch(action)
       ▼
┌─────────────┐
│   Action    │  ← Describes what happened
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Reducer   │  ← Pure function that updates state
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Store    │  ← Single source of truth
└──────┬──────┘
       │ getState()
       ▼
┌─────────────┐
│   React     │
│ Components  │  ← Components re-render with new state
└─────────────┘
```

---

## Redux Terminology

### 1. **Store**
- The single JavaScript object that holds the entire application state
- Created using `createStore()` (old) or `configureStore()` (Redux Toolkit)

### 2. **Action**
- Plain JavaScript object that describes what happened
- Must have a `type` property
- Can have additional data (payload)

```javascript
// Example Action
{
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```

### 3. **Action Creator**
- Function that creates and returns an action object
- Makes actions reusable and easier to test

```javascript
// Action Creator
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: text
  };
}
```

### 4. **Reducer**
- Pure function that takes current state and an action, returns new state
- Must not mutate state, must return new state object
- Handles all state updates

```javascript
// Reducer
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload }];
    default:
      return state;
  }
}
```

### 5. **Dispatch**
- Method to send actions to the store
- The only way to trigger state changes

```javascript
store.dispatch(addTodo('Learn Redux'));
```

### 6. **Slice** (Redux Toolkit)
- A **slice** is a collection of Redux reducer logic and actions for a single feature
- Combines reducer logic, action creators, and action types in one file
- Created using `createSlice()` from Redux Toolkit
- Automatically generates action creators and action types

**What is a Slice?**

Think of a slice as a "piece" of your Redux store that handles one specific feature or domain of your application. For example:
- `counterSlice` - handles counter state
- `todoSlice` - handles todo list state
- `userSlice` - handles user authentication state

**Why "Slice"?**

The name comes from the idea that your Redux store is like a pizza, and each feature is a "slice" of that pizza. Each slice manages its own piece of the state.

**What a Slice Contains:**

1. **Name**: Identifies the slice (e.g., 'counter', 'todos')
2. **Initial State**: The starting state for this slice
3. **Reducers**: Functions that handle state updates
4. **Actions**: Automatically generated from reducer names

**Example Slice Structure:**

```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',           // Slice name
  initialState: { value: 0 }, // Initial state
  reducers: {                // Reducer functions
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

// Slice automatically creates:
// - Actions: counterSlice.actions.increment, counterSlice.actions.decrement
// - Reducer: counterSlice.reducer
```

**Benefits of Slices:**

- ✅ **Less Boilerplate**: No need to write action types and action creators manually
- ✅ **Better Organization**: All related logic in one place
- ✅ **Type Safety**: Better TypeScript support
- ✅ **Immer Integration**: Can "mutate" state directly (Immer handles immutability)
- ✅ **Auto-generated Actions**: Action creators created automatically

**How Slices Work:**

```javascript
// 1. Create a slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload); // Immer makes this safe!
    }
  }
});

// 2. Export actions (auto-generated)
export const { addTodo } = todoSlice.actions;

// 3. Export reducer
export default todoSlice.reducer;

// 4. Use in store
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer  // This slice manages 'todos' part of state
  }
});

// 5. Use in components
import { useDispatch } from 'react-redux';
import { addTodo } from './todoSlice';

function Component() {
  const dispatch = useDispatch();
  dispatch(addTodo('Learn Redux')); // Action creator is auto-generated!
}
```

**Slice vs Traditional Redux:**

| Traditional Redux | Redux Toolkit Slice |
|-------------------|---------------------|
| Separate action types | Auto-generated |
| Manual action creators | Auto-generated |
| Manual reducer with switch | Object with reducer functions |
| More code | Less code |
| More files | Single file |

**Multiple Slices in One App:**

```javascript
// Store combines multiple slices
const store = configureStore({
  reducer: {
    counter: counterReducer,  // counterSlice manages counter state
    todos: todoReducer,        // todoSlice manages todos state
    users: userReducer         // userSlice manages users state
  }
});

// State structure:
// {
//   counter: { value: 0 },
//   todos: [],
//   users: []
// }
```

---

## Setting Up Redux

### Installation

```bash
# Install Redux Toolkit (recommended) and React-Redux
npm install @reduxjs/toolkit react-redux

# Or with yarn
yarn add @reduxjs/toolkit react-redux
```

**Note:** Redux Toolkit (RTK) is the modern, recommended way to use Redux. It simplifies Redux code and includes best practices.

---

## Redux Toolkit (Modern Redux)

Redux Toolkit simplifies Redux code and includes:
- `configureStore()` - Better store setup
- `createSlice()` - Easier reducer creation
- `createAsyncThunk()` - Handle async actions
- Built-in Redux DevTools support

### Project Structure

```
src/
├── store/
│   ├── index.js          # Store configuration
│   └── slices/
│       ├── counterSlice.js
│       ├── todoSlice.js
│       └── userSlice.js
├── components/
│   └── ...
└── App.js
```

---

## Example 1: Simple Counter with Redux Toolkit

### Step 1: Create a Slice

```javascript
// src/store/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1; // Redux Toolkit uses Immer, so this is safe!
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
```

**Key Points:**
- `createSlice` automatically generates action creators
- You can "mutate" state directly (Redux Toolkit uses Immer internally)
- Actions are automatically created: `increment`, `decrement`, etc.

### Step 2: Configure Store

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Step 3: Provide Store to React App

```javascript
// src/main.jsx or src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

### Step 4: Use Redux in Components

```javascript
// src/components/Counter.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../store/slices/counterSlice';

function Counter() {
  // Get state from Redux store
  const count = useSelector((state) => state.counter.value);
  
  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default Counter;
```

**React-Redux Hooks:**

- `useSelector()` - Get data from Redux store
- `useDispatch()` - Get dispatch function to send actions

---

## Example 2: Todo List with Redux Toolkit

### Step 1: Create Todo Slice

```javascript
// src/store/slices/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(t => !t.completed);
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;
```

### Step 2: Add to Store

```javascript
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer
  }
});
```

### Step 3: Todo Component

```javascript
// src/components/TodoList.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } from '../store/slices/todoSlice';

function TodoList() {
  const [input, setInput] = useState('');
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  // Filter todos based on filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      
      {/* Add Todo */}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a todo..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Filter Buttons */}
      <div>
        <button onClick={() => dispatch(setFilter('all'))}>All</button>
        <button onClick={() => dispatch(setFilter('active'))}>Active</button>
        <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
      </div>

      {/* Todo List */}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Clear Completed */}
      <button onClick={() => dispatch(clearCompleted())}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoList;
```

---

## Example 3: Async Actions with createAsyncThunk

For API calls and async operations, use `createAsyncThunk`.

### Step 1: Create Async Thunk

```javascript
// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled state
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // Rejected state
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default userSlice.reducer;
```

### Step 2: Use in Component

```javascript
// src/components/UserList.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/slices/userSlice';

function UserList() {
  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```

---

## useSelector Hook - Advanced Usage

### Selecting Specific Data

```javascript
// Select entire state
const state = useSelector((state) => state);

// Select specific slice
const todos = useSelector((state) => state.todos);

// Select with transformation
const completedTodos = useSelector((state) => 
  state.todos.todos.filter(todo => todo.completed)
);

// Select with memoization (prevents unnecessary re-renders)
import { useSelector, shallowEqual } from 'react-redux';

const { todos, filter } = useSelector(
  (state) => ({
    todos: state.todos.todos,
    filter: state.todos.filter
  }),
  shallowEqual // Only re-render if todos or filter actually changed
);
```

### Custom Selector Functions

```javascript
// src/store/selectors/todoSelectors.js
export const selectAllTodos = (state) => state.todos.todos;

export const selectActiveTodos = (state) => 
  state.todos.todos.filter(todo => !todo.completed);

export const selectCompletedTodos = (state) => 
  state.todos.todos.filter(todo => todo.completed);

export const selectTodoCount = (state) => state.todos.todos.length;

// Use in component
import { selectAllTodos } from '../store/selectors/todoSelectors';
const todos = useSelector(selectAllTodos);
```

---

## useDispatch Hook - Best Practices

### Typed Dispatch (TypeScript)

```typescript
// For TypeScript projects
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';

// In component
const dispatch = useDispatch<AppDispatch>();
const count = useSelector((state: RootState) => state.counter.value);
```

### Action Creators

```javascript
// Instead of inline actions, use action creators
import { useDispatch } from 'react-redux';
import { increment, addTodo } from '../store/slices/counterSlice';

function MyComponent() {
  const dispatch = useDispatch();

  // Good: Use action creators
  const handleIncrement = () => {
    dispatch(increment());
  };

  // Also good: With payload
  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  return (
    <button onClick={handleIncrement}>Increment</button>
  );
}
```

---

## Redux DevTools

Redux DevTools is a browser extension that lets you:
- Inspect every action and state change
- Time-travel debug (go back to previous states)
- See the full state tree
- Export/import state

### Installation

**Chrome/Edge:**
1. Install [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
2. Open DevTools → Redux tab

**Firefox:**
1. Install [Redux DevTools Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
2. Open DevTools → Redux tab

### Features

- **Action Log**: See all dispatched actions
- **State Inspector**: View current state
- **Time Travel**: Jump to any previous state
- **Diff View**: See what changed between actions

---

## Redux Patterns & Best Practices

### 1. Normalized State Shape

**❌ Bad: Nested Data**
```javascript
{
  posts: [
    { id: 1, author: { id: 1, name: 'John' }, comments: [...] },
    { id: 2, author: { id: 1, name: 'John' }, comments: [...] }
  ]
}
```

**✅ Good: Normalized Data**
```javascript
{
  posts: {
    byId: {
      1: { id: 1, authorId: 1, commentIds: [1, 2] },
      2: { id: 2, authorId: 1, commentIds: [3] }
    },
    allIds: [1, 2]
  },
  users: {
    byId: {
      1: { id: 1, name: 'John' }
    }
  },
  comments: {
    byId: {
      1: { id: 1, text: '...' },
      2: { id: 2, text: '...' }
    }
  }
}
```

### 2. Keep Reducers Pure

**❌ Bad: Side Effects in Reducer**
```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      fetch('/api/data').then(...); // Side effect!
      return state;
  }
}
```

**✅ Good: Use Async Thunks**
```javascript
export const fetchData = createAsyncThunk('data/fetch', async () => {
  const response = await fetch('/api/data');
  return response.json();
});
```

### 3. Don't Mutate State

**❌ Bad: Direct Mutation**
```javascript
function reducer(state, action) {
  state.count++; // Mutation!
  return state;
}
```

**✅ Good: Return New State**
```javascript
// Without Redux Toolkit
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}

// With Redux Toolkit (Immer handles it)
function reducer(state, action) {
  state.count++; // Safe with Immer!
}
```

### 4. Use Action Creators

**❌ Bad: Inline Actions**
```javascript
dispatch({ type: 'ADD_TODO', payload: text });
```

**✅ Good: Action Creators**
```javascript
dispatch(addTodo(text));
```

### 5. Selector Functions

**❌ Bad: Complex Logic in Component**
```javascript
const activeTodos = useSelector((state) => 
  state.todos.filter(t => !t.completed).length
);
```

**✅ Good: Reusable Selectors**
```javascript
// In selectors file
export const selectActiveTodoCount = (state) =>
  state.todos.filter(t => !t.completed).length;

// In component
const activeCount = useSelector(selectActiveTodoCount);
```

---

## Common Mistakes

### ❌ Mistake 1: Mutating State Directly (Without Redux Toolkit)

```javascript
// ❌ WRONG
function reducer(state, action) {
  state.count = state.count + 1; // Mutation!
  return state;
}

// ✅ CORRECT
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

### ❌ Mistake 2: Forgetting to Provide Store

```javascript
// ❌ WRONG - Components can't access store
function App() {
  return <Counter />;
}

// ✅ CORRECT - Wrap with Provider
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

### ❌ Mistake 3: Creating Store Inside Component

```javascript
// ❌ WRONG - Creates new store on every render
function App() {
  const store = configureStore({ reducer: counterReducer });
  return <Provider store={store}>...</Provider>;
}

// ✅ CORRECT - Create store once
const store = configureStore({ reducer: counterReducer });
function App() {
  return <Provider store={store}>...</Provider>;
}
```

### ❌ Mistake 4: Not Using Action Creators

```javascript
// ❌ WRONG - Hard to maintain
dispatch({ type: 'ADD_TODO', payload: text });

// ✅ CORRECT - Reusable and testable
dispatch(addTodo(text));
```

### ❌ Mistake 5: Overusing Redux

```javascript
// ❌ WRONG - Local state doesn't need Redux
const [isOpen, setIsOpen] = useState(false); // This is fine!

// ✅ CORRECT - Use Redux for global state
const todos = useSelector(state => state.todos); // Shared across components
```

---

## Redux vs Context API

| Feature | Redux | Context API |
|---------|-------|-------------|
| **Setup Complexity** | More complex | Simpler |
| **DevTools** | Excellent | Limited |
| **Performance** | Optimized | Can cause re-renders |
| **Best For** | Large apps, complex state | Small apps, simple state |
| **Learning Curve** | Steeper | Easier |
| **Time Travel** | Yes | No |
| **Middleware** | Yes | No |

**When to Use Each:**

- **Redux**: Large apps, complex state, need DevTools, async logic
- **Context API**: Small apps, simple state, theme/language settings

---

## Real-World Example: E-Commerce Cart

### Step 1: Cart Slice

```javascript
// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

### Step 2: Cart Component

```javascript
// src/components/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

function Cart() {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price} x {item.quantity}</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch(updateQuantity({
                  id: item.id,
                  quantity: parseInt(e.target.value)
                }))}
              />
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
}

export default Cart;
```

---

## Interview Questions

### Q1: What is Redux and why do we use it?

**Answer:**
- Redux is a predictable state management library for JavaScript apps
- Provides a centralized store for application state
- Solves prop drilling and makes state management predictable
- Great for large applications with complex state

### Q2: What are the three principles of Redux?

**Answer:**
1. **Single Source of Truth**: All state in one store
2. **State is Read-Only**: Only changed through actions
3. **Changes via Pure Functions**: Reducers are pure functions

### Q3: What is the difference between Redux and Context API?

**Answer:**
- Redux: More powerful, DevTools, middleware, better for large apps
- Context API: Simpler, built-in React, good for small apps
- Redux has better performance optimizations and debugging tools

### Q4: What is a reducer?

**Answer:**
- Pure function that takes (state, action) and returns new state
- Must not mutate state, must return new state object
- Handles all state updates based on action type

### Q5: What is an action?

**Answer:**
- Plain JavaScript object describing what happened
- Must have `type` property
- Can have additional data (payload)

### Q6: What is Redux Toolkit?

**Answer:**
- Official, opinionated way to write Redux
- Simplifies Redux code with `createSlice`, `configureStore`
- Uses Immer for safe mutations
- Includes Redux DevTools by default

### Q7: What is the difference between `useSelector` and `useDispatch`?

**Answer:**
- `useSelector`: Hook to read data from Redux store
- `useDispatch`: Hook to get dispatch function for sending actions

### Q8: How do you handle async operations in Redux?

**Answer:**
- Use `createAsyncThunk` from Redux Toolkit
- Handles pending, fulfilled, and rejected states
- Or use middleware like `redux-thunk` or `redux-saga`

### Q9: What is Redux DevTools?

**Answer:**
- Browser extension for debugging Redux apps
- Shows all actions and state changes
- Allows time-travel debugging
- Can export/import state

### Q10: When should you use Redux vs useState?

**Answer:**
- **Redux**: Global state, shared across components, complex state logic
- **useState**: Local component state, simple values, not shared

---

## Practice Exercises

### Exercise 1: Counter App
Create a counter with increment, decrement, reset, and increment by amount using Redux Toolkit.

### Exercise 2: Todo App
Build a todo app with add, toggle, delete, and filter (all/active/completed) functionality.

### Exercise 3: Shopping Cart
Create a shopping cart with add, remove, update quantity, and calculate total.

### Exercise 4: User Management
Build a user list that fetches users from an API using `createAsyncThunk`.

### Exercise 5: Theme Switcher
Create a theme switcher (light/dark mode) using Redux to manage theme state.

---

## Summary

### Key Concepts Covered:

1. **Redux Basics**: Store, Actions, Reducers, Dispatch
2. **Redux Toolkit**: Modern way to use Redux
3. **React-Redux**: Connecting Redux to React components
4. **Hooks**: `useSelector` and `useDispatch`
5. **Async Actions**: `createAsyncThunk` for API calls
6. **Best Practices**: Normalized state, pure functions, selectors
7. **DevTools**: Debugging Redux applications

### Redux Flow:

```
Component → dispatch(action) → Reducer → Store → useSelector → Component Re-renders
```

### Next Steps:

- Learn **Redux Middleware** (redux-thunk, redux-saga)
- Explore **Redux Persist** (save state to localStorage)
- Study **Normalized State** patterns
- Practice with **Real-World Projects**
- Learn **Redux Toolkit Query** for data fetching

---

## Additional Resources

- [Redux Official Documentation](https://redux.js.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React-Redux Documentation](https://react-redux.js.org/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Redux Style Guide](https://redux.js.org/style-guide/)

---

**Happy Coding with Redux! 🚀**

