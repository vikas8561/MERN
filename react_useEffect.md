# useEffect Hook — Side Effects & Cleanup

---

## 1. What are Hooks & Why?

### 🎯 What are React Hooks?

**Hooks** are special functions in React that let you "hook into" React features like state and lifecycle methods. They were introduced in React 16.8 to allow functional components to have the same capabilities as class components.

**Key Hooks:**
- `useState` - Manage component state
- `useEffect` - Handle side effects
- `useRef` - Access DOM elements or store mutable values
- `useContext` - Access React Context
- `useReducer` - Manage complex state logic
- And many more...

### 🔍 Why Do We Need Hooks?

**Before Hooks (Class Components):**
```javascript
// ❌ Old way - Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }
  
  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }
  
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

**With Hooks (Functional Components):**
```javascript
// ✅ New way - Functional Component with Hooks
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  });
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Benefits of Hooks:**
1. ✅ **Simpler code** - Less boilerplate, easier to read
2. ✅ **Reusable logic** - Can create custom hooks
3. ✅ **Better organization** - Related logic stays together
4. ✅ **No more `this`** - Avoid confusion with `this` binding
5. ✅ **React's future** - Class components are being phased out

### 📋 Rules of Hooks

**IMPORTANT - Always follow these rules:**

1. **Only call Hooks at the top level**
   - Don't call Hooks inside loops, conditions, or nested functions
   - Always call them in the same order

2. **Only call Hooks from React functions**
   - Call Hooks from React functional components
   - Call Hooks from custom Hooks

```javascript
// ❌ WRONG - Hook inside condition
function Component() {
  if (condition) {
    const [count, setCount] = useState(0);  // Don't do this!
  }
}

// ✅ CORRECT - Hook at top level
function Component() {
  const [count, setCount] = useState(0);  // Always at top
  
  if (condition) {
    // Use count here
  }
}
```

---

## 2. useEffect Hook — Side Effects & Cleanup

### 🎯 What are Side Effects?

**Side Effects** are operations that affect something outside the scope of the function being executed. In React, side effects include:

- **Data fetching** - Getting data from an API
- **Setting up subscriptions** - Listening to events
- **Manually changing the DOM** - Updating document title, adding event listeners
- **Timers** - `setInterval`, `setTimeout`
- **Cleanup operations** - Removing event listeners, canceling API calls

**Think of it this way:**
- **Rendering** = What the component displays (JSX)
- **Side Effects** = Everything else that happens (API calls, timers, etc.)

### 🔍 Why Do We Need useEffect?

In React, we can't perform side effects directly in the component body because:
1. Components render frequently (on every state/prop change)
2. Side effects should run at specific times (after render, on mount, on unmount)
3. We need a way to clean up side effects (cancel timers, remove listeners)

**Without useEffect (❌ WRONG):**
```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  // ❌ This runs on EVERY render - creates infinite loop!
  setInterval(() => {
    setSeconds(seconds + 1);
  }, 1000);
  
  return <div>Seconds: {seconds}</div>;
}
```

**With useEffect (✅ CORRECT):**
```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty dependency array = run once on mount
  
  return <div>Seconds: {seconds}</div>;
}
```

### 📖 Basic Syntax

```javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Side effect code here
    // This runs AFTER the component renders
    
    // Optional: Return cleanup function
    return () => {
      // Cleanup code here
      // This runs when component unmounts or before re-running effect
    };
  }, [dependencies]); // Dependency array
  
  return <div>...</div>;
}
```

**How it works:**
1. Component renders
2. React updates the DOM
3. **Then** `useEffect` runs
4. If dependencies change, effect runs again
5. Before re-running or unmounting, cleanup function runs (if provided)

### 📝 useEffect with Different Dependency Arrays

#### 1. No Dependency Array (Runs on Every Render)

```javascript
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component rendered!');
    // This runs after EVERY render
  }); // No dependency array
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**When it runs:** After every render (initial + every update)

**⚠️ Warning:** This can cause performance issues if the effect is expensive!

#### 2. Empty Dependency Array (Runs Once on Mount)

```javascript
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted!');
    // This runs ONLY ONCE when component first mounts
  }, []); // Empty array = run once
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

**When it runs:** Only once, after the initial render (component mount)

**Common use cases:**
- Fetching data on component mount
- Setting up subscriptions
- Initializing timers

#### 3. With Dependencies (Runs When Dependencies Change)

```javascript
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    // This runs when 'count' changes
  }, [count]); // Runs when 'count' changes
  
  useEffect(() => {
    console.log(`Name or count changed`);
    // This runs when 'name' OR 'count' changes
  }, [name, count]); // Runs when any dependency changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <button onClick={() => setName('Jane')}>Change Name</button>
    </div>
  );
}
```

**When it runs:** After initial render AND whenever any dependency value changes

**Important:** React compares dependencies using `Object.is()` (similar to `===`)

### 🧹 Cleanup Function

The cleanup function runs:
1. **Before the effect runs again** (if dependencies changed)
2. **When the component unmounts** (removed from DOM)

#### Basic Cleanup Example

```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(interval); // Stop the timer
      console.log('Timer cleaned up!');
    };
  }, []); // Run once on mount
  
  return <div>Seconds: {seconds}</div>;
}
```

**What happens:**
1. Component mounts → Timer starts
2. Component unmounts → Cleanup runs → Timer stops

#### Cleanup on Dependency Change

```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    console.log(`Searching for: ${query}`);
    
    // Simulate API call
    const timeoutId = setTimeout(() => {
      setResults([`Result 1 for ${query}`, `Result 2 for ${query}`]);
    }, 500);
    
    // Cleanup: Cancel previous search if query changes
    return () => {
      clearTimeout(timeoutId);
      console.log(`Cancelled search for: ${query}`);
    };
  }, [query]); // Runs when 'query' changes
  
  return (
    <div>
      <h3>Results for: {query}</h3>
      {results.map((result, i) => <p key={i}>{result}</p>)}
    </div>
  );
}
```

**What happens:**
1. User types "react" → Effect runs → Starts search
2. User types "react hooks" → Cleanup runs (cancels "react" search) → New effect runs (starts "react hooks" search)

### 🎓 Common Use Cases

#### 1. Fetching Data from API

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset states when userId changes
    setLoading(true);
    setError(null);
    
    // Fetch user data
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

#### 2. Updating Document Title

```javascript
function Page({ title }) {
  useEffect(() => {
    // Save original title
    const originalTitle = document.title;
    
    // Update title
    document.title = `${title} - My App`;
    
    // Cleanup: Restore original title
    return () => {
      document.title = originalTitle;
    };
  }, [title]); // Update when title prop changes
  
  return <h1>{title}</h1>;
}
```

#### 3. Event Listeners

```javascript
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Run once on mount
  
  return (
    <div>
      <p>Width: {windowSize.width}px</p>
      <p>Height: {windowSize.height}px</p>
    </div>
  );
}
```

#### 4. Subscriptions (WebSocket, etc.)

```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    // Connect to WebSocket
    const socket = new WebSocket(`ws://example.com/chat/${roomId}`);
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    
    // Cleanup: Close connection
    return () => {
      socket.close();
    };
  }, [roomId]); // Reconnect when roomId changes
  
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
    </div>
  );
}
```

#### 5. Timer/Interval

```javascript
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    
    // Cleanup: Clear interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // Re-run when isRunning changes
  
  return (
    <div>
      <h2>Time: {seconds}s</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
```

### ⚠️ Common Mistakes & Best Practices

#### ❌ **MISTAKE 1: Missing Dependencies**

```javascript
// ❌ WRONG - Missing 'count' in dependency array
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, []); // Missing 'count' - effect won't update when count changes!
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// ✅ CORRECT - Include all dependencies
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Now it updates when count changes
```

**React's ESLint plugin will warn you about missing dependencies!**

#### ❌ **MISTAKE 2: Infinite Loops**

```javascript
// ❌ WRONG - Creates infinite loop!
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // This triggers re-render, which triggers effect again!
  }, [count]); // count changes, so effect runs again, which changes count...
  
  return <div>Count: {count}</div>;
}

// ✅ CORRECT - Use functional update or remove dependency
useEffect(() => {
  // Only run once on mount
  setCount(prev => prev + 1);
}, []); // Empty array = run once
```

#### ❌ **MISTAKE 3: Forgetting Cleanup**

```javascript
// ❌ WRONG - Memory leak! Timer never stops
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    // No cleanup - timer keeps running even after component unmounts!
  }, []);
  
  return <div>Seconds: {seconds}</div>;
}

// ✅ CORRECT - Always cleanup timers and subscriptions
useEffect(() => {
  const interval = setInterval(() => {
    setSeconds(prev => prev + 1);
  }, 1000);
  
  return () => clearInterval(interval); // Cleanup!
}, []);
```

#### ❌ **MISTAKE 4: Using Stale State in Cleanup**

```javascript
// ❌ WRONG - Cleanup uses stale 'count' value
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(count); // Uses current count
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      console.log('Cleaned up:', count); // Uses OLD count value!
    };
  }, [count]);
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// ✅ CORRECT - Use refs if you need latest value in cleanup
import { useRef } from 'react';

function Component() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  
  useEffect(() => {
    countRef.current = count; // Always keep ref updated
  });
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(countRef.current);
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      console.log('Cleaned up:', countRef.current); // Uses latest value
    };
  }, [count]);
}
```

#### ✅ **BEST PRACTICE: Separate Concerns**

```javascript
// ✅ GOOD - Separate effects for different concerns
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [onlineStatus, setOnlineStatus] = useState(false);
  
  // Effect 1: Fetch user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  // Effect 2: Subscribe to online status
  useEffect(() => {
    const subscription = subscribeToStatus(userId, setOnlineStatus);
    return () => subscription.unsubscribe();
  }, [userId]);
  
  return <div>...</div>;
}
```

#### ✅ **BEST PRACTICE: Use Functional Updates**

```javascript
// ✅ GOOD - Functional updates prevent dependency issues
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1); // Uses previous value, no need for 'count' in deps
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Empty array is fine because we use functional update
}
```

### 🎯 Real-World Example 1: Live Search with Debouncing

```javascript
import { useState, useEffect } from 'react';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Don't search if query is empty
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    // Debounce: Wait 500ms before searching
    const timeoutId = setTimeout(() => {
      // Simulate API call
      fetch(`https://api.example.com/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.results);
          setLoading(false);
        })
        .catch(err => {
          console.error('Search failed:', err);
          setLoading(false);
        });
    }, 500); // Wait 500ms after user stops typing
    
    // Cleanup: Cancel previous search if query changes
    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    };
  }, [query]); // Re-run when query changes
  
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      
      {loading && <p>Searching...</p>}
      
      <ul>
        {results.map((result, i) => (
          <li key={i}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

**How it works:**
1. User types "react" → Effect starts 500ms timer
2. User types "hooks" (before 500ms) → Cleanup cancels "react" timer → New timer starts for "react hooks"
3. After 500ms of no typing → API call is made

### 🎯 Real-World Example 2: Online Status Indicator

```javascript
import { useState, useEffect } from 'react';

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    // Update status when online/offline events fire
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Cleanup: Remove event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Run once on mount
  
  return (
    <div>
      <span
        style={{
          color: isOnline ? 'green' : 'red',
          fontWeight: 'bold'
        }}
      >
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </span>
    </div>
  );
}
```

### 🎯 Real-World Example 3: Auto-Save Form

```javascript
import { useState, useEffect } from 'react';

function AutoSaveForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Auto-save when form data changes
  useEffect(() => {
    // Don't save if form is empty
    if (!formData.title && !formData.content) {
      return;
    }
    
    // Debounce: Wait 1 second after user stops typing
    const timeoutId = setTimeout(() => {
      setSaving(true);
      setSaved(false);
      
      // Simulate API call to save
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(() => {
          setSaved(true);
          setSaving(false);
          
          // Hide "saved" message after 2 seconds
          setTimeout(() => setSaved(false), 2000);
        })
        .catch(err => {
          console.error('Save failed:', err);
          setSaving(false);
        });
    }, 1000);
    
    // Cleanup: Cancel save if user keeps typing
    return () => {
      clearTimeout(timeoutId);
    };
  }, [formData]); // Re-run when formData changes
  
  return (
    <form>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
      />
      
      <textarea
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        placeholder="Content"
        rows={10}
      />
      
      <div>
        {saving && <span>Saving...</span>}
        {saved && <span style={{ color: 'green' }}>✓ Saved!</span>}
      </div>
    </form>
  );
}
```

### 🎯 Real-World Example 4: Weather App with API

```javascript
import { useState, useEffect } from 'react';

function WeatherApp({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset states when city changes
    setLoading(true);
    setError(null);
    setWeather(null);
    
    // AbortController for canceling fetch
    const abortController = new AbortController();
    
    // Fetch weather data
    fetch(`https://api.weather.com/data/${city}`, {
      signal: abortController.signal
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }
        return response.json();
      })
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        // Don't set error if fetch was aborted
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });
    
    // Cleanup: Cancel fetch if city changes or component unmounts
    return () => {
      abortController.abort();
    };
  }, [city]); // Re-fetch when city changes
  
  if (loading) {
    return <div>Loading weather for {city}...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!weather) {
    return <div>No weather data available</div>;
  }
  
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
      <p>Humidity: {weather.humidity}%</p>
    </div>
  );
}
```

### 🎯 Real-World Example 5: Chat Application with Scroll Position

```javascript
import { useState, useEffect, useRef } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Fetch messages when room changes
  useEffect(() => {
    fetch(`/api/rooms/${roomId}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data));
  }, [roomId]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Scroll when messages change
  
  // Subscribe to new messages via WebSocket
  useEffect(() => {
    const socket = new WebSocket(`ws://example.com/rooms/${roomId}`);
    
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };
    
    return () => {
      socket.close();
    };
  }, [roomId]);
  
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    fetch(`/api/rooms/${roomId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newMessage })
    });
    
    setNewMessage('');
  };
  
  return (
    <div>
      <div style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg.text}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
```

### 🎯 Placement Interview Questions

**Q1: What is useEffect and why do we need it?**
- `useEffect` is a Hook that lets you perform side effects in functional components
- Side effects include: API calls, subscriptions, timers, DOM manipulation
- It runs after the component renders
- We need it because side effects can't be done directly in the render phase

**Q2: When does useEffect run?**
- After every render (if no dependency array)
- Once on mount (if empty dependency array `[]`)
- After render AND when dependencies change (if dependency array has values)

**Q3: What is the cleanup function in useEffect?**
- A function returned from useEffect that runs before:
  - The effect runs again (if dependencies changed)
  - The component unmounts
- Used to clean up: timers, subscriptions, event listeners, API calls

**Q4: What happens if you forget to include a dependency in the dependency array?**
- The effect will use stale values from previous renders
- React's ESLint plugin will warn you about missing dependencies
- Can lead to bugs where the effect doesn't update when it should

**Q5: Can you use async/await directly in useEffect?**
- No, you can't make the effect function itself async
- But you can create an async function inside useEffect and call it
- Example: `useEffect(() => { async function fetchData() { ... } fetchData(); }, [])`

**Q6: What's the difference between useEffect and useLayoutEffect?**
- `useEffect` runs after the browser paints (asynchronous)
- `useLayoutEffect` runs synchronously before the browser paints
- Use `useLayoutEffect` when you need to measure DOM or prevent visual flicker

**Q7: How do you prevent useEffect from running on every render?**
- Add a dependency array: `useEffect(() => {...}, [])` for once, or `useEffect(() => {...}, [dep1, dep2])` for when specific values change

**Q8: What happens if you set state in useEffect without dependencies?**
- Creates an infinite loop if the state change triggers a re-render
- The effect runs → sets state → component re-renders → effect runs again → infinite loop

**Q9: How do you cancel a fetch request in useEffect?**
- Use `AbortController` and pass its signal to fetch
- Call `abortController.abort()` in the cleanup function
- Handle `AbortError` in the catch block

**Q10: Can you have multiple useEffect hooks in one component?**
- Yes! You can have as many as you need
- It's actually recommended to separate different concerns into different effects
- Each effect runs independently based on its own dependencies

### 📋 Practice Exercises

1. **Create a timer that counts up from 0, with start/stop/reset buttons**
2. **Build a component that fetches and displays user data from an API**
3. **Make a search input that debounces API calls (wait 500ms after user stops typing)**
4. **Create a component that shows the current window size and updates on resize**
5. **Build an auto-save form that saves data 2 seconds after user stops typing**
6. **Make a component that updates the document title based on a prop**
7. **Create a chat component that auto-scrolls to bottom when new messages arrive**

### ✅ Key Takeaways

1. ✅ `useEffect` lets you perform side effects in functional components
2. ✅ Side effects run AFTER the component renders
3. ✅ Always include all dependencies in the dependency array (or use functional updates)
4. ✅ Always clean up: timers, subscriptions, event listeners, API calls
5. ✅ Empty dependency array `[]` = run once on mount
6. ✅ No dependency array = run on every render (use carefully!)
7. ✅ Cleanup function runs before effect re-runs or component unmounts
8. ✅ You can have multiple `useEffect` hooks in one component
9. ✅ Use `AbortController` to cancel fetch requests
10. ✅ Separate different concerns into different effects for better organization

---

**Next Topic:** useRef Hook → Coming next!

