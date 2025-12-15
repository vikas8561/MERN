# Advanced Express.js and Project Structuring

## 1. Dynamic Routing in Express

### What is Dynamic Routing?

Dynamic routing allows you to handle specific requests by embedding variable data in the route path. For example, instead of creating individual routes for each movie ID, dynamic routing allows `/movies/:id` to handle all movie IDs.

### Why Use Dynamic Routing?

- Reduces redundancy by using a single route to handle multiple requests.
- Enables URL parameters to pass unique data, like item IDs, directly in the URL path.

### Route Parameters (/:id)

Route parameters are placeholders in the URL path, prefixed by `:`. For instance, `/movies/:id` can capture any value passed after `/movies/` as `req.params.id`.

```javascript
app.get('/movies/:id', (req, res) => {
  const movieId = req.params.id;
  // Use movieId to find the specific movie in the database
});
```

### Query Strings (?key=value)

Query strings allow more complex requests by attaching key-value pairs to a URL. In `/movies?title=Inception&year=2010`, `title` and `year` are query parameters accessible via `req.query`.

```javascript
app.get('/movies', (req, res) => {
  const { title, year } = req.query;
  // Filter movies based on title or year
});
```

## 2. Organizing Code with express.Router() and Folder Structure

### express.Router()

`express.Router()` helps modularize route handling, allowing you to define routes in separate files for better organization.

#### Example of using express.Router():

**Create a Router in a Separate File (routes/movies.js):**

```javascript
import express from 'express';
const router = express.Router();

// Define movie routes
router.get('/', getAllMovies);
router.get('/:id', getSingleMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
```

**Use Router in Main App File (index.js):**

```javascript
import express from 'express';
import movieRoutes from './routes/movies.js';

const app = express();
app.use('/movies', movieRoutes); // Mount router on /movies path
```

### Suggested Folder Structure

A well-organized folder structure makes maintenance and scalability easier. Here's a typical structure:

```
movie-api/
├── controllers/          # Logic for handling routes
│   └── movieController.js
├── routes/               # Route definitions
│   └── movies.js
├── models/               # Data models or schemas
├── middleware/           # Custom middleware
├── db.json               # Data file (temporary storage for movies)
├── index.js              # Main entry point
└── package.json
```

## 3. HTTP Status Codes and Best Practices

HTTP status codes provide information on the response outcome:

- **200 OK**: Successful GET request.
- **201 Created**: Successful POST request.
- **200 OK / 204 No Content**: Successful PUT/DELETE request.
- **400 Bad Request**: Invalid client request, often due to incorrect data.
- **404 Not Found**: Resource not found, like a movie ID that doesn't exist.
- **500 Internal Server Error**: Server-side error.

### Best Practices:

- Use appropriate status codes to communicate results effectively.
- Return helpful error messages to guide clients when requests fail.

#### Example:

```javascript
app.get('/movies/:id', (req, res) => {
  const movie = findMovieById(req.params.id);
  if (!movie) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  res.status(200).json(movie);
});
```

## 4. Movie Project Enhancement

### Step 1: Organize Project Files and Folders

Following our suggested folder structure, split your route logic and controllers. Here's how:

**Create Controller Functions in controllers/movieController.js:**

```javascript
import fs from 'fs';

export const getAllMovies = (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync('db.json'));
    const { title, year } = req.query;

    let filteredMovies = movies;
    if (title) filteredMovies = filteredMovies.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
    if (year) filteredMovies = filteredMovies.filter(m => m.year === parseInt(year));

    res.status(200).json(filteredMovies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSingleMovie = (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync('db.json'));
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createMovie = (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync('db.json'));
    const { title, year } = req.body;

    if (!title || !year) {
      return res.status(400).json({ error: 'Title and year are required' });
    }

    if (typeof title !== 'string' || typeof year !== 'number') {
      return res.status(400).json({ error: 'Valid title (string) and year (number) are required' });
    }

    const newMovie = { id: Date.now(), title, year };
    movies.push(newMovie);
    fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMovie = (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync('db.json'));
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));

    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const { title, year } = req.body;

    if (!title && !year) {
      return res.status(400).json({ error: 'At least one field (title or year) is required for update' });
    }

    // Update only provided fields
    if (title !== undefined) {
      if (typeof title !== 'string') {
        return res.status(400).json({ error: 'Title must be a string' });
      }
      movies[movieIndex].title = title;
    }

    if (year !== undefined) {
      if (typeof year !== 'number') {
        return res.status(400).json({ error: 'Year must be a number' });
      }
      movies[movieIndex].year = year;
    }

    fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));

    res.status(200).json(movies[movieIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMovie = (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync('db.json'));
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));

    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const deletedMovie = movies.splice(movieIndex, 1)[0];
    fs.writeFileSync('db.json', JSON.stringify(movies, null, 2));

    res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

**Define Routes in routes/movies.js:**

```javascript
import express from 'express';
import { 
  getAllMovies, 
  getSingleMovie, 
  createMovie, 
  updateMovie, 
  deleteMovie 
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getSingleMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
```

**Use Routes in Main App File index.js:**

```javascript
import express from 'express';
import movieRoutes from './routes/movies.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Step 2: Advanced Search and Filtering Using Query Parameters

Extend the `getAllMovies` function to filter movies by title or year using query parameters.

**Example:**

- URL: `/movies?title=Inception`
- URL: `/movies?year=2010`

This allows clients to search for movies by partial title or year.

### Step 3: Data Validation in POST and PUT Requests

To ensure the data provided in requests is valid, implement basic data validation.

**For POST (Create):**

```javascript
if (!title || !year || typeof title !== 'string' || typeof year !== 'number') {
  return res.status(400).json({ error: 'Valid title and year are required' });
}
```

**For PUT (Update):**

```javascript
if (!title && !year) {
  return res.status(400).json({ error: 'At least one field (title or year) is required for update' });
}
```

### Step 4: Improved Error Handling and Edge Case Management

#### Improved Error Handling:

- Handle errors gracefully using try/catch blocks, especially around file operations and JSON parsing.
- Return specific error messages and status codes for different scenarios.

#### Edge Cases:

- Check for existing movie IDs before updating or deleting movies.
- Ensure routes handle missing or incorrect IDs gracefully.
- Validate data types for all incoming requests.

**Example with Error Handling:**

```javascript
app.get('/movies/:id', (req, res) => {
  try {
    const movies = JSON.parse(fs.readFileSync('db.json'));
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Step 5: Best Practices for Production-Ready Code

- **Consistent Error Messages**: Ensure consistent and user-friendly error responses.
- **Validations**: Add more validations to ensure data integrity.
- **Descriptive Status Codes**: Always use appropriate HTTP status codes.
- **Environment Variables**: Store sensitive information like API keys or database paths in environment variables for security.

## 5. API Endpoints Summary

### GET Routes

- **GET /movies**: Retrieve all movies (supports query parameters: `?title=...&year=...`)
- **GET /movies/:id**: Retrieve a single movie by ID

### POST Route

- **POST /movies**: Create a new movie
  - Body: `{ "title": "Movie Title", "year": 2023 }`

### PUT Route

- **PUT /movies/:id**: Update an existing movie by ID
  - Body: `{ "title": "Updated Title", "year": 2024 }` (at least one field required)

### DELETE Route

- **DELETE /movies/:id**: Delete a movie by ID

## 6. Try it Out

- **Add More Filters**: Extend the search functionality to filter by additional fields.
- **Refactor Code**: Move repeated code, like reading and writing to `db.json`, into a utility function.
- **Improved Validation**: Use a validation library (like Joi or express-validator) to validate data on incoming requests.

## 7. Summary

- Dynamic Routing and query parameters enable flexible routes and advanced filtering.
- `express.Router()` modularizes routes for easier project management.
- Use HTTP status codes and error handling for reliable client-server communication.
- Project enhancements, including organized structure and data validation, create a more scalable and user-friendly API.
- RESTful API design with GET, POST, PUT, and DELETE operations provides complete CRUD functionality.

