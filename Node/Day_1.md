# Node.js - Package Managers, npm, and Express

---

## 1. Introduction to Package Managers and npm

### What is a Package Manager?

A **package manager** is a tool that automates the installation, updating, and management of software packages (modules) in a project. In Node.js, the primary package manager is **npm** (Node Package Manager).

### Why npm?

npm allows you to:

- Access thousands of open-source packages that add functionality to your project
- Manage project dependencies in one file (`package.json`)
- Easily install, uninstall, or update packages

### Key npm Commands

#### Initialize a Project

To create a new Node.js project, you need a `package.json` file, which holds metadata about the project and its dependencies.

```bash
npm init -y
```

The `-y` flag automatically accepts default settings.

#### Installing Packages

Use `npm install` or `npm i` to install packages. For example, to install Express:

```bash
npm install express
```

This creates:
- **`node_modules`** folder: Contains all the installed packages and their dependencies. It's not recommended to modify this folder manually.
- **`package-lock.json`** file: Used for dependency tracking and ensures consistent installs across different environments.

#### npx

`npx` allows you to run Node packages directly from the command line without installing them globally. For example:

```bash
npx create-react-app my-app
```

---

## 2. package.json and Dependencies

### package.json

The core file in a Node project that lists your project's dependencies, scripts, and metadata.

**Sample `package.json`:**

```json
{
  "name": "movie-api",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

### Dependencies

- **Dependencies**: Packages required for your project to run, listed under `"dependencies"` in `package.json`
- They are installed using `npm install <package-name>`

### Dev Dependencies

**Developer dependencies** are packages only needed during development (not in production).

```bash
npm install chalk --save-dev
```

This installs a package as a dev dependency, which will be listed under `"devDependencies"` in `package.json`.

---

## 3. CommonJS Modules

CommonJS is the traditional Node.js module system for code reusability. It uses `require()` to import modules and `module.exports` or `exports` to export functionality.

### Named Exports

Named exports allow multiple exports from a file.

**Example: `math.js`**

```javascript
function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

module.exports = { add, subtract };
// OR
// exports.add = add;
// exports.subtract = subtract;
```

### Default Export

You can export a single default value or function.

**Example: `greeting.js`**

```javascript
function greeting() {
  return "Hello!";
}

module.exports = greeting;
```

### Importing in CommonJS

```javascript
// Default import
const greeting = require('./greeting.js');

// Named imports
const { add, subtract } = require('./math.js');
```

---

## 4. Understanding Request (req) and Response (res) Objects

### What are req and res?

When a client makes a request to a server, Node.js provides two important objects:

- **`req` (Request)**: Represents the incoming HTTP request from the client
- **`res` (Response)**: Represents the outgoing HTTP response that will be sent back to the client

These objects are passed as parameters to the callback function in `http.createServer()` or Express route handlers.

### The Request Object (req)

The `req` object contains information about the incoming request from the client.

#### Key Properties of req

**1. `req.method`**
- The HTTP method used in the request (GET, POST, PUT, DELETE, etc.)
- Example: `req.method` → `"GET"` or `"POST"`

**2. `req.url`**
- The URL path of the request
- Example: `req.url` → `"/movies"` or `"/api/users"`

**3. `req.headers`**
- An object containing all HTTP headers sent by the client
- Example: `req.headers['content-type']` → `"application/json"`

**4. `req.body`** (in Express with middleware)
- Contains the parsed request body (after using `express.json()` middleware)
- Example: `req.body` → `{ title: "Inception", year: 2010 }`

**5. `req.params`** (in Express)
- Route parameters extracted from the URL
- Example: For route `/movies/:id`, `req.params.id` contains the ID value

**6. `req.query`** (in Express)
- Query string parameters from the URL
- Example: For URL `/movies?year=2010`, `req.query.year` → `"2010"`

#### Example: Accessing Request Properties

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Method:', req.method);      // GET, POST, etc.
  console.log('URL:', req.url);            // /movies, /users, etc.
  console.log('Headers:', req.headers);    // All request headers
  
  // Access specific header
  const contentType = req.headers['content-type'];
  console.log('Content-Type:', contentType);
});
```

### The Response Object (res)

The `res` object is used to send a response back to the client.

#### Key Methods of res

**1. `res.writeHead(statusCode, headers)`**
- Sets the HTTP status code and response headers
- Must be called before `res.end()`
- Example: `res.writeHead(200, { 'Content-Type': 'application/json' })`

**2. `res.status(statusCode)`** (Express only)
- Sets the HTTP status code
- Example: `res.status(404)`

**3. `res.setHeader(name, value)`**
- Sets a single response header
- Example: `res.setHeader('Content-Type', 'text/html')`

**4. `res.write(data)`**
- Writes data to the response body (can be called multiple times)
- Example: `res.write('Hello')`

**5. `res.end([data])`**
- Ends the response and optionally sends final data
- Must be called to complete the response
- Example: `res.end('Response complete')`

**6. `res.send(data)`** (Express only)
- Sends a response (automatically sets Content-Type based on data type)
- Example: `res.send('Hello World')` or `res.send({ message: 'Success' })`

**7. `res.json(data)`** (Express only)
- Sends a JSON response (sets Content-Type to application/json)
- Example: `res.json({ id: 1, title: 'Inception' })`

**8. `res.sendFile(path)`** (Express only)
- Sends a file as the response
- Example: `res.sendFile(__dirname + '/index.html')`

#### Common HTTP Status Codes

| Status Code | Meaning | Usage |
|-------------|---------|-------|
| `200` | OK | Successful GET, PUT, PATCH requests |
| `201` | Created | Successful POST request (resource created) |
| `204` | No Content | Successful DELETE request |
| `400` | Bad Request | Client error (invalid data) |
| `404` | Not Found | Resource not found |
| `500` | Internal Server Error | Server error |

#### Example: Using Response Methods

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Method 1: Using writeHead and end
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
  
  // Method 2: Using setHeader and end
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Success' }));
  
  // Method 3: Using write multiple times
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Welcome</h1>');
  res.write('<p>This is a response</p>');
  res.end();
});
```

### How req and res Work Together

Here's a simple example showing how `req` and `res` work together:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Read information from the request
  const method = req.method;
  const url = req.url;
  
  // Log the request details
  console.log(`Received ${method} request to ${url}`);
  
  // Send a response based on the request
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (method === 'GET' && url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Page</h1>');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Important Notes

1. **Always call `res.end()`**: You must call `res.end()` to complete the response. Without it, the client will keep waiting.

2. **Call `res.writeHead()` before `res.end()`**: If using `writeHead()`, call it before `res.end()`.

3. **One response per request**: Each request can only have one response. Once `res.end()` is called, the response is sent.

4. **Request is read-only**: You can read from `req` but typically don't modify it.

5. **Response is write-only**: You write to `res` to send data back to the client.

### Summary

- **`req`** = Incoming request from client (contains method, URL, headers, body, etc.)
- **`res`** = Outgoing response to client (used to send status, headers, and data)
- Together, they form the request-response cycle that powers web communication

---

## 5. Creating a Server Using HTTP Module (Old-School Way)

### What is the HTTP Module?

The **HTTP module** is a built-in Node.js module that provides functionality to create HTTP servers and make HTTP requests. Before frameworks like Express existed, developers used the HTTP module directly to create servers. **No installation needed** - it comes with Node.js!

### Basic HTTP Server Example

Here is the simplest example:

```javascript
// Import the built-in 'http' module from Node.js
// Node has this module built-in - no install needed
const http = require("http");

// Create an HTTP server using createServer()
// The callback function handles every request from the browser
// req = request → incoming data, URL, method
// res = response → what you send back
const server = http.createServer((req, res) => {
  // Set the HTTP status code to 200 (OK)
  res.statusCode = 200;
  
  // Set the Content-Type header to 'text/plain'
  // This tells the browser what type of content we're sending
  res.setHeader("Content-Type", "text/plain");
  
  // Send the response and end the connection
  // res.end() sends data and closes the response
  res.end("Hello from Node.js basic HTTP server!");
});

// Start the server listening on port 3000
// The callback function runs when the server starts successfully
server.listen(3000, () => {
  // Log a message to confirm the server is running
  console.log("Server running at http://localhost:3000");
});
```

### How It Works (Easy Explanation)

1. **Import http module**
   ```javascript
   const http = require("http");
   ```
   - Node has this module built-in. No install needed.

2. **Create a server**
   ```javascript
   http.createServer((req, res) => { ... });
   ```
   - This handles every request from the browser.
   - `req` = request → incoming data, URL, method
   - `res` = response → what you send back

3. **Set status + headers**
   ```javascript
   res.statusCode = 200;
   res.setHeader("Content-Type", "text/plain");
   ```
   - Set the HTTP status code (200 = OK)
   - Set response headers (Content-Type tells browser what type of data)

4. **Send response**
   ```javascript
   res.end("Hello World");
   ```
   - Sends the response body and ends the connection

5. **Listen on a port**
   ```javascript
   server.listen(3000)
   ```
   - Makes the server start listening for requests on port 3000

### Adding Route Handling (Without Express)

This is how routing was done before Express - you manually check the URL for each route:

```javascript
// Import the built-in 'http' module
const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if the request URL is the root path '/'
  if (req.url === "/") {
    // Set status code 200 (OK) and Content-Type header
    // writeHead() sets both status and headers in one call
    res.writeHead(200, { "Content-Type": "text/plain" });
    // Send response and end connection
    res.end("Home Page");
  } 
  // Check if the request URL is '/about'
  else if (req.url === "/about") {
    // Set status code 200 (OK) and Content-Type header
    res.writeHead(200, { "Content-Type": "text/plain" });
    // Send response and end connection
    res.end("About Page");
  }
  // Handle all other URLs (404 Not Found)
  else {
    // Set status code 404 (Not Found) and Content-Type header
    res.writeHead(404, { "Content-Type": "text/plain" });
    // Send error message and end connection
    res.end("404 Not Found");
  }
});

// Start the server listening on port 3000
server.listen(3000, () => {
  // Log confirmation message when server starts
  console.log("Server running at http://localhost:3000");
});
```

### Sending JSON Response (Old Way)

To send JSON data, you need to set the Content-Type header and stringify your data:

```javascript
// Import the built-in 'http' module
const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if the request URL is '/api'
  if (req.url === "/api") {
    // Create a JavaScript object with data
    const data = { name: "Vikas", company: "Tekarosoft" };

    // Set status code 200 (OK) and Content-Type to 'application/json'
    // This tells the browser we're sending JSON data
    res.writeHead(200, { "Content-Type": "application/json" });
    
    // Convert JavaScript object to JSON string and send it
    // JSON.stringify() converts object to JSON format
    res.end(JSON.stringify(data));
  }
});

// Start the server listening on port 3000
server.listen(3000);
```

### Handling POST Request (Without Express)

Handling POST requests requires collecting data chunks manually:

```javascript
// Import the built-in 'http' module
const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if it's a POST request to '/data'
  if (req.method === "POST" && req.url === "/data") {
    // Initialize an empty string to collect request body data
    let body = "";

    // Listen for 'data' event - fires when data chunks arrive
    // POST data comes in chunks (pieces), not all at once
    req.on("data", chunk => {
      // Convert chunk (Buffer) to string and append to body
      // This collects all the chunks into one string
      body += chunk.toString();
    });

    // Listen for 'end' event - fires when all data has been received
    req.on("end", () => {
      // Log the complete received data to console
      console.log("Received:", body);

      // Set status code 200 (OK) and Content-Type to JSON
      res.writeHead(200, { "Content-Type": "application/json" });
      
      // Send a JSON response confirming data was received
      // JSON.stringify() converts object to JSON string
      res.end(JSON.stringify({ message: "Data received", body }));
    });
  }
});

// Start the server listening on port 3000
server.listen(3000);
```

### Serving HTML File (Classic Way)

To serve an HTML file, you need to read it from the file system:

```javascript
// Import the built-in 'http' module
const http = require("http");
// Import the built-in 'fs' (file system) module
// Used to read files from disk
const fs = require("fs");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Check if the request URL is the root path '/'
  if (req.url === "/") {
    // Read the 'index.html' file from disk
    // This is asynchronous - uses a callback function
    fs.readFile("index.html", (err, data) => {
      // Check if there was an error reading the file
      if (err) {
        // Set status code 500 (Internal Server Error)
        res.writeHead(500);
        // Send error message and end connection
        res.end("Server Error");
      } 
      // If file was read successfully
      else {
        // Set status code 200 (OK) and Content-Type to HTML
        res.writeHead(200, { "Content-Type": "text/html" });
        // Send the file data and end connection
        // 'data' contains the file contents
        res.end(data);
      }
    });
  }
});

// Start the server listening on port 3000
server.listen(3000);
```

### Limitations of Using HTTP Module Directly

1. **Manual Route Handling**: You must manually check URLs and methods
2. **No Built-in Middleware**: No easy way to parse JSON, handle cookies, etc.
3. **More Verbose Code**: Requires more code for common tasks
4. **No Built-in Router**: Must implement routing logic yourself
5. **Complex Request Parsing**: Need to manually parse request bodies

### Why Use Express Instead?

Express simplifies server creation by:
- Providing a clean routing system
- Automatically parsing JSON bodies
- Offering middleware support
- Reducing boilerplate code
- Making it easier to handle different HTTP methods

---

## 6. Creating a Server Using Express

### What is Express?

Express is a minimal Node.js framework that simplifies building web servers. It's built on top of the HTTP module of Node.js, which reduces the complexity of using HTTP directly.

### Setting Up an Express Server

#### Step 1: Install Express

```bash
npm install express
```

#### Step 2: Create `index.js`

```javascript
// Import the Express framework
// Express is a third-party package that simplifies server creation
const express = require('express');

// Create an Express application instance
// This 'app' object is used to configure routes and middleware
const app = express();

// Define the port number where the server will listen
const PORT = 3000;

// Start the server and make it listen on the specified port
// The callback function runs when the server starts successfully
app.listen(PORT, () => {
  // Log a message to confirm the server is running
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### The Importance of Listening

The `app.listen()` function makes your server start listening for requests on a specified port, allowing your application to receive and process client requests.

---

## 7. Request-Response Cycle and HTTP Methods

### Request-Response Cycle

When a client (frontend) makes a request to the server, the backend (Express server) processes it and sends back a response.

```
Client → Request → Server → Response → Client
```

### HTTP Methods

HTTP methods specify the type of operation on the server:

| Method | Description | Example |
|--------|-------------|---------|
| **GET** | Retrieve data | Get all movies |
| **POST** | Create new data | Add a new movie |
| **PUT** | Update existing data entirely | Update a movie's information |
| **PATCH** | Update part of existing data | Update only the title of a movie |
| **DELETE** | Remove data | Delete a movie |

### Client-Server Architecture

- **Server**: A computer programmed to serve requests
- **Client**: Makes requests to the server
- The server needs to serve based on the request:
  - If the client requests `/lectures` → server should send lectures
  - If the client requests `/assignment` → server should send assignment

---

## 8. Basic Routing in Express

### What is Routing?

Routing in Express allows you to handle different endpoints and HTTP methods.

### Creating a Route

**Basic GET Route:**

```javascript
// Define a GET route for the root path '/'
// app.get() handles GET requests to the specified path
// req = request object (contains data from client)
// res = response object (used to send data back to client)
app.get('/', (req, res) => {
  // Send a response back to the client
  // res.send() automatically sets Content-Type and status code
  res.send('Welcome to the Movie API!');
});
```

### Key Concepts

- **Endpoint**: URL path for the route (e.g., `/movies`)
- **Methods**: GET, POST, PUT, PATCH, DELETE - define the action on the endpoint
- **`req` (Request)**: Contains data sent by the client
- **`res` (Response)**: Allows sending data back to the client

### Route Structure

```javascript
// Route structure: method + route path + handler function
// METHOD can be: get, post, put, patch, delete, etc.
// '/route' is the URL path
// (req, res) => {} is the handler function that processes the request
app.METHOD('/route', (req, res) => {
  // Handle request and send response
  // Access request data via req object
  // Send response via res object
});
```

**Example of a POST route:**

```javascript
// Define a POST route for '/movies'
// POST is used to create new resources
app.post('/movies', (req, res) => {
  // Send a success message back to the client
  // res.send() automatically sets appropriate headers
  res.send('Movie created successfully!');
});
```

---

## 9. API Testing Tools

### Postman and Insomnia

Postman and Insomnia are tools for testing APIs. They allow you to:

- Send requests to endpoints (GET, POST, PUT, DELETE, etc.)
- Test API responses without needing a frontend
- Simulate different scenarios and check error handling

**Download and use these tools to send test requests to your Express server.**

---

## 10. Project: Mini Movie API

Let's create a mini Movie API with basic CRUD operations. This API will allow users to create, read, update, and delete movie data, using `fs` and a `db.json` file as the database.

### Step 1: Setup

#### Initialize the project:

```bash
npm init -y
```

#### Install Express:

```bash
npm install express
```

#### Create `package.json` (CommonJS is default, no need for "type" field):

```json
{
  "name": "movie-api",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

#### Database File: Create `db.json` with initial data:

```json
[
  { "id": 1, "title": "Inception", "year": 2010 },
  { "id": 2, "title": "Interstellar", "year": 2014 }
]
```

### Step 2: Set Up Express Server

Create `index.js`:

```javascript
// Import Express framework
const express = require('express');
// Import the built-in 'fs' (file system) module
// Used to read from and write to files
const fs = require('fs');

// Create an Express application instance
const app = express();
// Define the port number
const PORT = 3000;

// Middleware to parse JSON bodies
// This middleware automatically parses JSON data from request bodies
// Without this, req.body would be undefined
app.use(express.json());

// Start the server listening on the specified port
app.listen(PORT, () => {
  // Log confirmation message when server starts
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Step 3: Create CRUD Routes

#### Read Movies (GET)

```javascript
// Define a GET route to retrieve all movies
// GET requests are used to retrieve/read data
app.get('/movies', (req, res) => {
  // Read the db.json file synchronously
  // 'utf-8' encoding ensures the file is read as a string
  // JSON.parse() converts the JSON string to a JavaScript array/object
  const movies = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  
  // Send the movies array as JSON response
  // res.json() automatically sets Content-Type to application/json
  res.json(movies);
});
```

#### Create a Movie (POST)

```javascript
// Define a POST route to create a new movie
// POST requests are used to create new resources
app.post('/movies', (req, res) => {
  // Read all existing movies from db.json file
  // Parse the JSON string into a JavaScript array
  const movies = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  
  // Create a new movie object
  // Date.now() generates a unique ID (timestamp in milliseconds)
  // ...req.body spreads all properties from the request body into the new object
  const newMovie = { id: Date.now(), ...req.body };
  
  // Add the new movie to the movies array
  movies.push(newMovie);
  
  // Write the updated movies array back to db.json
  // JSON.stringify() converts the array to a JSON string
  // null, 2 formats the JSON with indentation (2 spaces) for readability
  fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));
  
  // Set HTTP status code to 201 (Created) and send the new movie as JSON
  res.status(201).json(newMovie);
});
```

#### Update a Movie (PUT)

```javascript
// Define a PUT route to update a movie by ID
// :id is a route parameter - it captures the ID from the URL
// PUT requests are used to update/replace entire resources
app.put('/movies/:id', (req, res) => {
  // Read all existing movies from db.json
  const movies = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  
  // Find the index of the movie with the matching ID
  // req.params.id gets the :id value from the URL
  // parseInt() converts the string ID to a number
  // findIndex() returns the index if found, or -1 if not found
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  
  // Check if the movie was found (index is not -1)
  if (movieIndex !== -1) {
    // Update the movie at the found index
    // Spread existing movie properties, then override with new properties from req.body
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    
    // Write the updated movies array back to db.json
    fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));
    
    // Send the updated movie as JSON response (status 200 by default)
    res.json(movies[movieIndex]);
  } 
  // If movie not found
  else {
    // Set status code to 404 (Not Found) and send error message
    res.status(404).send('Movie not found');
  }
});
```

#### Delete a Movie (DELETE)

```javascript
// Define a DELETE route to delete a movie by ID
// DELETE requests are used to remove resources
app.delete('/movies/:id', (req, res) => {
  // Read all existing movies from db.json
  let movies = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  
  // Filter out the movie with the matching ID
  // filter() creates a new array with only movies that don't match the ID
  // parseInt(req.params.id) converts the URL parameter to a number
  movies = movies.filter(m => m.id !== parseInt(req.params.id));
  
  // Write the updated movies array (without the deleted movie) back to db.json
  fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));
  
  // Set status code to 204 (No Content) - successful deletion with no response body
  res.status(204).send();
});
```

### Step 4: Enhancements

#### Add Validation

Ensure movies have both `title` and `year` properties:

```javascript
// POST route with validation
app.post('/movies', (req, res) => {
  // Destructure title and year from the request body
  // This extracts these properties from req.body
  const { title, year } = req.body;
  
  // Validate that both title and year are provided
  // If either is missing or falsy, return an error response
  if (!title || !year) {
    // Set status 400 (Bad Request) and send error message as JSON
    // 'return' stops further execution of the function
    return res.status(400).json({ error: 'Title and year are required' });
  }
  
  // If validation passes, read existing movies
  const movies = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
  
  // Create new movie with ID, title, and year
  const newMovie = { id: Date.now(), title, year };
  
  // Add new movie to the array
  movies.push(newMovie);
  
  // Save updated array to file
  fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));
  
  // Send success response with the created movie
  res.status(201).json(newMovie);
});
```

#### Error Handling

Implement error handling for missing or incorrect fields, file read errors, etc.

### Step 5: Testing

Test with Postman/Insomnia:
- **GET** `/movies` - Retrieve all movies
- **POST** `/movies` - Create a new movie
- **PUT** `/movies/:id` - Update a movie
- **DELETE** `/movies/:id` - Delete a movie

---

## 11. Recap and Additional Concepts

### Interfaces

1. **GUI** - Graphical User Interface
2. **CLI** - Command Line Interface

### Web Application Architecture

A web application consists of:

1. **Frontend** - The user interface (what users see and interact with)
2. **Backend**
   - **Server** - It's just another computer which is programmed to serve
   - **Database** - Stores and manages data

### Programming Language

- **JavaScript/Node.js** - Used for both frontend and backend development

### Runtime Environments

- **Node** - It's a runtime environment to run JavaScript
- **Bun** - It's also a runtime environment to run JavaScript

### Node.js Module Systems

Node.js supports two module systems:

1. **CJS (CommonJS)** - Traditional Node.js module system using `require()` and `module.exports` (used in these notes)
2. **ESM (ES Modules)** - Modern JavaScript module system using `import` and `export` (requires `"type": "module"` in package.json)

### Types of Modules

1. **Custom modules** - Written by us
2. **Node inbuilt modules** - Built-in modules like `os`, `fs`, `http`, etc.
3. **Third-party modules** - NPM packages

### File System (fs) Module

The `fs` module provides file system operations:

#### Synchronous Methods

1. `readFileSync` - Read file synchronously
2. `writeFileSync` - Write file synchronously
3. `appendFileSync` - Append to file synchronously

#### Asynchronous Methods

1. `readFile` - Read file asynchronously
2. `writeFile` - Write file asynchronously
3. `appendFile` - Append to file asynchronously

### Difference Between Sync and Async

- **Sync** - Happens synchronously (blocks execution until complete)
- **Without Sync** - Happens asynchronously (non-blocking, uses callbacks/promises)

### package.json

- `package.json` file → Node project
- It contains information about the project (like a resume for a job seeker)
- `npm init -y` → to initialize the project/create `package.json`

### Writing Scripts in package.json

You can define custom scripts in `package.json`:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "node index.js"
  }
}
```

Run scripts using:
```bash
npm start
npm run dev
```

---

## 12. Summary

- **npm** is a package manager essential for managing project dependencies in Node.js
- **CommonJS** uses `require()` and `module.exports` for modular code organization
- **Express** simplifies creating servers and managing routes and HTTP methods
- **API testing tools** like Postman help verify server responses
- Building a Movie API with Express and `fs` provides hands-on experience with CRUD operations and file-based storage
- Node.js supports both **CJS** and **ESM** module systems
- The `fs` module provides both synchronous and asynchronous file operations
- Understanding the **client-server architecture** is fundamental to web development

---

## 13. Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Postman Beginner's Guide](https://learning.postman.com/docs/getting-started/introduction/)
- [Node.js Modules Documentation](https://nodejs.org/api/modules.html)

---

## Quick Reference

### Common npm Commands

```bash
npm init -y              # Initialize project
npm install <package>    # Install package
npm install              # Install all dependencies
npm uninstall <package>  # Uninstall package
npm list                 # List installed packages
```

### Common Express Patterns

```javascript
// Basic server setup
// Import Express framework
const express = require('express');
// Create Express application instance
const app = express();
// Add middleware to parse JSON request bodies
app.use(express.json());
// Start server listening on specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Route pattern
// METHOD can be: get, post, put, patch, delete
// '/route' is the URL path
// Handler function receives req (request) and res (response)
app.METHOD('/route', (req, res) => {
  // Handle request - access data via req object
  // Send response via res object
  res.send('Response');
});
```

### HTTP Status Codes

- `200` - OK (successful GET, PUT, PATCH)
- `201` - Created (successful POST)
- `204` - No Content (successful DELETE)
- `400` - Bad Request (client error)
- `404` - Not Found
- `500` - Internal Server Error

---

*Last Updated: [Current Date]*

