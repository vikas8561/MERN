# SQL
---

## Database Basics

### USE Statement
```sql
USE imdb;
```
**Explanation**: The `USE` statement selects a database to work with. All subsequent queries will operate on the specified database (`imdb` in this case).

### SHOW TABLES
```sql
SHOW TABLES;
```
**Explanation**: Displays all tables in the currently selected database. This is useful for exploring the database structure.

### DESCRIBE Statement
```sql
DESCRIBE movies;
```
**Explanation**: Shows the structure of a table including column names, data types, and constraints. It's equivalent to `DESC movies` or `SHOW COLUMNS FROM movies`.

---

## Basic Queries

### SELECT Statement
```sql
SELECT * FROM movies;
```
**Explanation**: 
- `SELECT *` retrieves all columns from the specified table
- `FROM movies` specifies the table to query
- `*` is a wildcard that means "all columns"
- **Result-set**: The output is a set of rows that form the result of the query along with column names and meta-data

### Selecting Specific Columns
```sql
SELECT name, year FROM movies;
```
**Explanation**: Retrieves only the `name` and `year` columns from the `movies` table. This is more efficient than `SELECT *` when you only need specific data.

```sql
SELECT rankscore, name FROM movies;
```
**Explanation**: You can specify columns in any order. The output will display `rankscore` first, then `name`. Note: The row order in the output may be the same as in the table, but this is not guaranteed due to query optimizer and internal data structures/indices.

---

## LIMIT and OFFSET

### LIMIT Clause
```sql
SELECT name, rankscore FROM movies LIMIT 20;
```
**Explanation**: 
- `LIMIT 20` restricts the result to the first 20 rows
- Useful for testing queries on large tables or implementing pagination
- Reduces data transfer and improves performance

### LIMIT with OFFSET
```sql
SELECT name, rankscore FROM movies LIMIT 20 OFFSET 40;
```
**Explanation**: 
- `OFFSET 40` skips the first 40 rows
- `LIMIT 20` returns the next 20 rows after the offset
- Together, this implements pagination (e.g., page 3 if each page has 20 items)
- **Formula**: `OFFSET = (page_number - 1) × page_size`

---

## ORDER BY

### Sorting in Descending Order
```sql
SELECT name, rankscore, year FROM movies ORDER BY year DESC LIMIT 10;
```
**Explanation**: 
- `ORDER BY year DESC` sorts rows by the `year` column in descending order (newest first)
- `DESC` means descending (high to low)
- Used here to list recent movies first
- The output row order may not be the same as in the table due to query optimizer and internal data structures/indices

### Sorting in Ascending Order (Default)
```sql
SELECT name, rankscore, year FROM movies ORDER BY year LIMIT 10;
```
**Explanation**: 
- `ORDER BY year` sorts in ascending order (oldest first) by default
- `ASC` is optional and means ascending (low to high)
- When no direction is specified, `ASC` is assumed

---

## DISTINCT

### Single Column DISTINCT
```sql
SELECT DISTINCT genre FROM movies_genres;
```
**Explanation**: 
- `DISTINCT` eliminates duplicate rows from the result set
- Here, it lists all unique genres, removing duplicates
- Useful when you want to see all unique values in a column

### Multiple Column DISTINCT
```sql
SELECT DISTINCT first_name, last_name FROM directors;
```
**Explanation**: 
- When using multiple columns, `DISTINCT` considers the combination of values
- Returns unique combinations of `first_name` and `last_name`
- Two rows are considered duplicates only if both columns match

---

## WHERE Clause

### Basic WHERE with Comparison
```sql
SELECT name, year, rankscore FROM movies WHERE rankscore > 9;
```
**Explanation**: 
- `WHERE rankscore > 9` filters rows where the condition is true
- Only movies with `rankscore` greater than 9 are returned
- **Condition outputs**: TRUE, FALSE, or NULL

### WHERE with ORDER BY
```sql
SELECT name, year, rankscore FROM movies WHERE rankscore > 9 ORDER BY rankscore DESC LIMIT 20;
```
**Explanation**: Combines filtering (`WHERE`), sorting (`ORDER BY`), and limiting (`LIMIT`) to get the top 20 highest-rated movies above rank 9.

### Comparison Operators
```sql
SELECT * FROM movies_genres WHERE genre = 'Comedy';
```
**Explanation**: 
- `=` checks for equality
- Returns all rows where `genre` exactly matches 'Comedy'

```sql
SELECT * FROM movies_genres WHERE genre <> 'Horror';
```
**Explanation**: 
- `<>` (or `!=`) checks for inequality
- Returns all rows where `genre` is NOT 'Horror'
- Both `<>` and `!=` are equivalent

**Available Comparison Operators**:
- `=` : Equal to
- `<>` or `!=` : Not equal to
- `<` : Less than
- `<=` : Less than or equal to
- `>` : Greater than
- `>=` : Greater than or equal to

### NULL Handling

**Important**: NULL represents a missing, unknown, or non-existent value.

```sql
SELECT name, year, rankscore FROM movies WHERE rankscore = NULL;
```
**Explanation**: 
- **This will NOT work as expected!** It returns an empty result set
- You cannot use `=` or `<>` with NULL
- NULL is not equal to anything, including itself

```sql
SELECT name, year, rankscore FROM movies WHERE rankscore IS NULL LIMIT 20;
```
**Explanation**: 
- `IS NULL` is the correct way to check for NULL values
- Returns rows where `rankscore` is missing/unknown

```sql
SELECT name, year, rankscore FROM movies WHERE rankscore IS NOT NULL LIMIT 20;
```
**Explanation**: 
- `IS NOT NULL` returns rows where `rankscore` has a value
- Filters out any rows with NULL values

---

## Logical Operators

### AND Operator
```sql
SELECT name, year, rankscore FROM movies WHERE rankscore > 9 AND year > 2000;
```
**Explanation**: 
- `AND` requires both conditions to be TRUE
- Returns movies that are both highly rated (rank > 9) AND released after 2000
- Commonly used for website search filters with multiple criteria

### OR Operator
```sql
SELECT name, year, rankscore FROM movies WHERE rankscore > 9 OR year > 2007;
```
**Explanation**: 
- `OR` returns rows where at least one condition is TRUE
- Returns movies that are either highly rated OR released after 2007
- If either condition is true, the row is included

### NOT Operator
```sql
SELECT name, year, rankscore FROM movies WHERE NOT year <= 2000 LIMIT 20;
```
**Explanation**: 
- `NOT` negates a condition
- `NOT year <= 2000` is equivalent to `year > 2000`
- Returns movies released after the year 2000

### BETWEEN Operator
```sql
SELECT name, year, rankscore FROM movies WHERE year BETWEEN 1999 AND 2000;
```
**Explanation**: 
- `BETWEEN` is inclusive on both ends
- Equivalent to: `year >= 1999 AND year <= 2000`
- Returns movies from 1999 and 2000

```sql
SELECT name, year, rankscore FROM movies WHERE year BETWEEN 2000 AND 1999;
```
**Explanation**: 
- **Important**: The low value must be less than or equal to the high value
- If `low_value > high_value`, you get an empty result set
- Always ensure: `BETWEEN low_value AND high_value` where `low_value <= high_value`

### IN Operator
```sql
SELECT director_id, genre FROM directors_genres WHERE genre IN ('Comedy', 'Horror');
```
**Explanation**: 
- `IN` checks if a value matches any value in a list
- Equivalent to: `genre = 'Comedy' OR genre = 'Horror'`
- More concise than multiple `OR` conditions
- Useful for filtering by multiple specific values

### LIKE Operator with Wildcards

#### Percent (%) Wildcard
```sql
SELECT name, year, rankscore FROM movies WHERE name LIKE 'Tis%';
```
**Explanation**: 
- `%` matches zero or more characters
- `'Tis%'` matches any name starting with "Tis" followed by any characters
- Examples: "Tis", "Tisane", "Tisane's Tale", etc.

```sql
SELECT first_name, last_name FROM actors WHERE first_name LIKE '%es';
```
**Explanation**: 
- `'%es'` matches names ending with "es"
- The `%` at the beginning matches any characters before "es"
- Examples: "James", "Charles", "Frances", etc.

```sql
SELECT first_name, last_name FROM actors WHERE first_name LIKE '%es%';
```
**Explanation**: 
- `'%es%'` matches names containing "es" anywhere
- `%` can match characters before and after "es"
- Examples: "James", "Esther", "Leslie", "Tess", etc.

#### Underscore (_) Wildcard
```sql
SELECT first_name, last_name FROM actors WHERE first_name LIKE 'Agn_s';
```
**Explanation**: 
- `_` matches exactly one character
- `'Agn_s'` matches "Agnus", "Agnes" (5 characters with 's' as the 5th)
- Each `_` represents exactly one character position

#### Escaping Special Characters
```sql
SELECT first_name, last_name FROM actors WHERE first_name LIKE 'L%' AND first_name NOT LIKE 'Li%';
```
**Explanation**: 
- To match literal `%` or `_`, use backslash as escape: `\%` and `\_`
- This query finds first names starting with 'L' but not starting with 'Li'
- Example: "Liam" is excluded, but "Luke" is included

**Available Logical Operators**:
- `AND` : Both conditions must be true
- `OR` : At least one condition must be true
- `NOT` : Negates a condition
- `BETWEEN` : Range check (inclusive)
- `IN` : Membership in a list
- `LIKE` : Pattern matching
- `ALL`, `ANY`, `SOME` : Used with sub-queries
- `EXISTS` : Used with sub-queries

---

## Aggregate Functions

### Overview
Aggregate functions compute a single value from a set of rows and return the aggregate result.

**Common Aggregate Functions**:
- `COUNT()` : Counts the number of rows
- `MIN()` : Returns the minimum value
- `MAX()` : Returns the maximum value
- `SUM()` : Returns the sum of values
- `AVG()` : Returns the average of values

### MIN and MAX
```sql
SELECT MIN(year) FROM movies;
```
**Explanation**: Returns the earliest year (minimum value) in the `year` column.

```sql
SELECT MAX(year) FROM movies;
```
**Explanation**: Returns the latest year (maximum value) in the `year` column.

### COUNT
```sql
SELECT COUNT(*) FROM movies;
```
**Explanation**: 
- `COUNT(*)` counts all rows in the table, including those with NULL values
- Returns the total number of rows

```sql
SELECT COUNT(*) FROM movies WHERE year > 2000;
```
**Explanation**: Counts only rows that satisfy the WHERE condition (movies after 2000).

```sql
SELECT COUNT(year) FROM movies;
```
**Explanation**: 
- `COUNT(year)` counts only non-NULL values in the `year` column
- If `year` has NULL values, this will be less than `COUNT(*)`
- `COUNT(column)` ignores NULL values

---

## GROUP BY

### Basic GROUP BY
```sql
SELECT year, COUNT(year) FROM movies GROUP BY year;
```
**Explanation**: 
- `GROUP BY year` groups rows that have the same `year` value
- `COUNT(year)` counts how many movies are in each year group
- This finds the number of movies released per year

### GROUP BY with ORDER BY
```sql
SELECT year, COUNT(year) FROM movies GROUP BY year ORDER BY year;
```
**Explanation**: Groups by year and sorts the results by year for easier reading.

### GROUP BY with Aliases
```sql
SELECT year, COUNT(year) year_count FROM movies GROUP BY year ORDER BY year_count;
```
**Explanation**: 
- `year_count` is an alias (alternative name) for `COUNT(year)`
- Makes the output more readable
- Can be used in `ORDER BY` clause
- Results are sorted by the count (fewest movies first)

**Key Points**:
- `GROUP BY` is often used with aggregate functions like `COUNT`, `MIN`, `MAX`, `SUM`, `AVG`
- If grouping columns contain NULL values, all NULL values are grouped together
- Each unique combination of values in the GROUP BY columns creates a separate group

---

## HAVING Clause

### Basic HAVING
```sql
SELECT year, COUNT(year) year_count FROM movies GROUP BY year HAVING year_count > 1000;
```
**Explanation**: 
- `HAVING` filters groups after aggregation
- Only years with more than 1000 movies are included
- **Order of execution**:
  1. `GROUP BY` creates groups
  2. Aggregate function (`COUNT`) is applied to each group
  3. `HAVING` filters the groups based on the aggregate result

### HAVING without GROUP BY
```sql
SELECT name, year FROM movies HAVING year > 2000;
```
**Explanation**: 
- `HAVING` without `GROUP BY` works like `WHERE`
- However, `WHERE` is more efficient for row-level filtering
- Always prefer `WHERE` for filtering individual rows

### HAVING vs WHERE
```sql
SELECT year, COUNT(year) year_count FROM movies WHERE rankscore > 9 GROUP BY year HAVING year_count > 20;
```
**Explanation**: 
- **WHERE**: Applied to individual rows BEFORE grouping
  - Filters movies with `rankscore > 9` first
- **GROUP BY**: Groups the filtered rows by year
- **HAVING**: Applied to groups AFTER aggregation
  - Filters groups where the count is greater than 20

**Key Differences**:
- **WHERE** is applied on individual rows; **HAVING** is applied on groups
- **WHERE** is used before grouping; **HAVING** is used after grouping
- **WHERE** cannot use aggregate functions; **HAVING** can use aggregate functions

---

## JOINs

### Overview
JOINs combine data from multiple tables based on related columns.

### INNER JOIN
```sql
SELECT m.name, g.genre FROM movies m JOIN movies_genres g ON m.id = g.movie_id LIMIT 20;
```
**Explanation**: 
- `JOIN` (or `INNER JOIN`) returns only rows where there's a match in both tables
- `m` and `g` are table aliases (short names) for `movies` and `movies_genres`
- `ON m.id = g.movie_id` specifies the join condition
- Only movies that have genres are included

**Table Aliases**: Short names (`m`, `g`) make queries more readable, especially with long table names.

### Natural Join and USING Clause
```sql
SELECT * FROM T1 JOIN T2;
```
**Explanation**: 
- Natural join automatically matches columns with the same name
- Both tables must have a column with the same name

```sql
SELECT * FROM T1 JOIN T2 USING (C1);
```
**Explanation**: 
- `USING (C1)` explicitly specifies the column to join on
- Both tables must have column `C1`
- No need to use the `ON` keyword
- The result includes `C1` only once (not duplicated)

### LEFT JOIN (LEFT OUTER JOIN)
```sql
SELECT m.name, g.genre FROM movies m LEFT JOIN movies_genres g ON m.id = g.movie_id LIMIT 20;
```
**Explanation**: 
- `LEFT JOIN` returns all rows from the left table (`movies`)
- If there's no match in the right table (`movies_genres`), NULL values are returned
- Useful when you want all movies, even those without genres

### RIGHT JOIN (RIGHT OUTER JOIN)
```sql
SELECT m.name, g.genre FROM movies m RIGHT JOIN movies_genres g ON m.id = g.movie_id;
```
**Explanation**: 
- `RIGHT JOIN` returns all rows from the right table (`movies_genres`)
- If there's no match in the left table, NULL values are returned
- Less commonly used than LEFT JOIN

### FULL JOIN (FULL OUTER JOIN)
```sql
SELECT m.name, g.genre FROM movies m FULL JOIN movies_genres g ON m.id = g.movie_id;
```
**Explanation**: 
- `FULL JOIN` returns all rows from both tables
- NULL values are used where there's no match in either table
- MySQL doesn't support FULL JOIN natively (can be simulated with UNION)

**Join Types Summary**:
- `INNER JOIN` or `JOIN`: Only matching rows from both tables
- `LEFT JOIN` or `LEFT OUTER JOIN`: All rows from left table + matching rows from right
- `RIGHT JOIN` or `RIGHT OUTER JOIN`: All rows from right table + matching rows from left
- `FULL JOIN` or `FULL OUTER JOIN`: All rows from both tables

**Note**: NULL appears for missing counterpart rows in outer joins.

### Multiple JOINs (3-way and k-way)
```sql
SELECT a.first_name, a.last_name FROM actors a 
JOIN roles r ON a.id = r.actor_id 
JOIN movies m ON m.id = r.movie_id AND m.name = 'Officer 444';
```
**Explanation**: 
- Chains multiple JOINs to combine data from three tables
- `actors` → `roles` → `movies`
- Can join as many tables as needed (k-way joins)
- Useful for complex queries across multiple related tables

**Performance Note**: Joins can be computationally expensive when working with large tables. Proper indexing helps improve join performance.

---

## Sub-Queries

### Overview
Sub-queries (nested queries or inner queries) are queries within queries. The inner query executes first, and its results are used by the outer query.

### Basic Sub-query Syntax
```sql
SELECT column_name [, column_name]
FROM table1 [, table2]
WHERE column_name OPERATOR
   (SELECT column_name [, column_name]
   FROM table1 [, table2]
   [WHERE]);
```

**Execution Order**: The inner query executes first, then the outer query uses those results.

### Nested Sub-query Example
```sql
SELECT first_name, last_name FROM actors 
WHERE id IN 
    (SELECT actor_id FROM roles 
     WHERE movie_id IN 
         (SELECT id FROM movies 
          WHERE name = 'Schindler''s List'));
```
**Explanation**: 
- **Innermost query**: Finds the movie ID for "Schindler's List"
- **Middle query**: Finds all actor IDs who played in that movie
- **Outermost query**: Retrieves the names of those actors
- Uses nested `IN` clauses to chain the queries
- **Note**: Use two single quotes (`''`) to escape a single quote in SQL strings

### Sub-query Operators

**Common Operators Used with Sub-queries**:
- `IN` / `NOT IN`: Checks if a value exists in the sub-query results
- `EXISTS` / `NOT EXISTS`: Returns TRUE if the sub-query returns one or more records
- `ANY`: Returns TRUE if any sub-query value meets the condition
- `ALL`: Returns TRUE if all sub-query values meet the condition
- Comparison operators (`=`, `>`, `<`, etc.): Used with scalar sub-queries

### ALL Operator
```sql
SELECT * FROM movies 
WHERE rankscore >= ALL (SELECT MAX(rankscore) FROM movies);
```
**Explanation**: 
- `ALL` returns TRUE if the condition is true for ALL values returned by the sub-query
- The sub-query finds the maximum `rankscore`
- The outer query finds all movies with `rankscore` greater than or equal to ALL values (effectively equal to the maximum)
- Gets all movies with the maximum rank score

**Correlated Sub-queries**: Sub-queries that reference columns from the outer query. They execute once for each row of the outer query. See: [Correlated Subquery](https://en.wikipedia.org/wiki/Correlated_subquery)

---

## Data Manipulation Language (DML)

DML commands modify data in tables: `SELECT`, `INSERT`, `UPDATE`, `DELETE`.

### INSERT Statement

#### Single Row Insert
```sql
INSERT INTO movies(id, name, year, rankscore) VALUES (412321, 'Thor', 2011, 7);
```
**Explanation**: 
- `INSERT INTO` adds new rows to a table
- Specifies column names and corresponding values
- Inserts one new row with the given values

#### Multiple Row Insert
```sql
INSERT INTO movies(id, name, year, rankscore) 
VALUES 
    (412321, 'Thor', 2011, 7), 
    (412322, 'Iron Man', 2008, 7.9), 
    (412323, 'Iron Man 2', 2010, 7);
```
**Explanation**: 
- Inserts multiple rows in a single statement
- Each set of values in parentheses represents one row
- More efficient than multiple separate INSERT statements

**Note**: You can also insert data from one table to another using nested sub-queries. See: [INSERT with Sub-query](https://en.wikipedia.org/wiki/Insert_(SQL)#Copying_rows_from_other_tables)

### UPDATE Statement
```sql
UPDATE movies SET rankscore = 9 WHERE id = 412321;
```
**Explanation**: 
- `UPDATE` modifies existing rows
- `SET rankscore = 9` changes the value of the `rankscore` column
- `WHERE id = 412321` specifies which row(s) to update
- **Can update multiple rows** if the WHERE condition matches multiple rows
- **Can be used with sub-queries** for complex update conditions

**General Syntax**:
```sql
UPDATE <TableName> SET col1 = val1, col2 = val2 WHERE condition;
```

### DELETE Statement
```sql
DELETE FROM movies WHERE id = 412321;
```
**Explanation**: 
- `DELETE` removes rows from a table
- `WHERE id = 412321` specifies which row(s) to delete
- **Warning**: Without a WHERE clause, all rows are deleted!
- Can be used with sub-queries for complex delete conditions

---

## Data Definition Language (DDL)

DDL commands define and modify database structure: `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.

### CREATE TABLE
```sql
CREATE TABLE language (id INT PRIMARY KEY, lang VARCHAR(50) NOT NULL);
```
**Explanation**: 
- `CREATE TABLE` creates a new table
- `id INT PRIMARY KEY`: Creates an integer column that uniquely identifies each row
- `lang VARCHAR(50) NOT NULL`: Creates a variable-length string column (max 50 chars) that cannot be NULL

### Data Types
Common SQL data types include:
- `INT`: Integer numbers
- `VARCHAR(n)`: Variable-length strings (max n characters)
- `CHAR(n)`: Fixed-length strings (n characters)
- `DATE`: Date values
- `DATETIME`: Date and time values
- `DECIMAL(p, s)`: Fixed-point decimal numbers
- `FLOAT`, `DOUBLE`: Floating-point numbers
- `BOOLEAN`: True/false values

For more details: [SQL Data Types](https://www.journaldev.com/16774/sql-data-types)

### Constraints
**SQL Constraints** enforce rules on data:

- **NOT NULL**: Ensures a column cannot have a NULL value
- **UNIQUE**: Ensures all values in a column are different
- **PRIMARY KEY**: Combination of NOT NULL and UNIQUE. Uniquely identifies each row
- **FOREIGN KEY**: Uniquely identifies a row in another table (creates relationships)
- **CHECK**: Ensures all values satisfy a specific condition
- **DEFAULT**: Sets a default value when no value is specified
- **INDEX**: Creates an index for faster data retrieval

For more details: [SQL Constraints](https://www.w3schools.com/sql/sql_constraints.asp)

### ALTER TABLE

#### ADD Column
```sql
ALTER TABLE language ADD country VARCHAR(50);
```
**Explanation**: Adds a new column `country` to the existing `language` table.

#### MODIFY Column
```sql
ALTER TABLE language MODIFY country VARCHAR(60);
```
**Explanation**: Changes the data type or size of the `country` column (from VARCHAR(50) to VARCHAR(60)).

#### DROP Column
```sql
ALTER TABLE language DROP country;
```
**Explanation**: Removes the `country` column from the `language` table. **Warning**: This permanently deletes the column and all its data!

### DROP TABLE
```sql
DROP TABLE Tablename;
```
**Explanation**: 
- Permanently removes the table and all its data
- **Cannot be undone!** Use with extreme caution

```sql
DROP TABLE TableName IF EXISTS;
```
**Explanation**: 
- Only drops the table if it exists
- Prevents errors if the table doesn't exist
- Useful in scripts and migrations

For more details: [MySQL DROP TABLE](https://dev.mysql.com/doc/refman/8.0/en/drop-table.html)

### TRUNCATE TABLE
```sql
TRUNCATE TABLE TableName;
```
**Explanation**: 
- Removes all rows from a table (same as `DELETE FROM TableName` without WHERE)
- Faster than DELETE for removing all data
- Resets auto-increment counters
- Cannot be rolled back in some databases (unlike DELETE)

---

## Data Control Language (DCL)

DCL commands control access to the database. These are primarily used by database administrators.

### Overview
Data Control Language manages permissions and access control for database objects. Common commands include `GRANT` and `REVOKE`.

### GRANT
Grants privileges to users or roles.

**Example**:
```sql
GRANT SELECT, INSERT ON database.table TO 'username'@'host';
```

### REVOKE
Revokes previously granted privileges.

**Example**:
```sql
REVOKE SELECT ON database.table FROM 'username'@'host';
```

**References**:
- [Data Control Language (Wikipedia)](https://en.wikipedia.org/wiki/Data_control_language)
- [MySQL GRANT Documentation](https://dev.mysql.com/doc/refman/8.0/en/grant.html)
- [MySQL REVOKE Documentation](https://dev.mysql.com/doc/refman/8.0/en/revoke.html)

---

## Summary

This tutorial covered:
- **Basic queries** to retrieve data from tables
- **Filtering and sorting** with WHERE, ORDER BY, LIMIT
- **Aggregating data** with functions like COUNT, MIN, MAX
- **Grouping data** with GROUP BY and HAVING
- **Combining tables** with various JOIN types
- **Nested queries** for complex data retrieval
- **Modifying data** with INSERT, UPDATE, DELETE
- **Managing database structure** with CREATE, ALTER, DROP, TRUNCATE
- **Access control** with DCL commands

Practice these concepts with the IMDB database to become proficient in SQL!

