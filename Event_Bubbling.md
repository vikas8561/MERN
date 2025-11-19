# JavaScript Event Handling

---

## What Does "Propagate" Mean?

**"Propagate"** means to **travel**, **spread**, or **move through** something. In JavaScript event handling, when we say an event "propagates," it means the event **travels through the DOM tree** from one element to another.

### Simple Analogy:
- when you click an element, the click event "propagates" through the DOM tree
- The event travels from the clicked element to its parent, then to the grandparent, and so on

### In Technical Terms:
- **Propagate** = The event moves/travels from one element to another in the DOM
- **Event Propagation** = The mechanism by which events travel through the DOM tree
- Events can propagate in two directions:
  1. **Downward** (Capture Phase): From root → target element
  2. **Upward** (Bubbling Phase): From target element → root

### Example:
```javascript
// When you click a button inside a div inside a form:
// The click event PROPAGATES (travels) through:
Button → Div → Form → Body → HTML → Document → Window
```

---

## Why Does Event Propagate from Child to Parent? (And Why Is It Needed?)

### Why Child to Parent?

Events propagate from **child to parent** (bubbling) because of how the DOM is structured:

1. **DOM Hierarchy**: The DOM is a tree structure where children are nested inside parents
   ```
   <div> (Parent)
     <button> (Child)
       <span> (Grandchild)
   ```

2. **Natural Flow**: When you click a button, you're also technically clicking:
   - The button itself
   - The div containing the button
   - The form containing the div
   - The body containing the form
   - And so on...

3. **Design Decision**: JavaScript designers made events bubble upward because:
   - It's intuitive: clicking a child also affects its container
   - It allows parent elements to "know" about child interactions
   - It enables powerful patterns like event delegation

### Why Is It Needed? (Real-World Benefits)

#### 1. **Event Delegation Pattern** (Most Important Benefit)
Instead of attaching listeners to hundreds of elements, attach ONE listener to the parent:

```javascript
// ❌ WITHOUT BUBBLING (Inefficient):
// You'd need to add a listener to EACH list item
document.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', handleClick);
});

// ✅ WITH BUBBLING (Efficient):
// ONE listener on the parent handles ALL children
document.getElementById('todo-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('todo-item')) {
        handleClick(e);
    }
});

// Benefits:
// - Works with dynamically added items (no need to add new listeners)
// - Better performance (fewer event listeners)
// - Less memory usage
```

#### 2. **Centralized Event Handling**
Parent elements can handle events for all their children in one place:

```javascript
// Form can handle validation for all input fields
form.addEventListener('invalid', function(e) {
    // Handle validation errors from ANY input field
    console.log('Validation error in:', e.target.name);
});
```

#### 3. **Nested Component Communication**
Child events can trigger parent actions:

```javascript
// Clicking a menu item can close the parent menu
menu.addEventListener('click', function(e) {
    if (e.target.classList.contains('menu-item')) {
        closeMenu(); // Parent handles the action
    }
});
```

#### 4. **Flexibility and Reusability**
You can add/remove child elements without worrying about event listeners:

```javascript
// Add new items dynamically - they automatically work!
function addNewItem() {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.textContent = 'New Item';
    container.appendChild(newItem);
    // No need to add event listener - parent handles it!
}
```

#### 5. **Event Logging and Analytics**
Parent can track all child interactions:

```javascript
// Track all clicks within a section
section.addEventListener('click', function(e) {
    analytics.track('click', {
        element: e.target.tagName,
        section: 'product-list'
    });
});
```

### Real-World Example: Todo List

```html
<ul id="todo-list">
    <li class="todo-item">Buy groceries</li>
    <li class="todo-item">Walk the dog</li>
    <li class="todo-item">Finish project</li>
</ul>
```

**Without Bubbling:**
```javascript
// Need 3 separate listeners
document.querySelectorAll('.todo-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('completed');
    });
});

// Problem: If you add a new item, it won't work!
```

**With Bubbling (Event Delegation):**
```javascript
// ONE listener handles ALL items (current and future)
document.getElementById('todo-list').addEventListener('click', function(e) {
    // Event bubbles from <li> to <ul>
    if (e.target.classList.contains('todo-item')) {
        e.target.classList.toggle('completed');
    }
});

// Works perfectly with dynamically added items!
```

### Summary

**Why Child to Parent?**
- Natural DOM hierarchy
- Intuitive behavior (clicking child affects parent)
- Enables powerful programming patterns

**Why Is It Needed?**
- ✅ **Event Delegation**: Handle many elements with one listener
- ✅ **Performance**: Fewer event listeners = better performance
- ✅ **Dynamic Content**: Works with elements added after page load
- ✅ **Centralized Logic**: Parent can handle all child events
- ✅ **Memory Efficiency**: Less memory usage
- ✅ **Code Maintainability**: Easier to manage and update

**Without bubbling, you'd need to:**
- Add listeners to every single element
- Re-add listeners when new elements are created
- Write more code
- Use more memory
- Have worse performance

---

## 1. Event Bubbling

### Theory

**Event Bubbling** is a mechanism in JavaScript where an event starts from the target element (the element that triggered the event) and propagates upward through its parent elements in the DOM tree, all the way up to the document root.

**Key Points:**
- Events bubble from the innermost element to the outermost element
- By default, most events bubble (except some like `focus`, `blur`, `load`, `unload`)
- The event travels through all ancestor elements
- Each parent element can handle the event if it has an event listener

**Flow:**
```
Target Element → Parent → Grandparent → ... → Document → Window
```

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Bubbling Example</title>
</head>
<body>
    <div id="grandparent" style="padding: 50px; background: lightblue;">
        Grandparent
        <div id="parent" style="padding: 30px; background: lightgreen;">
            Parent
            <div id="child" style="padding: 20px; background: lightyellow;">
                Child (Click me!)
            </div>
        </div>
    </div>

    <script>
        const grandparent = document.getElementById('grandparent');
        const parent = document.getElementById('parent');
        const child = document.getElementById('child');

        grandparent.addEventListener('click', function(e) {
            console.log('Grandparent clicked');
            console.log('Event target:', e.target.id);
            console.log('Current target:', e.currentTarget.id);
        });

        parent.addEventListener('click', function(e) {
            console.log('Parent clicked');
            console.log('Event target:', e.target.id);
            console.log('Current target:', e.currentTarget.id);
        });

        child.addEventListener('click', function(e) {
            console.log('Child clicked');
            console.log('Event target:', e.target.id);
            console.log('Current target:', e.currentTarget.id);
        });
    </script>
</body>
</html>
```

**Output when clicking on "Child":**
```
Child clicked
Event target: child
Current target: child
Parent clicked
Event target: child
Current target: parent
Grandparent clicked
Event target: child
Current target: grandparent
```

**Key Differences:**
- `e.target`: The element that originally triggered the event (remains constant)
- `e.currentTarget`: The element that is currently handling the event (changes as event bubbles)

### Real-World Use Cases

1. **Event Delegation Pattern**
   - Attach a single event listener to a parent element instead of multiple listeners to child elements
   - Useful for dynamically added elements
   - Reduces memory usage and improves performance

   ```javascript
   // Instead of adding listeners to each list item
   const list = document.getElementById('todo-list');
   
   list.addEventListener('click', function(e) {
       if (e.target.tagName === 'LI') {
           e.target.classList.toggle('completed');
       }
   });
   
   // Now you can add new items dynamically without adding new listeners
   ```

2. **Nested Menu Systems**
   - Clicking on a menu item can trigger actions on parent menu containers
   - Useful for breadcrumb navigation or nested dropdowns

3. **Modal Dialogs**
   - Clicking inside a modal might need to bubble to close handlers
   - Clicking outside can trigger close events

4. **Form Validation**
   - Individual field errors can bubble up to form-level error handlers
   - Allows centralized error handling

---

## Event Delegation (Deep Dive)

### What is Event Delegation?

**Event Delegation** is a powerful JavaScript pattern where instead of attaching event listeners to individual child elements, you attach **ONE event listener to a parent element** and let it handle events for all its children (and future children) using event bubbling.

### The Core Concept

**Traditional Approach (Without Delegation):**
```javascript
// ❌ Attach listener to EACH child element
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('click', handleClick);
});
```

**Event Delegation Approach:**
```javascript
// ✅ Attach ONE listener to parent, handle ALL children
const parent = document.getElementById('parent');
parent.addEventListener('click', function(e) {
    // Check if the clicked element matches our target
    if (e.target.classList.contains('item')) {
        handleClick(e);
    }
});
```

### How It Works

1. **Event Bubbling**: When you click a child element, the event bubbles up to the parent
2. **Parent Listener**: The parent's event listener catches the bubbled event
3. **Target Check**: Use `e.target` to identify which child was actually clicked
4. **Handle Accordingly**: Execute the appropriate action based on the target

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Delegation Example</title>
    <style>
        .todo-list {
            max-width: 400px;
            margin: 20px auto;
        }
        .todo-item {
            padding: 10px;
            margin: 5px 0;
            background: #f0f0f0;
            cursor: pointer;
            border-radius: 4px;
        }
        .todo-item:hover {
            background: #e0e0e0;
        }
        .completed {
            text-decoration: line-through;
            opacity: 0.6;
        }
        button {
            margin-top: 10px;
            padding: 8px 16px;
        }
    </style>
</head>
<body>
    <div class="todo-list" id="todo-list">
        <div class="todo-item">Buy groceries</div>
        <div class="todo-item">Walk the dog</div>
        <div class="todo-item">Finish project</div>
    </div>
    
    <button id="add-btn">Add New Item</button>

    <script>
        const todoList = document.getElementById('todo-list');
        const addBtn = document.getElementById('add-btn');
        let itemCount = 3;

        // ✅ EVENT DELEGATION: ONE listener for ALL items
        todoList.addEventListener('click', function(e) {
            // Check if clicked element is a todo item
            if (e.target.classList.contains('todo-item')) {
                // Toggle completed state
                e.target.classList.toggle('completed');
                console.log('Toggled:', e.target.textContent);
            }
        });

        // Add new items dynamically
        addBtn.addEventListener('click', function() {
            itemCount++;
            const newItem = document.createElement('div');
            newItem.className = 'todo-item';
            newItem.textContent = `New Task ${itemCount}`;
            todoList.appendChild(newItem);
            
            // ✅ No need to add event listener - delegation handles it!
            console.log('New item added - automatically works with delegation!');
        });
    </script>
</body>
</html>
```

### Key Benefits

#### 1. **Works with Dynamic Content**
```javascript
// Add new elements - they automatically work!
function addNewItem() {
    const newItem = document.createElement('div');
    newItem.className = 'item';
    container.appendChild(newItem);
    // ✅ No need to add listener - parent handles it!
}
```

#### 2. **Better Performance**
```javascript
// ❌ 1000 listeners = 1000 function references in memory
items.forEach(item => item.addEventListener('click', handler));

// ✅ 1 listener = 1 function reference
parent.addEventListener('click', handler);
```

#### 3. **Less Code**
```javascript
// ❌ Need to add/remove listeners when items change
function addItem() {
    const item = createItem();
    item.addEventListener('click', handler); // Manual listener
    container.appendChild(item);
}

// ✅ Just add the element - delegation handles it
function addItem() {
    const item = createItem();
    container.appendChild(item); // That's it!
}
```

#### 4. **Easier Maintenance**
- One place to manage event logic
- No need to track which elements have listeners
- Easier to debug

### Understanding `e.target` vs `e.currentTarget`

```javascript
parent.addEventListener('click', function(e) {
    console.log('e.target:', e.target);        // The element that was clicked (child)
    console.log('e.currentTarget:', e.currentTarget); // The element with the listener (parent)
    
    // e.target = the actual clicked element (could be deeply nested)
    // e.currentTarget = always the parent (where listener is attached)
});
```

**Example:**
```html
<div id="parent">
    <button>
        <span>Click me</span>
    </button>
</div>

<script>
    parent.addEventListener('click', function(e) {
        console.log(e.target);        // <span>Click me</span> (what you clicked)
        console.log(e.currentTarget); // <div id="parent"> (where listener is)
    });
</script>
```

### Common Patterns

#### Pattern 1: Class-Based Matching
```javascript
parent.addEventListener('click', function(e) {
    if (e.target.classList.contains('item')) {
        handleItemClick(e.target);
    }
});
```

#### Pattern 2: Tag Name Matching
```javascript
parent.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        handleListItemClick(e.target);
    }
});
```

#### Pattern 3: Data Attribute Matching
```javascript
parent.addEventListener('click', function(e) {
    if (e.target.dataset.action === 'delete') {
        deleteItem(e.target);
    }
});
```

#### Pattern 4: Closest Element (For Nested Elements)
```javascript
parent.addEventListener('click', function(e) {
    // Find closest matching ancestor
    const item = e.target.closest('.item');
    if (item) {
        handleItemClick(item);
    }
});
```

### Real-World Use Cases

#### 1. **Todo List** (As shown above)
- Click any item to toggle completion
- Add new items dynamically
- One listener handles everything

#### 2. **Table Row Actions**
```javascript
const table = document.getElementById('data-table');
table.addEventListener('click', function(e) {
    const row = e.target.closest('tr');
    if (row && e.target.classList.contains('delete-btn')) {
        deleteRow(row);
    }
});
```

#### 3. **Navigation Menus**
```javascript
const nav = document.getElementById('navigation');
nav.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link) {
        e.preventDefault();
        navigateTo(link.href);
    }
});
```

#### 4. **Button Groups**
```javascript
const buttonGroup = document.getElementById('actions');
buttonGroup.addEventListener('click', function(e) {
    if (e.target.classList.contains('action-btn')) {
        const action = e.target.dataset.action;
        performAction(action);
    }
});
```

### When NOT to Use Event Delegation

Event delegation is great, but not always the best choice:

1. **Simple, Static Elements**: If you have just a few static buttons, direct listeners are fine
2. **Events That Don't Bubble**: Some events like `focus` and `blur` don't bubble
3. **Need Immediate Stop**: If you need to stop propagation immediately, direct listeners might be clearer
4. **Complex Event Logic**: If each element needs very different handling, delegation might be confusing

### Comparison Table

| Aspect | Direct Listeners | Event Delegation |
|--------|-----------------|------------------|
| **Memory Usage** | High (many listeners) | Low (one listener) |
| **Dynamic Content** | Need to re-add listeners | Works automatically |
| **Performance** | Slower with many elements | Faster with many elements |
| **Code Complexity** | More code to manage | Less code |
| **Debugging** | Can be harder | Easier (one place) |
| **Best For** | Few static elements | Many/dynamic elements |

### Interview Question Example

**Q: How would you handle clicks on 1000 list items efficiently?**

**Answer:**
```javascript
// Use event delegation - one listener instead of 1000
const list = document.getElementById('list');
list.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        handleItemClick(e.target);
    }
});

// Benefits:
// - Only 1 event listener in memory
// - Works with dynamically added items
// - Better performance
// - Less code to maintain
```

### Summary

**Event Delegation:**
- ✅ Attach ONE listener to parent
- ✅ Handle events for ALL children (current and future)
- ✅ Uses event bubbling mechanism
- ✅ Better performance and memory usage
- ✅ Perfect for dynamic content
- ✅ Easier to maintain

**Key Points:**
- Use `e.target` to identify the clicked element
- Use `e.currentTarget` to reference the parent
- Use `closest()` for nested elements
- Check element properties (class, tag, data attributes) to filter events

---

## 2. Event Propagation

### Theory

**Event Propagation** is the overall mechanism that describes how events travel through the DOM. It consists of three phases:

1. **Capture Phase** (Phase 1)
   - Event travels from the root (window/document) down to the target element
   - Also called "trickling down"
   - Occurs before the target phase

2. **Target Phase** (Phase 2)
   - Event reaches the target element
   - Event listeners on the target element are executed

3. **Bubbling Phase** (Phase 3)
   - Event travels back up from the target to the root
   - This is the default phase most developers work with

**Complete Flow:**
```
Capture Phase: Window → Document → HTML → Body → ... → Target
Target Phase:  Target element handlers execute
Bubbling Phase: Target → ... → Body → HTML → Document → Window
```

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Propagation Example</title>
</head>
<body>
    <div id="outer" style="padding: 50px; background: lightblue;">
        Outer
        <div id="inner" style="padding: 30px; background: lightgreen;">
            Inner (Click me!)
        </div>
    </div>

    <script>
        const outer = document.getElementById('outer');
        const inner = document.getElementById('inner');

        // Capture phase (useCapture = true)
        outer.addEventListener('click', function(e) {
            console.log('Capture: Outer');
        }, true); // true = capture phase

        inner.addEventListener('click', function(e) {
            console.log('Capture: Inner');
        }, true);

        // Bubbling phase (useCapture = false, default)
        outer.addEventListener('click', function(e) {
            console.log('Bubble: Outer');
        }, false); // false = bubbling phase

        inner.addEventListener('click', function(e) {
            console.log('Bubble: Inner');
        }, false);
    </script>
</body>
</html>
```

**Output when clicking on "Inner":**
```
Capture: Outer
Capture: Inner
Bubble: Inner
Bubble: Outer
```

**Event Phase Detection:**
```javascript
element.addEventListener('click', function(e) {
    switch(e.eventPhase) {
        case Event.CAPTURING_PHASE: // 1
            console.log('Capture phase');
            break;
        case Event.AT_TARGET: // 2
            console.log('Target phase');
            break;
        case Event.BUBBLING_PHASE: // 3
            console.log('Bubbling phase');
            break;
    }
});
```

### Real-World Use Cases

1. **Performance Optimization**
   - Use capture phase for early event interception
   - Can prevent unnecessary event processing

2. **Third-Party Library Integration**
   - Libraries can use capture phase to intercept events before user code
   - Prevents conflicts with user event handlers

3. **Analytics and Logging**
   - Capture phase listeners can log all events before they reach target
   - Useful for debugging and analytics

4. **Security and Validation**
   - Intercept events in capture phase to validate or sanitize
   - Can prevent malicious event handling

---

## 3. Stop Propagation

### Theory

**Stop Propagation** is a method that prevents the event from continuing to propagate through the DOM tree. It stops the event from reaching other elements in the current phase.

**Methods:**
- `event.stopPropagation()`: Stops the event from propagating to other elements
- `event.stopImmediatePropagation()`: Stops the event and prevents other listeners on the same element from executing

**Important Notes:**
- Only stops propagation in the current phase
- If called in capture phase, bubbling phase won't occur
- If called in bubbling phase, it won't reach parent elements
- Does NOT prevent default behavior (use `preventDefault()` for that)

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Stop Propagation Example</title>
</head>
<body>
    <div id="parent" style="padding: 50px; background: lightblue;">
        Parent
        <div id="child" style="padding: 30px; background: lightgreen;">
            Child (Click me!)
        </div>
    </div>

    <script>
        const parent = document.getElementById('parent');
        const child = document.getElementById('child');

        parent.addEventListener('click', function(e) {
            console.log('Parent clicked');
        });

        child.addEventListener('click', function(e) {
            console.log('Child clicked - stopping propagation');
            e.stopPropagation(); // Prevents event from reaching parent
        });
    </script>
</body>
</html>
```

**Output when clicking on "Child":**
```
Child clicked - stopping propagation
```
(Notice: "Parent clicked" is NOT logged)

**Multiple Listeners Example:**
```javascript
const button = document.getElementById('myButton');

// First listener
button.addEventListener('click', function(e) {
    console.log('Listener 1');
    e.stopPropagation(); // Stops propagation but not other listeners
});

// Second listener (will still execute)
button.addEventListener('click', function(e) {
    console.log('Listener 2');
});

// Output: Both "Listener 1" and "Listener 2" will execute
```

### Real-World Use Cases

1. **Preventing Parent Handlers**
   - Stop a button click from triggering a card click handler
   - Prevent modal close when clicking inside modal content

   ```javascript
   // Modal example
   const modal = document.getElementById('modal');
   const modalContent = document.getElementById('modal-content');
   const closeButton = document.getElementById('close-btn');

   // Close modal when clicking outside
   modal.addEventListener('click', function() {
       modal.style.display = 'none';
   });

   // Prevent closing when clicking inside modal content
   modalContent.addEventListener('click', function(e) {
       e.stopPropagation();
   });

   // Close button
   closeButton.addEventListener('click', function(e) {
       e.stopPropagation();
       modal.style.display = 'none';
   });
   ```

2. **Nested Interactive Elements**
   - Stop a nested button from triggering parent form submission
   - Prevent nested links from triggering parent link navigation

3. **Custom Component Libraries**
   - Prevent internal component events from bubbling to parent components
   - Maintain component encapsulation

4. **Event Isolation**
   - Isolate events within specific DOM sections
   - Useful in complex applications with multiple event handlers

---

## 4. Immediate Propagation

### Theory

**Immediate Propagation** (via `stopImmediatePropagation()`) is a more aggressive version of `stopPropagation()`. It not only stops the event from propagating to other elements but also prevents other event listeners on the same element from executing.

**Key Differences:**

| Method | Stops Propagation | Stops Other Listeners on Same Element |
|--------|------------------|--------------------------------------|
| `stopPropagation()` | ✅ Yes | ❌ No |
| `stopImmediatePropagation()` | ✅ Yes | ✅ Yes |

**Execution Order:**
- Event listeners are executed in the order they were added
- Once `stopImmediatePropagation()` is called, no further listeners on that element execute

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Immediate Propagation Example</title>
</head>
<body>
    <div id="parent" style="padding: 50px; background: lightblue;">
        Parent
        <button id="button" style="padding: 20px;">
            Click Me
        </button>
    </div>

    <script>
        const parent = document.getElementById('parent');
        const button = document.getElementById('button');

        // Parent listener
        parent.addEventListener('click', function(e) {
            console.log('Parent clicked');
        });

        // Button listeners (added in order)
        button.addEventListener('click', function(e) {
            console.log('Button Listener 1');
            e.stopImmediatePropagation(); // Stops everything
        });

        button.addEventListener('click', function(e) {
            console.log('Button Listener 2'); // Will NOT execute
        });

        button.addEventListener('click', function(e) {
            console.log('Button Listener 3'); // Will NOT execute
        });
    </script>
</body>
</html>
```

**Output when clicking the button:**
```
Button Listener 1
```
(Notice: Listener 2, Listener 3, and Parent are NOT executed)

**Comparison with stopPropagation():**
```javascript
const button = document.getElementById('button');

// Using stopPropagation()
button.addEventListener('click', function(e) {
    console.log('Listener 1');
    e.stopPropagation(); // Only stops propagation
});

button.addEventListener('click', function(e) {
    console.log('Listener 2'); // WILL execute
});

// Output: Both Listener 1 and Listener 2 execute, but parent doesn't

// Using stopImmediatePropagation()
button.addEventListener('click', function(e) {
    console.log('Listener 1');
    e.stopImmediatePropagation(); // Stops everything
});

button.addEventListener('click', function(e) {
    console.log('Listener 2'); // Will NOT execute
});

// Output: Only Listener 1 executes
```

### Real-World Use Cases

1. **Priority-Based Event Handling**
   - High-priority handlers can prevent lower-priority handlers
   - Useful for security or validation checks

   ```javascript
   // Security check - must run first
   button.addEventListener('click', function(e) {
       if (!isUserAuthenticated()) {
           e.stopImmediatePropagation();
           showLoginModal();
           return;
       }
   });

   // Business logic - won't run if user not authenticated
   button.addEventListener('click', function(e) {
       processPayment();
   });
   ```

2. **Event Interception Libraries**
   - Analytics libraries can intercept and stop events
   - Debugging tools can prevent default handlers

3. **Conditional Event Processing**
   - Stop all handlers if certain conditions aren't met
   - Prevent cascading errors

4. **Plugin Systems**
   - Plugins can intercept events before core functionality
   - Allows plugins to override default behavior completely

---

## 5. Prevent Default

### Theory

**Prevent Default** (via `preventDefault()`) prevents the browser's default action associated with an event from occurring. It does NOT stop event propagation.

**Key Points:**
- Only prevents the default browser behavior
- Does NOT stop event propagation (use `stopPropagation()` for that)
- Can be used independently or together with propagation methods
- Works on cancelable events (check with `event.cancelable`)

**Common Default Behaviors:**
- `<a>` tag: Navigate to URL
- `<form>` submit: Submit form data
- `<input type="checkbox">`: Toggle checkbox
- Context menu (right-click): Show browser context menu
- Keyboard shortcuts: Browser default actions

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Prevent Default Example</title>
</head>
<body>
    <!-- Link Example -->
    <a href="https://www.google.com" id="link">
        Click me (won't navigate)
    </a>

    <!-- Form Example -->
    <form id="myForm">
        <input type="text" name="username" placeholder="Username" required>
        <button type="submit">Submit</button>
    </form>

    <!-- Checkbox Example -->
    <input type="checkbox" id="checkbox"> Check me (won't toggle)

    <script>
        // Prevent link navigation
        const link = document.getElementById('link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Link clicked but navigation prevented');
            alert('Custom action instead of navigation');
        });

        // Prevent form submission
        const form = document.getElementById('myForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submission prevented');
            
            // Custom validation and submission
            const username = form.username.value;
            if (username.length < 3) {
                alert('Username must be at least 3 characters');
                return;
            }
            
            // Custom AJAX submission
            console.log('Submitting via AJAX:', username);
        });

        // Prevent checkbox toggle
        const checkbox = document.getElementById('checkbox');
        checkbox.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Checkbox click prevented');
            // Custom toggle logic
            checkbox.checked = !checkbox.checked;
        });
    </script>
</body>
</html>
```

**Combining with stopPropagation():**
```javascript
const link = document.getElementById('link');
const parent = document.getElementById('parent');

parent.addEventListener('click', function() {
    console.log('Parent clicked');
});

link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevents navigation
    e.stopPropagation(); // Prevents parent handler
    console.log('Link clicked, both default and propagation stopped');
});
```

**Checking if event is cancelable:**
```javascript
element.addEventListener('click', function(e) {
    if (e.cancelable) {
        e.preventDefault();
    } else {
        console.log('Event is not cancelable');
    }
});
```

### Real-World Use Cases

1. **Custom Form Handling**
   - Prevent default form submission
   - Implement custom validation
   - Submit via AJAX/Fetch API

   ```javascript
   form.addEventListener('submit', function(e) {
       e.preventDefault();
       
       // Custom validation
       if (!validateForm()) {
           return;
       }
       
       // AJAX submission
       fetch('/api/submit', {
           method: 'POST',
           body: new FormData(form)
       })
       .then(response => response.json())
       .then(data => {
           console.log('Success:', data);
       });
   });
   ```

2. **Single Page Applications (SPAs)**
   - Prevent default link navigation
   - Use client-side routing instead

   ```javascript
   document.querySelectorAll('a[data-route]').forEach(link => {
       link.addEventListener('click', function(e) {
           e.preventDefault();
           const route = this.getAttribute('data-route');
           router.navigate(route); // Custom routing
       });
   });
   ```

3. **Custom Context Menus**
   - Prevent browser context menu
   - Show custom context menu

   ```javascript
   document.addEventListener('contextmenu', function(e) {
       e.preventDefault();
       showCustomContextMenu(e.clientX, e.clientY);
   });
   ```

4. **Keyboard Shortcuts**
   - Override browser shortcuts
   - Implement custom keyboard shortcuts

   ```javascript
   document.addEventListener('keydown', function(e) {
       // Prevent Ctrl+S (save page)
       if (e.ctrlKey && e.key === 's') {
           e.preventDefault();
           saveDocument(); // Custom save function
       }
   });
   ```

5. **Drag and Drop**
   - Prevent default drag behavior
   - Implement custom drag and drop

   ```javascript
   draggableElement.addEventListener('dragstart', function(e) {
       e.preventDefault(); // Prevent default drag
       // Custom drag implementation
   });
   ```

6. **File Upload Customization**
   - Prevent default file input behavior
   - Create custom file upload UI

   ```javascript
   const fileInput = document.getElementById('file-input');
   const customButton = document.getElementById('custom-upload-btn');

   customButton.addEventListener('click', function(e) {
       e.preventDefault();
       fileInput.click(); // Trigger file input
   });
   ```

---

## Interview Questions & Answers

### Q1: What's the difference between `preventDefault()` and `stopPropagation()`?

**Answer:**
- `preventDefault()`: Prevents the browser's default action (e.g., link navigation, form submission). Does NOT stop event propagation.
- `stopPropagation()`: Stops the event from bubbling up or capturing down. Does NOT prevent default behavior.

**Example:**
```javascript
link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevents navigation
    // Event still bubbles to parent
});

link.addEventListener('click', function(e) {
    e.stopPropagation(); // Stops bubbling
    // Link still navigates (default behavior)
});
```

### Q2: What's the difference between `stopPropagation()` and `stopImmediatePropagation()`?

**Answer:**
- `stopPropagation()`: Stops event from reaching other elements, but other listeners on the same element still execute.
- `stopImmediatePropagation()`: Stops event from reaching other elements AND prevents other listeners on the same element from executing.

### Q3: In what order do event phases occur?

**Answer:**
1. **Capture Phase**: Event travels from root to target
2. **Target Phase**: Event reaches target element
3. **Bubbling Phase**: Event travels from target back to root

### Q4: How can you check which phase an event is in?

**Answer:**
```javascript
element.addEventListener('click', function(e) {
    if (e.eventPhase === Event.CAPTURING_PHASE) {
        console.log('Capture phase');
    } else if (e.eventPhase === Event.AT_TARGET) {
        console.log('Target phase');
    } else if (e.eventPhase === Event.BUBBLING_PHASE) {
        console.log('Bubbling phase');
    }
});
```

### Q5: What is event delegation and how does it use bubbling?

**Answer:**
Event delegation is a pattern where you attach a single event listener to a parent element instead of multiple listeners to child elements. It leverages event bubbling - when a child element is clicked, the event bubbles up to the parent where it can be handled.

**Example:**
```javascript
// Instead of this (inefficient):
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', handleClick);
});

// Use this (efficient):
document.getElementById('container').addEventListener('click', function(e) {
    if (e.target.classList.contains('item')) {
        handleClick(e);
    }
});
```

### Q6: Can you prevent default and stop propagation at the same time?

**Answer:**
Yes, you can call both methods:
```javascript
element.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation
});
```

### Q7: What happens if you call `preventDefault()` on a non-cancelable event?

**Answer:**
Nothing happens. The method has no effect. You can check if an event is cancelable using `event.cancelable`:
```javascript
if (e.cancelable) {
    e.preventDefault();
}
```

---

## Summary Table

| Concept | Method | Effect | Use Case |
|---------|--------|--------|----------|
| **Event Bubbling** | Default behavior | Event travels up DOM tree | Event delegation |
| **Event Capture** | `addEventListener(..., true)` | Event travels down DOM tree | Early interception |
| **Stop Propagation** | `stopPropagation()` | Stops event from reaching other elements | Isolate event handling |
| **Stop Immediate** | `stopImmediatePropagation()` | Stops event and other listeners on same element | Priority-based handling |
| **Prevent Default** | `preventDefault()` | Prevents browser default action | Custom form/link handling |

---

## Best Practices

1. **Use event delegation** for dynamically added elements and better performance
2. **Be careful with `stopPropagation()`** - it can break expected behavior
3. **Use `preventDefault()`** only when you have a custom alternative
4. **Check `cancelable`** before calling `preventDefault()`
5. **Understand the difference** between `target` and `currentTarget`
6. **Consider event phases** when debugging event issues
7. **Use `stopImmediatePropagation()` sparingly** - it can be too aggressive

---

## Common Pitfalls

1. **Confusing `preventDefault()` with `stopPropagation()`**
   - Remember: preventDefault = stop browser action, stopPropagation = stop event travel

2. **Assuming all events bubble**
   - Some events like `focus` and `blur` don't bubble

3. **Not understanding `target` vs `currentTarget`**
   - `target` = original element that triggered event
   - `currentTarget` = element currently handling event

4. **Overusing `stopPropagation()`**
   - Can break event delegation patterns
   - Makes debugging harder

5. **Calling methods on non-cancelable events**
   - Always check `event.cancelable` first

---

## Additional Resources

- MDN: Event Reference
- MDN: Event.stopPropagation()
- MDN: Event.preventDefault()
- JavaScript.info: Event Delegation

---

*Last Updated: 2024*

