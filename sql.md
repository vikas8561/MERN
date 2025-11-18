# Unit 3: Structured Query Language (SQL) & Advanced Queries

---

## SQL Basics

### Introduction to SQL

**SQL (Structured Query Language)** is a standard programming language designed for managing and manipulating relational databases. It provides a standardized way to interact with databases, allowing users to:
**What is relational Database**
- A relational database is a type of database that stores data in tables (rows and columns) and allows you to relate data from different tables using keys

- Create and modify database structures
- Insert, update, and delete data
- Query and retrieve data
- Control access to data
- Manage transactions

SQL is declarative, meaning you specify **what** you want, not **how** to get it. The database management system (DBMS) determines the most efficient way to execute the query.

### SQL Data Types

Data types define the kind of data that can be stored in a column. Each column in a table must have a data type that specifies what type of data it can hold.

#### Numeric Data Types

- `INT` / `INTEGER` - Stores whole numbers (most commonly used integer type)
  - Range: typically -2,147,483,648 to 2,147,483,647
  - Example: `product_id INT`

- `DECIMAL(p, s)` / `NUMERIC(p, s)` - Stores exact numeric values with fixed precision
  - `p` = precision (total number of digits)
  - `s` = scale (number of digits after decimal point)
  - **Use for money/currency** - Never use FLOAT for financial data
  - Example: `DECIMAL(10, 2)` can store values like 12345678.90

- `FLOAT` - Stores approximate numeric values (use for scientific calculations)
  - Example: `discount FLOAT`

#### String/Character Data Types

- `VARCHAR(n)` - Variable-length character string (most commonly used)
  - Stores up to n characters
  - Uses only the space needed
  - Example: `VARCHAR(255)` for names, emails, addresses

- `CHAR(n)` - Fixed-length character string
  - Always uses n characters of storage
  - Use when you know the exact length (e.g., country codes, status codes)
  - Example: `CHAR(2)` for state codes

- `TEXT` - Variable-length string for large text data
  - Use for long text like descriptions, comments, articles
  - Example: `description TEXT`

#### Date and Time Data Types

- `DATE` - Stores date only (format: YYYY-MM-DD)
  - Example: '2023-12-25'
  - Use when you only need the date

- `DATETIME` - Stores both date and time (format: YYYY-MM-DD HH:MM:SS)
  - Example: '2023-12-25 14:30:00'
  - Most commonly used for timestamps

- `TIMESTAMP` - Stores date and time (similar to DATETIME)
  - Automatically updates on row modification in some databases
  - Use for tracking when records are created/updated

#### Boolean Data Type

- `BOOLEAN` / `BOOL` - Stores true/false values
  - Values: TRUE, FALSE, or NULL
  - Some databases use `TINYINT(1)` or `BIT` to represent boolean values
  - Example: `is_active BOOLEAN`

**Complete Example:**
```sql
CREATE TABLE Products (
    product_id INT,
    product_name VARCHAR(100),
    price DECIMAL(10, 2),
    description TEXT,
    is_available BOOLEAN,
    created_at DATETIME
);
```

**Best Practices:**
- Use `INT` for whole numbers (IDs, quantities)
- Use `DECIMAL` for money/currency (never use FLOAT)
- Use `VARCHAR` for most text fields
- Use `TEXT` only when VARCHAR is not sufficient
- Use `DATE` when you only need the date
- Use `DATETIME` or `TIMESTAMP` for date and time

### Types of SQL

SQL commands are categorized into four main types based on their functionality:

#### 1. DDL (Data Definition Language)

DDL commands are used to define and modify the structure of database objects (tables, indexes, views, etc.).

**Key Commands:**
- `CREATE` - Creates new database objects
- `ALTER` - Modifies existing database objects
- `DROP` - Deletes database objects
- `TRUNCATE` - Removes all records from a table
- `RENAME` - Renames database objects

**Difference between DROP and TRUNCATE:**
- DROP Deletes the entire table (structure + data)
- TRUNCATE Deletes all rows but keeps the table structure
- We can't recover table in DROP
- DROP is slower than TRUNCATE

**Examples of all DDL Commands:**

**1. CREATE - Creates new database objects**

```sql
-- Create a database
CREATE DATABASE school_db;

-- Create a table
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    email VARCHAR(255) UNIQUE,
    enrollment_date DATE
);

-- Create a table with foreign key
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id)
);

-- Create an index
CREATE INDEX idx_student_email ON Students(email);

-- Create a view
CREATE VIEW student_info AS
SELECT student_id, name, email
FROM Students
WHERE age >= 18;
```

**2. ALTER - Modifies existing database objects**

```sql
-- Add a column
ALTER TABLE Students ADD COLUMN phone VARCHAR(15);

-- Add multiple columns
ALTER TABLE Students 
ADD COLUMN address VARCHAR(200),
ADD COLUMN city VARCHAR(50);

-- Modify a column (change data type)
ALTER TABLE Students MODIFY COLUMN age SMALLINT;

-- Change column name (MySQL)
ALTER TABLE Students CHANGE COLUMN name student_name VARCHAR(100);

-- Rename column (SQL Server, PostgreSQL)
ALTER TABLE Students RENAME COLUMN name TO student_name;

-- Drop a column
ALTER TABLE Students DROP COLUMN phone;

-- Add a constraint
ALTER TABLE Students ADD CONSTRAINT chk_age CHECK (age >= 18);

-- Drop a constraint
ALTER TABLE Students DROP CONSTRAINT chk_age;

-- Add primary key
ALTER TABLE Students ADD PRIMARY KEY (student_id);

-- Add foreign key
ALTER TABLE Courses 
ADD FOREIGN KEY (instructor_id) REFERENCES Instructors(instructor_id);
```

**3. DROP - Deletes database objects permanently**

```sql
-- Drop a table
DROP TABLE Students;

-- Drop a table if exists (prevents error if table doesn't exist)
DROP TABLE IF EXISTS Students;

-- Drop a database
DROP DATABASE school_db;

-- Drop an index
DROP INDEX idx_student_email ON Students;

-- Drop a view
DROP VIEW student_info;

-- Drop a constraint
ALTER TABLE Students DROP CONSTRAINT chk_age;
```

**4. TRUNCATE - Removes all records from a table**

```sql
-- Truncate a table (removes all rows, keeps structure)
TRUNCATE TABLE Students;

-- Truncate with CASCADE (removes related data in other tables)
TRUNCATE TABLE Students CASCADE;
```

**5. RENAME - Renames database objects**

```sql
-- Rename a table (MySQL)
RENAME TABLE Students TO Pupils;

-- Rename a table (SQL Server)
EXEC sp_rename 'Students', 'Pupils';

-- Rename a table (PostgreSQL)
ALTER TABLE Students RENAME TO Pupils;

-- Rename a column (MySQL)
ALTER TABLE Students RENAME COLUMN name TO student_name;

-- Rename a database (MySQL)
RENAME DATABASE old_db TO new_db;
```

#### 2. DML (Data Manipulation Language)

DML commands are used to manipulate data within database tables.

**Key Commands:**
- `INSERT` - Adds new records to a table
- `UPDATE` - Modifies existing records
- `DELETE` - Removes records from a table
- `SELECT` - Retrieves data from tables

**Examples of all DML Commands:**

**1. INSERT - Adds new records to a table**

```sql
-- Insert single row with specified columns
INSERT INTO Students (student_id, name, age, email)
VALUES (1, 'John Doe', 20, 'john@example.com');

-- Insert single row with all columns (in order)
INSERT INTO Students
VALUES (2, 'Jane Smith', 21, 'jane@example.com', '2023-01-15');

-- Insert multiple rows
INSERT INTO Students (student_id, name, age, email)
VALUES 
    (3, 'Bob Johnson', 19, 'bob@example.com'),
    (4, 'Alice Brown', 22, 'alice@example.com'),
    (5, 'Charlie Wilson', 20, 'charlie@example.com');

-- Insert data from another table
INSERT INTO Students (student_id, name, age, email)
SELECT student_id, name, age, email
FROM NewStudents
WHERE age >= 18;

-- Insert with default values
INSERT INTO Students (student_id, name)
VALUES (6, 'David Lee');
-- age and email will be NULL or default values

-- Insert with NULL values explicitly
INSERT INTO Students (student_id, name, age, email)
VALUES (7, 'Emma Davis', NULL, NULL);
```

**2. UPDATE - Modifies existing records**

```sql
-- Update single column for specific rows
UPDATE Students
SET age = 21
WHERE student_id = 1;

-- Update multiple columns
UPDATE Students
SET age = 22, email = 'newemail@example.com'
WHERE student_id = 2;

-- Update all rows (be careful!)
UPDATE Students
SET age = age + 1;
-- This increments age for all students

-- Update with condition using multiple criteria
UPDATE Students
SET age = 23
WHERE name = 'John Doe' AND email = 'john@example.com';

-- Update using subquery
UPDATE Students
SET age = 25
WHERE student_id IN (
    SELECT student_id FROM Enrollments WHERE course_id = 101
);

-- Update with calculation
UPDATE Students
SET age = YEAR(CURRENT_DATE) - YEAR(birth_date)
WHERE birth_date IS NOT NULL;

-- Update with CASE statement
UPDATE Students
SET age = CASE
    WHEN age < 18 THEN 18
    WHEN age > 65 THEN 65
    ELSE age
END;
```

**3. DELETE - Removes records from a table**

```sql
-- Delete specific rows
DELETE FROM Students
WHERE student_id = 1;

-- Delete with condition
DELETE FROM Students
WHERE age < 18;

-- Delete with multiple conditions
DELETE FROM Students
WHERE age < 18 AND enrollment_date < '2023-01-01';

-- Delete all rows (be careful!)
DELETE FROM Students;
-- This removes all rows but keeps table structure

-- Delete using subquery
DELETE FROM Students
WHERE student_id IN (
    SELECT student_id FROM Enrollments WHERE course_id = 101
);

-- Delete with JOIN (some databases)
DELETE s FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
WHERE e.course_id = 101;

-- Delete with LIMIT (MySQL)
DELETE FROM Students
WHERE age < 18
LIMIT 10;
```

**4. SELECT - Retrieves data from tables**

```sql
-- Select all columns from a table
SELECT * FROM Students;

-- Select specific columns
SELECT student_id, name, email FROM Students;

-- Select with WHERE condition
SELECT * FROM Students WHERE age >= 18;

-- Select with multiple conditions
SELECT * FROM Students 
WHERE age >= 18 AND email IS NOT NULL;

-- Select with ORDER BY
SELECT * FROM Students ORDER BY age DESC;

-- Select with LIMIT
SELECT * FROM Students LIMIT 10;

-- Select distinct values
SELECT DISTINCT age FROM Students;

-- Select with aggregate functions
SELECT COUNT(*) AS total_students FROM Students;
SELECT AVG(age) AS average_age FROM Students;
SELECT MAX(age) AS max_age, MIN(age) AS min_age FROM Students;

-- Select with GROUP BY
SELECT age, COUNT(*) AS count
FROM Students
GROUP BY age;

-- Select with HAVING
SELECT age, COUNT(*) AS count
FROM Students
GROUP BY age
HAVING COUNT(*) > 5;

-- Select with JOIN
SELECT s.name, c.course_name
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
INNER JOIN Courses c ON e.course_id = c.course_id;

-- Select with subquery
SELECT * FROM Students
WHERE age > (SELECT AVG(age) FROM Students);

-- Select with aliases
SELECT 
    s.student_id AS id,
    s.name AS student_name,
    s.age AS student_age
FROM Students s;
```

#### 3. DCL (Data Control Language)

DCL commands are used to control access to data and manage user permissions.

**Key Commands:**
- `GRANT` - Gives user access privileges
- `REVOKE` - Removes user access privileges

**Examples of all DCL Commands:**

**1. GRANT - Gives user access privileges**

```sql
-- Grant SELECT privilege on a table
GRANT SELECT ON Students TO user1;

-- Grant multiple privileges on a table
GRANT SELECT, INSERT, UPDATE ON Students TO user1;

-- Grant all privileges on a table
GRANT ALL PRIVILEGES ON Students TO user1;

-- Grant privileges on a database
GRANT ALL PRIVILEGES ON school_db.* TO user1;

-- Grant privileges on all tables in a database
GRANT SELECT, INSERT ON school_db.* TO user1;

-- Grant privileges to multiple users
GRANT SELECT ON Students TO user1, user2, user3;

-- Grant privileges with GRANT OPTION (allows user to grant privileges to others)
GRANT SELECT ON Students TO user1 WITH GRANT OPTION;

-- Grant privileges on specific columns
GRANT SELECT (student_id, name) ON Students TO user1;

-- Grant privileges to a role
GRANT SELECT, INSERT ON Students TO student_role;

-- Grant system privileges (database-level)
GRANT CREATE DATABASE TO admin_user;
GRANT CREATE TABLE TO developer_user;

-- Grant privileges to PUBLIC (all users)
GRANT SELECT ON Students TO PUBLIC;
```

**2. REVOKE - Removes user access privileges**

```sql
-- Revoke SELECT privilege from a user
REVOKE SELECT ON Students FROM user1;

-- Revoke multiple privileges
REVOKE SELECT, INSERT, UPDATE ON Students FROM user1;

-- Revoke all privileges on a table
REVOKE ALL PRIVILEGES ON Students FROM user1;

-- Revoke privileges on a database
REVOKE ALL PRIVILEGES ON school_db.* FROM user1;

-- Revoke privileges from multiple users
REVOKE SELECT ON Students FROM user1, user2, user3;

-- Revoke GRANT OPTION
REVOKE GRANT OPTION FOR SELECT ON Students FROM user1;

-- Revoke privileges on specific columns
REVOKE SELECT (student_id, name) ON Students FROM user1;

-- Revoke privileges from a role
REVOKE SELECT, INSERT ON Students FROM student_role;

-- Revoke system privileges
REVOKE CREATE DATABASE FROM admin_user;
REVOKE CREATE TABLE FROM developer_user;

-- Revoke privileges from PUBLIC
REVOKE SELECT ON Students FROM PUBLIC;

-- Revoke CASCADE (removes privileges granted by the user)
REVOKE SELECT ON Students FROM user1 CASCADE;
```

**Common Privileges:**
- `SELECT` - Read data from tables
- `INSERT` - Add new rows to tables
- `UPDATE` - Modify existing rows
- `DELETE` - Remove rows from tables
- `CREATE` - Create new database objects
- `DROP` - Delete database objects
- `ALTER` - Modify database objects
- `INDEX` - Create indexes
- `REFERENCES` - Create foreign keys
- `ALL PRIVILEGES` - All privileges on an object

#### 4. TCL (Transaction Control Language)

TCL commands are used to manage transactions in the database. A transaction is a sequence of SQL operations that are executed as a single unit of work.

**Key Commands:**
- `COMMIT` - Saves all changes made in the current transaction
- `ROLLBACK` - Undoes all changes made in the current transaction
- `SAVEPOINT` - Creates a point within a transaction to rollback to
- `SET TRANSACTION` - Sets transaction characteristics

**Transaction Properties (ACID):**
- **Atomicity** - All operations succeed or all fail
- **Consistency** - Database remains in a valid state
- **Isolation** - Transactions don't interfere with each other
- **Durability** - Committed changes are permanent

**Examples of all TCL Commands:**

**1. COMMIT - Saves all changes made in the current transaction**

```sql
-- Begin transaction (implicit in most databases)
BEGIN TRANSACTION;  -- or START TRANSACTION (MySQL)

-- Perform multiple operations
INSERT INTO Students (student_id, name, age, email)
VALUES (1, 'John Doe', 20, 'john@example.com');

UPDATE Students SET age = 21 WHERE student_id = 1;

DELETE FROM Students WHERE student_id = 2;

-- Commit all changes (makes them permanent)
COMMIT;

-- Commit with work keyword (optional)
COMMIT WORK;

-- Example: Transfer money between accounts
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE account_id = 2;
COMMIT;  -- Both updates are saved together
```

**2. ROLLBACK - Undoes all changes made in the current transaction**

```sql
-- Begin transaction
BEGIN TRANSACTION;

-- Perform operations
INSERT INTO Students (student_id, name, age, email)
VALUES (3, 'Jane Smith', 21, 'jane@example.com');

UPDATE Students SET age = 22 WHERE student_id = 3;

-- Rollback all changes (undoes everything since BEGIN)
ROLLBACK;

-- Rollback with work keyword (optional)
ROLLBACK WORK;

-- Example: If any operation fails, rollback everything
BEGIN TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE account_id = 1;
-- If next operation fails, rollback the first one too
UPDATE Accounts SET balance = balance + 100 WHERE account_id = 999;  -- Error!
ROLLBACK;  -- Undoes the first UPDATE
```

**3. SAVEPOINT - Creates a point within a transaction to rollback to**

```sql
-- Begin transaction
BEGIN TRANSACTION;

-- First operation
INSERT INTO Students (student_id, name, age, email)
VALUES (4, 'Bob Johnson', 19, 'bob@example.com');

-- Create a savepoint
SAVEPOINT sp1;

-- Second operation
UPDATE Students SET age = 20 WHERE student_id = 4;

-- Create another savepoint
SAVEPOINT sp2;

-- Third operation
DELETE FROM Students WHERE student_id = 4;

-- Rollback to savepoint sp2 (undoes DELETE, keeps INSERT and UPDATE)
ROLLBACK TO sp2;

-- Or rollback to savepoint sp1 (undoes UPDATE and DELETE, keeps INSERT)
ROLLBACK TO sp1;

-- Release a savepoint (removes it)
RELEASE SAVEPOINT sp1;

-- Example: Complex transaction with multiple savepoints
BEGIN TRANSACTION;
SAVEPOINT before_insert;
INSERT INTO Orders (order_id, customer_id, total) VALUES (1, 101, 500);
SAVEPOINT before_update;
UPDATE Customers SET total_orders = total_orders + 1 WHERE customer_id = 101;
-- If update fails, rollback to before_update
ROLLBACK TO before_update;
-- Continue with transaction
COMMIT;
```

**4. SET TRANSACTION - Sets transaction characteristics**

```sql
-- Set transaction isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Set transaction to read-only
SET TRANSACTION READ ONLY;

-- Set transaction to read-write (default)
SET TRANSACTION READ WRITE;

-- Set transaction with name
SET TRANSACTION NAME 'student_update_transaction';

-- Combined settings
SET TRANSACTION 
    ISOLATION LEVEL SERIALIZABLE,
    READ WRITE,
    NAME 'complex_transaction';

-- Begin transaction with settings
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
-- Transaction operations here
COMMIT;
```

**Transaction Isolation Levels:**
- `READ UNCOMMITTED` - Lowest isolation, can read uncommitted data
- `READ COMMITTED` - Can only read committed data (default in most databases)
- `REPEATABLE READ` - Same read results throughout transaction
- `SERIALIZABLE` - Highest isolation, transactions are completely isolated

**Complete Transaction Example:**

```sql
-- Example: Complete transaction with error handling
BEGIN TRANSACTION;

SAVEPOINT start_point;

-- Insert student
INSERT INTO Students (student_id, name, age, email)
VALUES (5, 'Alice Brown', 22, 'alice@example.com');

SAVEPOINT after_insert;

-- Enroll in course
INSERT INTO Enrollments (student_id, course_id)
VALUES (5, 101);

-- If enrollment fails, rollback to after_insert
-- ROLLBACK TO after_insert;

-- Update student count
UPDATE Courses SET enrolled_students = enrolled_students + 1
WHERE course_id = 101;

-- If everything succeeds, commit
COMMIT;

-- If anything fails, rollback everything
-- ROLLBACK;
```

**Auto-commit Mode:**
- Most databases have auto-commit enabled by default
- Each SQL statement is automatically committed
- To use transactions, disable auto-commit:
  ```sql
  SET AUTOCOMMIT = 0;  -- Disable auto-commit
  -- Now you need to explicitly COMMIT or ROLLBACK
  SET AUTOCOMMIT = 1;  -- Enable auto-commit (default)
  ```

### Basic SQL Commands

#### CREATE
Creates new database objects (tables, databases, indexes, etc.).

```sql
CREATE TABLE Employees (
    emp_id INT,
    emp_name VARCHAR(100),
    salary DECIMAL(10, 2),
    hire_date DATE
);
```

#### INSERT
Adds new rows to a table.

```sql
-- Insert single row
INSERT INTO Employees (emp_id, emp_name, salary, hire_date)
VALUES (101, 'Alice Smith', 50000, '2023-01-15');

-- Insert multiple rows
INSERT INTO Employees VALUES
(102, 'Bob Johnson', 60000, '2023-02-20'),
(103, 'Charlie Brown', 55000, '2023-03-10');
```

#### UPDATE
Modifies existing data in a table.

```sql
UPDATE Employees
SET salary = 55000
WHERE emp_id = 101;

-- Update multiple columns
UPDATE Employees
SET salary = 65000, emp_name = 'Robert Johnson'
WHERE emp_id = 102;
```

#### DELETE
Removes rows from a table.

```sql
-- Delete specific rows
DELETE FROM Employees
WHERE emp_id = 103;

-- Delete all rows (be careful!)
DELETE FROM Employees;
```

#### DROP
Deletes database objects permanently.

```sql
-- Drop a table
DROP TABLE Employees;

-- Drop a database
DROP DATABASE company_db;
```

#### ALTER
Modifies the structure of existing database objects.

```sql
-- Add a column
ALTER TABLE Employees ADD COLUMN department VARCHAR(50);

-- Modify a column
ALTER TABLE Employees MODIFY COLUMN salary DECIMAL(12, 2);

-- Drop a column
ALTER TABLE Employees DROP COLUMN department;

-- Rename a column
ALTER TABLE Employees RENAME COLUMN emp_name TO employee_name;
```

#### SELECT
Retrieves data from one or more tables.

```sql
-- Select all columns
SELECT * FROM Employees;

-- Select specific columns
SELECT emp_id, emp_name, salary FROM Employees;

-- Select with conditions
SELECT * FROM Employees WHERE salary > 50000;

-- Select with ordering
SELECT * FROM Employees ORDER BY salary DESC;

-- Select distinct values
SELECT DISTINCT department FROM Employees;
```

---

## SQL Constraints

Constraints are rules enforced on data columns to ensure data integrity and accuracy. They limit the type of data that can be inserted into a table.

### PRIMARY KEY

Uniquely identifies each row in a table. A table can have only one primary key, which can consist of single or multiple columns.

```sql
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255)
);

-- Composite primary key
CREATE TABLE Enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id)
);
```

**Characteristics:**
- Must contain unique values
- Cannot contain NULL values
- Automatically creates an index

### FOREIGN KEY

Establishes a relationship between two tables. It references the primary key of another table.

```sql
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- With named constraint
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY fk_customer (customer_id) 
    REFERENCES Customers(customer_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

**Referential Actions:**
- `ON DELETE CASCADE` - Deletes related rows when parent is deleted
- `ON DELETE SET NULL` - Sets foreign key to NULL when parent is deleted
- `ON UPDATE CASCADE` - Updates foreign key when parent key is updated

### UNIQUE

Ensures all values in a column are different. Unlike PRIMARY KEY, a table can have multiple UNIQUE constraints, and UNIQUE columns can contain NULL values.

```sql
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15) UNIQUE
);

-- Multiple columns unique constraint
CREATE TABLE Reservations (
    reservation_id INT PRIMARY KEY,
    room_number INT,
    reservation_date DATE,
    UNIQUE (room_number, reservation_date)
);
```

### NOT NULL

Ensures a column cannot have NULL values.

```sql
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT
);
```

### CHECK

Ensures all values in a column satisfy a specific condition.

```sql
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    emp_name VARCHAR(100) NOT NULL,
    age INT CHECK (age >= 18 AND age <= 65),
    salary DECIMAL(10, 2) CHECK (salary > 0),
    email VARCHAR(255) CHECK (email LIKE '%@%.%')
);

-- Table-level CHECK constraint
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    order_date DATE,
    delivery_date DATE,
    CHECK (delivery_date >= order_date)
);
```

### IN

Used in WHERE clause to specify multiple possible values for a column.

```sql
-- Select employees in specific departments
SELECT * FROM Employees
WHERE department IN ('Sales', 'Marketing', 'IT');

-- With subquery
SELECT * FROM Employees
WHERE department_id IN (
    SELECT dept_id FROM Departments 
    WHERE location = 'New York'
);

-- NOT IN
SELECT * FROM Employees
WHERE department NOT IN ('HR', 'Finance');
```

---

## SQL Functions

### Aggregate Functions

Aggregate functions perform calculations on a set of rows and return a single value. They are often used with the `GROUP BY` clause.

#### SUM()

Returns the sum of all values in a numeric column.

```sql
-- Total salary of all employees
SELECT SUM(salary) AS total_salary FROM Employees;

-- Sum by department
SELECT department, SUM(salary) AS dept_total
FROM Employees
GROUP BY department;
```

#### AVG()

Returns the average (mean) value of a numeric column.

```sql
-- Average salary
SELECT AVG(salary) AS avg_salary FROM Employees;

-- Average by department
SELECT department, AVG(salary) AS avg_dept_salary
FROM Employees
GROUP BY department;
```

#### MIN()

Returns the minimum value in a column.

```sql
-- Minimum salary
SELECT MIN(salary) AS min_salary FROM Employees;

-- Minimum by department
SELECT department, MIN(salary) AS min_dept_salary
FROM Employees
GROUP BY department;

-- Can be used with dates
SELECT MIN(hire_date) AS earliest_hire FROM Employees;
```

#### MAX()

Returns the maximum value in a column.

```sql
-- Maximum salary
SELECT MAX(salary) AS max_salary FROM Employees;

-- Maximum by department
SELECT department, MAX(salary) AS max_dept_salary
FROM Employees
GROUP BY department;
```

#### COUNT()

Returns the number of rows that match a specified condition.

```sql
-- Count all rows
SELECT COUNT(*) AS total_employees FROM Employees;

-- Count non-NULL values in a column
SELECT COUNT(email) AS employees_with_email FROM Employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) AS num_departments FROM Employees;

-- Count with conditions
SELECT COUNT(*) FROM Employees WHERE salary > 50000;
```

**Note:** `COUNT(*)` counts all rows including NULLs, while `COUNT(column_name)` counts only non-NULL values.

### Built-in Functions

#### Numeric Functions

Functions that perform operations on numeric data.

**Common Numeric Functions:**

```sql
-- ABS() - Absolute value
SELECT ABS(-15) AS absolute_value;  -- Returns 15

-- ROUND() - Round to specified decimal places
SELECT ROUND(123.4567, 2) AS rounded;  -- Returns 123.46
SELECT ROUND(123.4567, 0) AS rounded;  -- Returns 123

-- CEIL() / CEILING() - Round up to nearest integer
SELECT CEIL(123.45) AS ceiling;  -- Returns 124

-- FLOOR() - Round down to nearest integer
SELECT FLOOR(123.45) AS floor;  -- Returns 123

-- MOD() - Modulo (remainder)
SELECT MOD(10, 3) AS remainder;  -- Returns 1

-- POWER() - Raise to power
SELECT POWER(2, 3) AS power;  -- Returns 8

-- SQRT() - Square root
SELECT SQRT(16) AS square_root;  -- Returns 4

-- RAND() - Random number between 0 and 1
SELECT RAND() AS random_number;

-- TRUNCATE() - Truncate to specified decimal places
SELECT TRUNCATE(123.4567, 2) AS truncated;  -- Returns 123.45
```

**Example Usage:**
```sql
SELECT 
    emp_name,
    salary,
    ROUND(salary * 0.1, 2) AS bonus,
    CEIL(salary / 12) AS monthly_salary
FROM Employees;
```

#### Date Functions

Functions that perform operations on date and time data.

**Common Date Functions:**

```sql
-- CURRENT_DATE / CURDATE() - Current date
SELECT CURRENT_DATE AS today;

-- CURRENT_TIME / CURTIME() - Current time
SELECT CURRENT_TIME AS now_time;

-- CURRENT_TIMESTAMP / NOW() - Current date and time
SELECT NOW() AS current_datetime;

-- DATE() - Extract date part
SELECT DATE('2023-12-25 14:30:00') AS date_only;  -- Returns 2023-12-25

-- YEAR() - Extract year
SELECT YEAR('2023-12-25') AS year;  -- Returns 2023

-- MONTH() - Extract month
SELECT MONTH('2023-12-25') AS month;  -- Returns 12

-- DAY() / DAYOFMONTH() - Extract day
SELECT DAY('2023-12-25') AS day;  -- Returns 25

-- DAYNAME() - Day of week name
SELECT DAYNAME('2023-12-25') AS day_name;  -- Returns Monday

-- MONTHNAME() - Month name
SELECT MONTHNAME('2023-12-25') AS month_name;  -- Returns December

-- DATEDIFF() - Difference between two dates (in days)
SELECT DATEDIFF('2023-12-31', '2023-01-01') AS days_diff;  -- Returns 364

-- DATE_ADD() / ADDDATE() - Add interval to date
SELECT DATE_ADD('2023-01-01', INTERVAL 30 DAY) AS future_date;
SELECT DATE_ADD('2023-01-01', INTERVAL 1 MONTH) AS next_month;
SELECT DATE_ADD('2023-01-01', INTERVAL 1 YEAR) AS next_year;

-- DATE_SUB() / SUBDATE() - Subtract interval from date
SELECT DATE_SUB('2023-12-31', INTERVAL 30 DAY) AS past_date;

-- EXTRACT() - Extract specific part
SELECT EXTRACT(YEAR FROM '2023-12-25') AS year;
SELECT EXTRACT(MONTH FROM '2023-12-25') AS month;
```

**Example Usage:**
```sql
-- Employees hired in last year
SELECT emp_name, hire_date
FROM Employees
WHERE hire_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR);

-- Calculate age
SELECT 
    emp_name,
    birth_date,
    YEAR(CURRENT_DATE) - YEAR(birth_date) AS age
FROM Employees;
```

#### String Functions

Functions that perform operations on string (text) data.

**Common String Functions:**

```sql
-- CONCAT() - Concatenate strings
SELECT CONCAT('Hello', ' ', 'World') AS greeting;  -- Returns 'Hello World'
SELECT CONCAT(emp_name, ' - ', department) AS info FROM Employees;

-- LENGTH() / CHAR_LENGTH() - String length
SELECT LENGTH('Hello') AS str_length;  -- Returns 5

-- UPPER() / UCASE() - Convert to uppercase
SELECT UPPER('hello') AS upper_case;  -- Returns 'HELLO'

-- LOWER() / LCASE() - Convert to lowercase
SELECT LOWER('HELLO') AS lower_case;  -- Returns 'hello'

-- SUBSTRING() / SUBSTR() - Extract substring
SELECT SUBSTRING('Hello World', 1, 5) AS substr;  -- Returns 'Hello'
SELECT SUBSTRING('Hello World', 7) AS substr;  -- Returns 'World'

-- TRIM() - Remove leading/trailing spaces
SELECT TRIM('  Hello  ') AS trimmed;  -- Returns 'Hello'
SELECT LTRIM('  Hello') AS left_trim;  -- Returns 'Hello'
SELECT RTRIM('Hello  ') AS right_trim;  -- Returns 'Hello'

-- REPLACE() - Replace substring
SELECT REPLACE('Hello World', 'World', 'SQL') AS replaced;  -- Returns 'Hello SQL'

-- REVERSE() - Reverse string
SELECT REVERSE('Hello') AS reversed;  -- Returns 'olleH'

-- LEFT() - Extract leftmost characters
SELECT LEFT('Hello World', 5) AS left_str;  -- Returns 'Hello'

-- RIGHT() - Extract rightmost characters
SELECT RIGHT('Hello World', 5) AS right_str;  -- Returns 'World'

-- LOCATE() / POSITION() / INSTR() - Find position of substring
SELECT LOCATE('World', 'Hello World') AS position;  -- Returns 7

-- LPAD() - Pad left side
SELECT LPAD('Hello', 10, '*') AS left_padded;  -- Returns '*****Hello'

-- RPAD() - Pad right side
SELECT RPAD('Hello', 10, '*') AS right_padded;  -- Returns 'Hello*****'
```

**Example Usage:**
```sql
-- Format employee names
SELECT 
    UPPER(SUBSTRING(emp_name, 1, 1)) AS first_initial,
    LOWER(SUBSTRING(emp_name, 2)) AS rest_of_name
FROM Employees;

-- Extract domain from email
SELECT 
    email,
    SUBSTRING(email, LOCATE('@', email) + 1) AS domain
FROM Employees;
```

---

## Advanced Queries

### GROUP BY

The `GROUP BY` clause groups rows that have the same values in specified columns into summary rows. It is typically used with aggregate functions.

```sql
-- Group by single column
SELECT department, COUNT(*) AS employee_count
FROM Employees
GROUP BY department;

-- Group by multiple columns
SELECT department, job_title, COUNT(*) AS count
FROM Employees
GROUP BY department, job_title;

-- Group by with aggregate functions
SELECT 
    department,
    COUNT(*) AS total_employees,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary,
    SUM(salary) AS total_salary
FROM Employees
GROUP BY department;
```

**Important Notes:**
- All columns in SELECT must either be in GROUP BY or be aggregate functions
- GROUP BY is processed after WHERE but before ORDER BY
- NULL values are grouped together

### HAVING

The `HAVING` clause filters groups created by `GROUP BY`. Unlike `WHERE`, which filters rows, `HAVING` filters groups.

```sql
-- Filter groups with aggregate conditions
SELECT department, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department
HAVING AVG(salary) > 50000;

-- Multiple conditions in HAVING
SELECT department, COUNT(*) AS emp_count
FROM Employees
GROUP BY department
HAVING COUNT(*) > 5 AND AVG(salary) > 45000;

-- HAVING with WHERE
SELECT department, AVG(salary) AS avg_salary
FROM Employees
WHERE hire_date >= '2020-01-01'
GROUP BY department
HAVING AVG(salary) > 50000;
```

**Key Differences:**
- `WHERE` filters rows before grouping
- `HAVING` filters groups after grouping
- `WHERE` cannot use aggregate functions
- `HAVING` can use aggregate functions

### ORDER BY

The `ORDER BY` clause sorts the result set in ascending or descending order.

```sql
-- Sort by single column (ascending by default)
SELECT * FROM Employees ORDER BY salary;

-- Sort in descending order
SELECT * FROM Employees ORDER BY salary DESC;

-- Sort by multiple columns
SELECT * FROM Employees 
ORDER BY department ASC, salary DESC;

-- Sort by column position
SELECT emp_name, salary, department 
FROM Employees 
ORDER BY 2 DESC;  -- Sort by 2nd column (salary)

-- Sort by expression
SELECT emp_name, salary, salary * 0.1 AS bonus
FROM Employees
ORDER BY salary * 0.1 DESC;

-- NULL handling
SELECT * FROM Employees 
ORDER BY commission NULLS LAST;  -- NULLs at end
SELECT * FROM Employees 
ORDER BY commission NULLS FIRST;  -- NULLs at beginning
```

### Set Operations

Set operations combine results from multiple SELECT statements. All queries must have the same number of columns and compatible data types.

#### UNION

Combines results from two or more SELECT statements, removing duplicates.

```sql
-- Union of two queries
SELECT emp_name FROM Employees
UNION
SELECT emp_name FROM Managers;

-- Union with multiple columns
SELECT first_name, last_name FROM Employees
UNION
SELECT first_name, last_name FROM Contractors;

-- UNION ALL (keeps duplicates)
SELECT emp_name FROM Employees
UNION ALL
SELECT emp_name FROM Managers;
```

**Key Points:**
- `UNION` removes duplicate rows
- `UNION ALL` keeps all rows including duplicates (faster)
- Column names come from the first SELECT statement
- All SELECT statements must have the same number of columns

#### INTERSECT

Returns rows that are common to both SELECT statements (rows that exist in both).

```sql
-- Employees who are also managers
SELECT emp_id FROM Employees
INTERSECT
SELECT emp_id FROM Managers;

-- Common products in two orders
SELECT product_id FROM Order1_Items
INTERSECT
SELECT product_id FROM Order2_Items;
```

**Note:** Not all database systems support INTERSECT. Alternative using INNER JOIN:
```sql
SELECT DISTINCT e.emp_id
FROM Employees e
INNER JOIN Managers m ON e.emp_id = m.emp_id;
```

#### EXCEPT (or MINUS)

Returns rows from the first SELECT that are not in the second SELECT.

```sql
-- Employees who are not managers
SELECT emp_id FROM Employees
EXCEPT
SELECT emp_id FROM Managers;

-- Products in order1 but not in order2
SELECT product_id FROM Order1_Items
EXCEPT
SELECT product_id FROM Order2_Items;
```

**Note:** Not all database systems support EXCEPT. Alternative using LEFT JOIN:
```sql
SELECT e.emp_id
FROM Employees e
LEFT JOIN Managers m ON e.emp_id = m.emp_id
WHERE m.emp_id IS NULL;
```

### Sub-queries

A subquery (nested query) is a query within another SQL query. It can be used in SELECT, FROM, WHERE, and HAVING clauses.

#### Simple Sub-queries

A subquery that executes independently and returns a value or set of values.

**Scalar Subquery (returns single value):**
```sql
-- Employees with salary above average
SELECT * FROM Employees
WHERE salary > (SELECT AVG(salary) FROM Employees);

-- Using in SELECT clause
SELECT 
    emp_name,
    salary,
    (SELECT AVG(salary) FROM Employees) AS avg_salary
FROM Employees;
```

**Single-row Subquery:**
```sql
-- Employee with highest salary
SELECT * FROM Employees
WHERE salary = (SELECT MAX(salary) FROM Employees);
```

**Multiple-row Subquery:**
```sql
-- Employees in departments with more than 10 employees
SELECT * FROM Employees
WHERE department IN (
    SELECT department 
    FROM Employees 
    GROUP BY department 
    HAVING COUNT(*) > 10
);

-- Using ANY
SELECT * FROM Employees
WHERE salary > ANY (
    SELECT salary FROM Managers
);

-- Using ALL
SELECT * FROM Employees
WHERE salary > ALL (
    SELECT salary FROM Managers
);
```

**Multiple-column Subquery:**
```sql
-- Find employees with same department and salary as a specific employee
SELECT * FROM Employees
WHERE (department, salary) = (
    SELECT department, salary 
    FROM Employees 
    WHERE emp_id = 101
);
```

**Subquery in FROM clause:**
```sql
-- Using subquery as derived table
SELECT dept_name, avg_sal
FROM (
    SELECT department AS dept_name, AVG(salary) AS avg_sal
    FROM Employees
    GROUP BY department
) AS dept_avg
WHERE avg_sal > 50000;
```

#### Correlated Sub-queries

A subquery that references columns from the outer query. It executes once for each row processed by the outer query.

```sql
-- Employees whose salary is above their department average
SELECT e1.*
FROM Employees e1
WHERE salary > (
    SELECT AVG(salary)
    FROM Employees e2
    WHERE e2.department = e1.department
);

-- Employees who have at least one order
SELECT *
FROM Employees e
WHERE EXISTS (
    SELECT 1
    FROM Orders o
    WHERE o.emp_id = e.emp_id
);

-- Employees with maximum salary in their department
SELECT e1.*
FROM Employees e1
WHERE salary = (
    SELECT MAX(salary)
    FROM Employees e2
    WHERE e2.department = e1.department
);
```

**Key Characteristics:**
- References columns from the outer query
- Executes once per row of the outer query
- Can be slower than joins for large datasets
- Useful when you need to compare each row with aggregated data

**EXISTS and NOT EXISTS:**
```sql
-- Departments that have employees
SELECT *
FROM Departments d
WHERE EXISTS (
    SELECT 1
    FROM Employees e
    WHERE e.department_id = d.dept_id
);

-- Departments with no employees
SELECT *
FROM Departments d
WHERE NOT EXISTS (
    SELECT 1
    FROM Employees e
    WHERE e.department_id = d.dept_id
);
```

### Joins and Types

Joins combine rows from two or more tables based on a related column between them.

#### Inner Join

Returns only rows that have matching values in both tables.

```sql
-- Basic inner join
SELECT e.emp_name, d.dept_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id;

-- Alternative syntax (implicit join)
SELECT e.emp_name, d.dept_name
FROM Employees e, Departments d
WHERE e.dept_id = d.dept_id;

-- Multiple joins
SELECT 
    e.emp_name,
    d.dept_name,
    p.project_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id
INNER JOIN Projects p ON e.emp_id = p.emp_id;
```

**Characteristics:**
- Returns only matching rows
- Most common type of join
- Excludes rows with no match in either table

#### Left Join (LEFT OUTER JOIN)

Returns all rows from the left table and matched rows from the right table. If no match, NULL values are returned for right table columns.

```sql
-- Left join
SELECT e.emp_name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id;

-- Find employees without departments
SELECT e.emp_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.dept_id IS NULL;
```

**Use Cases:**
- When you need all records from the left table
- Finding records with no matching relationship
- Preserving all data from the primary table

#### Right Join (RIGHT OUTER JOIN)

Returns all rows from the right table and matched rows from the left table. If no match, NULL values are returned for left table columns.

```sql
-- Right join
SELECT e.emp_name, d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;

-- Find departments with no employees
SELECT d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id
WHERE e.emp_id IS NULL;
```

**Note:** Right joins are less commonly used. A LEFT JOIN with reversed table order achieves the same result.

#### Full Outer Join (FULL OUTER JOIN)

Returns all rows from both tables. If there's no match, NULL values are returned for missing columns.

```sql
-- Full outer join
SELECT e.emp_name, d.dept_name
FROM Employees e
FULL OUTER JOIN Departments d ON e.dept_id = d.dept_id;
```

**Note:** Not all database systems support FULL OUTER JOIN. Alternative using UNION:
```sql
SELECT e.emp_name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id
UNION
SELECT e.emp_name, d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;
```

**Use Cases:**
- When you need all records from both tables
- Finding all relationships and non-relationships

#### Cross Join (Cartesian Product)

Returns the Cartesian product of two tables - every row from the first table combined with every row from the second table.

```sql
-- Cross join
SELECT e.emp_name, d.dept_name
FROM Employees e
CROSS JOIN Departments d;

-- Alternative syntax
SELECT e.emp_name, d.dept_name
FROM Employees e, Departments d;
```

**Characteristics:**
- No join condition needed
- Results in m × n rows (m rows from first table × n rows from second)
- Can produce very large result sets
- Rarely used intentionally, often a mistake when ON clause is forgotten

**Use Cases:**
- Generating combinations
- Creating test data
- When you need all possible combinations

#### Self Join

A table is joined with itself. Useful for hierarchical data or comparing rows within the same table.

```sql
-- Find employees and their managers (assuming manager_id references emp_id)
SELECT 
    e.emp_name AS employee,
    m.emp_name AS manager
FROM Employees e
INNER JOIN Employees m ON e.manager_id = m.emp_id;

-- Find employees with same salary
SELECT 
    e1.emp_name AS employee1,
    e2.emp_name AS employee2,
    e1.salary
FROM Employees e1
INNER JOIN Employees e2 ON e1.salary = e2.salary
WHERE e1.emp_id < e2.emp_id;  -- Avoid duplicates and self-matches

-- Hierarchical query (employees and their subordinates)
SELECT 
    manager.emp_name AS manager,
    employee.emp_name AS subordinate
FROM Employees manager
LEFT JOIN Employees employee ON employee.manager_id = manager.emp_id;
```

**Use Cases:**
- Hierarchical relationships (org charts, categories)
- Comparing rows within the same table
- Finding relationships between rows in the same table

---

## Summary

This unit covers:

1. **SQL Basics**: Understanding SQL types (DDL, DML, DCL, TCL) and basic commands for database operations
2. **SQL Constraints**: Ensuring data integrity through PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, and IN
3. **SQL Functions**: Using aggregate functions (SUM, AVG, MIN, MAX, COUNT) and built-in functions (numeric, date, string)
4. **Advanced Queries**: Mastering GROUP BY, HAVING, ORDER BY, set operations (UNION, INTERSECT, EXCEPT), sub-queries (simple and correlated), and various join types (Inner, Left, Right, Full Outer, Cross, Self)

These concepts form the foundation for effective database querying and data manipulation in relational database management systems.

