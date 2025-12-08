# Advanced JavaScript and Complexity MCQ Questions

This document contains 30 multiple-choice questions covering advanced JavaScript concepts and time/space complexity analysis.

---

## Question 1 (JavaScript)

What will be the output of the following code?

```javascript
const fetchUserData = async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const { data: { user: { name, age, ...rest } } } = await response.json();
  
  
  
  return { name, age, metadata: rest };
};

const processUsers = async (userIds) => {
  const results = await Promise.all(
    userIds.map(async (id) => {
      const user = await fetchUserData(id);
      
      return user;
    })
  );
  
  
  
  return results.reduce((acc, { name, ...userData }) => {
    acc[name] = userData;
    
    return acc;
  }, {});
};

const userIds = [1, 2, 3];

processUsers(userIds).then(result => {
  const { ...allUsers } = result;
  console.log(Object.keys(allUsers).length);
});
```

**Options:**
A. 3
B. 0
C. undefined
D. Error: Cannot destructure property 'user'

**Answer:** Error: Cannot destructure property 'user'
**Points:** 1

---

## Question 2 (JavaScript)

What will be the output of the following code?

```javascript
const createAsyncProcessor = (callback) => {
  

  return async (...args) => {
    const result = await callback(...args);
    
    return result;
  };
};

const multiply = async (a, b) => {
  

  return new Promise(resolve => setTimeout(() => resolve(a * b), 100));
};

const asyncMultiply = createAsyncProcessor(multiply);

const processArray = async (arr) => {
  const [first, ...rest] = arr;
  
  const results = await Promise.all(
    rest.map((val, idx) => asyncMultiply(first, val))
  );
  
  
  
  return results.reduce((acc, val) => acc + val, 0);
};

processArray([2, 3, 4, 5]).then(console.log);
```

**Options:**
A. 24
B. 27
C. 14
D. Promise pending

**Answer:** 27
**Points:** 1

---

## Question 3 (JavaScript)

What will be the output of the following code?

```javascript
const transformData = async (data) => {
  const { items, ...metadata } = data;
  
  const processItem = (item, index) => {
    

    return new Promise(resolve => {
      setTimeout(() => {
        const { id, name, ...rest } = item;
        resolve({ ...rest, processedId: id, processedName: name.toUpperCase() });
      }, index * 10);
    });
  };
  
  const processed = await Promise.all(
    items.map((item, idx) => processItem(item, idx))
  );
  
  
  
  return { ...metadata, results: processed };
};

const data = { items: [
    { id: 1, name: 'apple', price: 10 },
    { id: 2, name: 'banana', price: 20 }
  ],
  total: 2
};

transformData(data).then(result => {
  const { results, ...rest } = result;
  console.log(results.length, rest.total);
});
```

**Options:**
A. 2 2
B. 0 2
C. 2 undefined
D. Error

**Answer:** 2 2
**Points:** 1

---

## Question 4 (JavaScript)

What will be the output of the following code?

```javascript
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

const asyncCompose = (...fns) => async (value) => {
  return await fns.reduceRight(async (acc, fn) => await fn(await acc), value);
};

const add = (x) => x + 1;
const multiply = (x) => x * 2;

const asyncSquare = async (x) => {
  await new Promise(resolve => setTimeout(resolve, 10));
  return x * x;
};

const { result, ...rest } = { result: 5, extra: 'data' };

const composed = compose(add, multiply);
const asyncComposed = asyncCompose(asyncSquare, async (x) => x + 1);

Promise.all([
  Promise.resolve(composed(result)),
  asyncComposed(result)
]).then(([sync, async]) => {
  console.log(sync, async);
});
```

**Options:**
A. 12 36
B. 11 25
C. 12 25
D. 11 36

**Answer:** 12 36
**Points:** 1

---

## Question 5 (JavaScript)

What will be the output of the following code?

```javascript
const createCache = () => {
  const cache = new Map();
  
  return {
    get: async (key) => {
      await new Promise(resolve => setTimeout(resolve, 5));
      return cache.get(key);
    },
    set: (key, value) => cache.set(key, value),
    clear: () => cache.clear()
  };
};

const cache = createCache();

const fetchWithCache = async (key, fetcher) => {
  const cached = await cache.get(key);
  if (cached) return cached;
  
  const { data, ...meta } = await fetcher();
  cache.set(key, { ...meta, value: data });
  return { ...meta, value: data };
};

const mockFetcher = async () => ({ data: 'result', timestamp: Date.now() });

(async () => {
  const first = await fetchWithCache('test', mockFetcher);
  const { value, ...rest } = first;
  const second = await fetchWithCache('test', mockFetcher);
  console.log(first === second, Object.keys(rest).length);
})();
```

**Options:**
A. false 1
B. true 1
C. false 0
D. true 0

**Answer:** false 1
**Points:** 1

---

## Question 6 (JavaScript)

What will be the output of the following code?

```javascript
const debounce = (fn, delay) => {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

const asyncDebounce = (fn, delay) => {
  let timeoutId;
  
  return async function(...args) {
    clearTimeout(timeoutId);
    
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result);
      }, delay);
    });
  };
};

const processData = async (data) => {
  const { items, ...config } = data;
  const results = await Promise.all(
    items.map(async (item, idx) => {
      const { id, ...rest } = item;
      await new Promise(resolve => setTimeout(resolve, 50));
      
      return { ...rest, processedId: id * 2 };
    })
  );
  
  return { ...config, results };
};

const debouncedProcess = asyncDebounce(processData, 100);

const data = { items: [{ id: 1, name: 'a' }], type: 'test' };

setTimeout(() => debouncedProcess(data).then(({ results, ...rest }) => {
  console.log(results.length, rest.type);
}), 0);
setTimeout(() => debouncedProcess({ ...data, items: [...data.items, { id: 2, name: 'b' }] }), 50);
```

**Options:**
A. 2 test
B. 1 test
C. undefined test
D. Error

**Answer:** 2 test
**Points:** 1

---

## Question 7 (JavaScript)

What will be the output of the following code?

```javascript
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const asyncPipe = (...fns) => async (value) => {
  return await fns.reduce(async (acc, fn) => await fn(await acc), value);
};

const filterEven = (arr) => arr.filter(x => x % 2 === 0);

const mapSquare = (arr) => arr.map(x => x * x);

const asyncSum = async (arr) => {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return arr.reduce((a, b) => a + b, 0);
};

const processNumbers = pipe(filterEven, mapSquare);

const asyncProcessNumbers = asyncPipe(
  async (arr) => {
    const [first, ...rest] = arr;
    
    return [first * 2, ...rest];
  },
  asyncSum
);

(async () => {
  const numbers = [1, 2, 3, 4, 5];
  const syncResult = processNumbers(numbers);
  const asyncResult = await asyncProcessNumbers(numbers);
  console.log(syncResult.reduce((a, b) => a + b, 0), asyncResult);
})();
```

**Options:**
A. 20 16
B. 20 30
C. 20 15
D. Error

**Answer:** 20 16
**Points:** 1

---

## Question 8 (JavaScript)

What will be the output of the following code?

```javascript
const retry = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
};

const fetchData = async (shouldFail) => {
  await new Promise(resolve => setTimeout(resolve, 5));
  if (shouldFail) throw new Error('Failed');
  
  return { data: 'success', attempts: 1 };
};

const processWithRetry = async (config) => {
  const { maxRetries = 3, ...rest } = config;
  const result = await retry(
    () => fetchData(rest.shouldFail),
    maxRetries
  );
  
  return { ...rest, ...result };
};

processWithRetry({ maxRetries: 2, shouldFail: true, id: 1 })
  .catch(error => {
    const { message, ...rest } = error;
    console.log(message, Object.keys(rest).length);
  });
```

**Options:**
A. Failed 0
B. Failed 1
C. undefined 0
D. Error: Failed

**Answer:** Failed 0
**Points:** 1

---

## Question 9 (JavaScript)

What will be the output of the following code?

```javascript
const batchProcess = async (items, batchSize, processor) => {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((item, idx) => processor(item, i + idx))
    );
    results.push(...batchResults);
  }
  return results;
};

const processItem = async (item, index) => {
  const { value, ...meta } = item;
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return { ...meta, processedValue: value * index, index };
};

const items = [
  { value: 1, type: 'a' },
  { value: 2, type: 'b' },
  { value: 3, type: 'c' }

];

batchProcess(items, 2, processItem).then(results => {
  const total = results.reduce((acc, {
 processedValue, ...rest }) => {
    
    return acc + processedValue;
  }, 0);
  console.log(total);
});
```

**Options:**
A. 8
B. 6
C. 5
D. 0

**Answer:** 8
**Points:** 1

---

## Question 10 (JavaScript)

What will be the output of the following code?

```javascript
const memoize = (fn) => {
  const cache = new Map();
  
  return async function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const { result, ...rest } = cache.get(key);
      
      return { ...rest, ...result };
    }
    const result = await fn(...args);
    const { data, ...meta } = result;
    cache.set(key, { result: { data, ...meta }, timestamp: Date.now() });
    
    return { data, ...meta };
  };
};

const expensiveOperation = async (n) => {
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return { data: n * 2, computed: true };
};

const memoizedOp = memoize(expensiveOperation);

(async () => {
  const first = await memoizedOp(5);
  const { data, ...rest } = first;
  const second = await memoizedOp(5);
  console.log(first.data === second.data, Object.keys(rest).length);
})();
```

**Options:**
A. true 1
B. true 2
C. false 1
D. false 2

**Answer:** true 1
**Points:** 1

---

## Question 11 (JavaScript)

What will be the output of the following code?

```javascript
const createEventEmitter = () => {
  const events = {
};
  
  return {
    on: (event, callback) => {
      if (!events[event]) events[event] = [];
      events[event].push(callback);
    },
    emit: async (event, ...args) => {
      if (events[event]) {
        await Promise.all(events[event].map(cb => cb(...args)));
      }
    },
    off: (event, callback) => {
      if (events[event]) {
        events[event] = events[event].filter(cb => cb !== callback);
      }
    }
  };
};

const emitter = createEventEmitter();

const handler1 = async (data) => {
  const { value, ...rest } = data;
  await new Promise(resolve => setTimeout(resolve, 10));
  console.log('Handler1:', value);
};

const handler2 = async (data) => {
  const { value, multiplier = 1, ...rest } = data;
  await new Promise(resolve => setTimeout(resolve, 5));
  console.log('Handler2:', value * multiplier);
};

emitter.on('process', handler1);
emitter.on('process', handler2);

emitter.emit('process', { value: 10, multiplier: 2, extra: 'data' });
```

**Options:**
A. Handler1: 10\nHandler2: 20
B. Handler2: 20\nHandler1: 10
C. Handler1: 10\nHandler2: 10
D. Error

**Answer:** Handler2: 20\nHandler1: 10
**Points:** 1

---

## Question 12 (JavaScript)

What will be the output of the following code?

```javascript
const chainPromises = async (promises) => {
  const results = [];
  for (const promise of promises) {
    const result = await promise;
    const { data, ...meta } = result;
    results.push({ ...meta, value: data });
  }
  return results;
};

const createPromise = (value, delay) => {
  

  return new Promise(resolve => {
    setTimeout(() => resolve({ data: value, timestamp: Date.now() }), delay);
  });
};

const promises = [
  createPromise(1, 30),
  createPromise(2, 10),
  createPromise(3, 20)
];

chainPromises(promises).then(results => {
  const sum = results.reduce((acc, {
 value, ...rest }) => acc + value, 0);
  console.log(sum);
});
```

**Options:**
A. 6
B. 3
C. 1
D. Promise pending

**Answer:** 6
**Points:** 1

---

## Question 13 (JavaScript)

What will be the output of the following code?

```javascript
const createQueue = () => {
  const queue = [];
  let processing = false;
  
  const processNext = async () => {
    if (processing || queue.length === 0) return;
    processing = true;
    
    while (queue.length > 0) {
      const { task, resolve, reject } = queue.shift();
      try {
        const result = await task();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    
    processing = false;
  };
  
  
  
  return {
    add: (task) => {
      
      return new Promise((resolve, reject) => {
        queue.push({ task, resolve, reject });
        processNext();
      });
    }
  };
};

const queue = createQueue();

const task = async (n) => {
  await new Promise(resolve => setTimeout(resolve, 10));
  const { value, ...rest } = { value: n, extra: 'data' };
  
  return { ...rest, result: value * 2 };
};

Promise.all([
  queue.add(() => task(1)),
  queue.add(() => task(2)),
  queue.add(() => task(3))
]).then(results => {
  const sum = results.reduce((acc, {
 result, ...rest }) => acc + result, 0);
  console.log(sum);
});
```

**Options:**
A. 12
B. 6
C. 4
D. Error

**Answer:** 12
**Points:** 1

---

## Question 14 (JavaScript)

What will be the output of the following code?

```javascript
const throttle = (fn, limit) => {
  let lastRun = 0;
  
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      
      return fn.apply(this, args);
    }
  };
};

const asyncThrottle = (fn, limit) => {
  let lastRun = 0;
  
  return async function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      
      return await fn(...args);
    }
    return null;
  };
};

const processData = async (data) => {
  const { items, ...config } = data;
  const results = await Promise.all(
    items.map(async (item) => {
      const { id, ...rest } = item;
      await new Promise(resolve => setTimeout(resolve, 5));
      
      return { ...rest, processedId: id };
    })
  );
  
  return { ...config, count: results.length };
};

const throttledProcess = asyncThrottle(processData, 50);

const data = { items: [{ id: 1 }], type: 'test' };

setTimeout(() => throttledProcess(data).then(r => console.log(r?.count ?? 'null')), 0);
setTimeout(() => throttledProcess(data).then(r => console.log(r?.count ?? 'null')), 10);
setTimeout(() => throttledProcess(data).then(r => console.log(r?.count ?? 'null')), 60);
```

**Options:**
A. 1\nnull\n1
B. null\nnull\n1
C. 1\n1\n1
D. Error

**Answer:** 1\nnull\n1
**Points:** 1

---

## Question 15 (JavaScript)

What will be the output of the following code?

```javascript
const race = async (promises) => {
  

  return Promise.race(promises);
};

const createDelayedPromise = (value, delay) => {
  

  return new Promise(resolve => {
    setTimeout(() => {
      const { data, ...meta } = { data: value, timestamp: Date.now() };
      resolve({ ...meta, result: data });
    }, delay);
  });
};

const promises = [
  createDelayedPromise('first', 50),
  createDelayedPromise('second', 10),
  createDelayedPromise('third', 30)
];

race(promises).then(({
 result, ...rest }) => {
  console.log(result, Object.keys(rest).length);
});
```

**Options:**
A. second 1
B. first 1
C. third 1
D. Error

**Answer:** second 1
**Points:** 1

---

## Question 16 (JavaScript)

What will be the output of the following code?

```javascript
const allSettled = async (promises) => {
  

  return Promise.allSettled(promises);
};

const createPromise = (value, shouldReject) => {
  

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { data, ...meta } = { data: value, type: 'test' };
      if (shouldReject) {
        reject({ ...meta, error: data });
      } else {
        resolve({ ...meta, result: data });
      }
    }, 10);
  });
};

const promises = [
  createPromise('success', false),
  createPromise('error', true),
  createPromise('success2', false)
];

allSettled(promises).then(results => {
  const successful = results.filter(({
 status }) => status === 'fulfilled').length;
  const failed = results.filter(({
 status }) => status === 'rejected').length;
  console.log(successful, failed);
});
```

**Options:**
A. 2 1
B. 1 2
C. 3 0
D. 0 3

**Answer:** 2 1
**Points:** 1

---

## Question 17 (JavaScript)

What will be the output of the following code?

```javascript
const waterfall = async (tasks) => {
  let result;
  for (const task of tasks) {
    result = await task(result);
  }
  return result;
};

const task1 = async () => {
  await new Promise(resolve => setTimeout(resolve, 10));
  
  return { data: [1, 2, 3], step: 1 };
};

const task2 = async (prev) => {
  const { data, ...rest } = prev;
  await new Promise(resolve => setTimeout(resolve, 5));
  const doubled = data.map(x => x * 2);
  
  return { ...rest, data: doubled, step: 2 };
};

const task3 = async (prev) => {
  const { data, ...rest } = prev;
  await new Promise(resolve => setTimeout(resolve, 5));
  const sum = data.reduce((a, b) => a + b, 0);
  
  return { ...rest, result: sum, step: 3 };
};

waterfall([task1, task2, task3]).then(({ result, ...rest }) => {
  console.log(result, rest.step);
});
```

**Options:**
A. 12 3
B. 6 3
C. 12 2
D. Error

**Answer:** 12 3
**Points:** 1

---

## Question 18 (JavaScript)

What will be the output of the following code?

```javascript
const createPool = (size) => {
  const pool = [];
  const queue = [];
  
  for (let i = 0; i < size; i++) {
    pool.push({ id: i, busy: false });
  }
  
  const acquire = () => {
    

    return new Promise((resolve) => {
      const available = pool.find(p => !p.busy);
      if (available) {
        available.busy = true;
        resolve(available);
      } else {
        queue.push(resolve);
      }
    });
  };
  
  const release = (resource) => {
    resource.busy = false;
    if (queue.length > 0) {
      const next = queue.shift();
      resource.busy = true;
      next(resource);
    }
  };
  
  
  
  return { acquire, release };
};

const pool = createPool(2);

const useResource = async (resource, task) => {
  const { id, ...rest } = resource;
  await task(id);
  pool.release(resource);
};

const tasks = [1, 2, 3, 4].map(async (val) => {
  const resource = await pool.acquire();
  
  return useResource(resource, async (id) => {
    await new Promise(resolve => setTimeout(resolve, 10));
    
    return { ...resource, result: val * id };
  });
});

Promise.all(tasks).then(() => console.log('All tasks completed'));
```

**Options:**
A. All tasks completed
B. Error: Pool exhausted
C. Promise pending
D. undefined

**Answer:** All tasks completed
**Points:** 1

---

## Question 19 (JavaScript)

What will be the output of the following code?

```javascript
const createMiddleware = () => {
  const middlewares = [];
  
  const use = (middleware) => {
    middlewares.push(middleware);
  };
  
  const execute = async (context) => {
    let index = 0;
    
    const next = async () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        await middleware(context, next);
      }
    };
    
    await next();
    
    return context;
  };
  
  
  
  return { use, execute };
};

const app = createMiddleware();

app.use(async (ctx, next) => {
  const { data, ...rest } = ctx;
  ctx.processed = [...(data || []), 1];
  await next();
});

app.use(async (ctx, next) => {
  const { processed, ...rest } = ctx;
  ctx.processed = [...processed, 2];
  await next();
});

app.use(async (ctx, next) => {
  const { processed, ...rest } = ctx;
  ctx.result = processed.reduce((a, b) => a + b, 0);
});

app.execute({ data: [3] }).then(({ result, ...rest }) => {
  console.log(result);
});
```

**Options:**
A. 6
B. 3
C. 5
D. Error

**Answer:** 6
**Points:** 1

---

## Question 20 (JavaScript)

What will be the output of the following code?

```javascript
const createGenerator = function* (items) {
  for (const item of items) {
    const { value, ...rest } = item;
    yield { ...rest, processed: value * 2 };
  }
};

const processGenerator = async (gen) => {
  const results = [];
  for await (const value of gen) {
    await new Promise(resolve => setTimeout(resolve, 5));
    const { processed, ...rest } = value;
    results.push({ ...rest, result: processed });
  }
  return results;
};

const items = [
  { value: 1, id: 'a' },
  { value: 2, id: 'b' },
  { value: 3, id: 'c' }

];

const gen = createGenerator(items);
processGenerator(gen).then(results => {
  const sum = results.reduce((acc, {
 result, ...rest }) => acc + result, 0);
  console.log(sum);
});
```

**Options:**
A. 12
B. 6
C. 3
D. Error

**Answer:** 12
**Points:** 1

---

## Question 21 (Time & Space Complexity)

What is the time complexity of the following algorithm?

```javascript
function findPairs(arr, target) {
  const map = new Map();
  const pairs = [];
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      pairs.push([map.get(complement), i]);
    }
    map.set(arr[i], i);
  }
  
  
  return pairs;
}
```

The function finds all pairs of indices in an array that sum to a target value.

**Options:**
A. O(n²)
B. O(n log n)
C. O(n)
D. O(1)

**Answer:** O(n)
**Points:** 1

---

## Question 22 (Time & Space Complexity)

What is the space complexity of the following recursive function?

```javascript
function fibonacci(n, memo = {
}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  
  return memo[n];
}
```

The function calculates the nth Fibonacci number using memoization.

**Options:**
A. O(1)
B. O(n)
C. O(n²)
D. O(2^n)

**Answer:** O(n)
**Points:** 1

---

## Question 23 (Time & Space Complexity)

What is the time complexity of the following algorithm?

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

The function implements merge sort algorithm.

**Options:**
A. O(n)
B. O(n log n)
C. O(n²)
D. O(log n)

**Answer:** O(n log n)
**Points:** 1

---

## Question 24 (Time & Space Complexity)

What is the space complexity of the following algorithm?

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  return i + 1;
}
```

Assuming worst-case scenario (already sorted array).

**Options:**
A. O(1)
B. O(log n)
C. O(n)
D. O(n log n)

**Answer:** O(n)
**Points:** 1

---

## Question 25 (Time & Space Complexity)

What is the time complexity of the following algorithm?

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  
  return -1;
}
```

The function searches for a target value in a sorted array.

**Options:**
A. O(n)
B. O(log n)
C. O(n log n)
D. O(1)

**Answer:** O(log n)
**Points:** 1

---

## Question 26 (Time & Space Complexity)

What is the space complexity of the following algorithm?

```javascript
function depthFirstSearch(graph, start, visited = new Set()) {
  visited.add(start);
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      depthFirstSearch(graph, neighbor, visited);
    }
  }
  
  
  return visited;
}
```

The function performs DFS on a graph with V vertices and E edges.

**Options:**
A. O(V)
B. O(E)
C. O(V + E)
D. O(1)

**Answer:** O(V)
**Points:** 1

---

## Question 27 (Time & Space Complexity)

What is the time complexity of the following algorithm?

```javascript
function findLongestSubstring(str) {
  const charMap = new Map();
  let maxLength = 0;
  let start = 0;
  
  for (let end = 0; end < str.length; end++) {
    const char = str[end];
    
    if (charMap.has(char) && charMap.get(char) >= start) {
      start = charMap.get(char) + 1;
    }
    
    charMap.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  
  return maxLength;
}
```

The function finds the length of the longest substring without repeating characters.

**Options:**
A. O(n²)
B. O(n log n)
C. O(n)
D. O(1)

**Answer:** O(n)
**Points:** 1

---

## Question 28 (Time & Space Complexity)

What is the space complexity of the following algorithm?

```javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      

      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  
  return [];
}
```

The function finds two indices in an array that sum to a target value.

**Options:**
A. O(1)
B. O(log n)
C. O(n)
D. O(n²)

**Answer:** O(n)
**Points:** 1

---

## Question 29 (Time & Space Complexity)

What is the time complexity of the following algorithm?

```javascript
function powerSet(arr) {
  const result = [];
  
  function backtrack(current, index) {
    result.push([...current]);
    
    for (let i = index; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(current, i + 1);
      current.pop();
    }
  }
  
  backtrack([], 0);
  
  return result;
}
```

The function generates all possible subsets (power set) of an array.

**Options:**
A. O(n)
B. O(n log n)
C. O(2^n)
D. O(n²)

**Answer:** O(2^n)
**Points:** 1

---

## Question 30 (Time & Space Complexity)

What is the space complexity of the following algorithm?

```javascript
function longestCommonSubsequence(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  
  return dp[m][n];
}
```

The function finds the length of the longest common subsequence between two strings.

**Options:**
A. O(m + n)
B. O(m * n)
C. O(min(m, n))
D. O(1)

**Answer:** O(m * n)
**Points:** 1

---

