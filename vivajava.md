# Advanced Java — Viva Questions

---

## Unit 1: Enterprise Java, MVC, and JDBC

### Enterprise Java & MVC
**Q1: What is Enterprise Java?**
**Ans:** It is a platform (Java EE / Jakarta EE) that provides APIs and runtime environments for developing and running large-scale, multi-tiered, scalable, and secure network applications.

**Q2: What are the typical tiers in a multi-tier architecture?**
**Ans:** Presentation Tier (UI), Business Logic Tier (processing), and Data Tier (database).

**Q3: Explain the MVC architecture.**
**Ans:** MVC stands for Model-View-Controller. 
- **Model** handles data and business logic.
- **View** handles presentation (e.g., HTML/JSP).
- **Controller** handles user requests, updates the model, and selects the view (e.g., Servlets or Spring Controllers).

### JDBC Fundamentals
**Q4: What is JDBC?**
**Ans:** Java Database Connectivity (JDBC) is a Java API that allows Java applications to connect to relational databases, execute SQL queries, and retrieve results.

**Q5: What are the different types of JDBC drivers?**
**Ans:** There are 4 types: 
1. JDBC-ODBC Bridge
2. Native-API Driver
3. Network Protocol Driver
4. Thin Driver (Most widely used, pure Java, converts JDBC calls directly to native database protocol).

**Q6: What is the difference between `Statement` and `PreparedStatement`?**
**Ans:** 
- `Statement` is used for static SQL queries and is vulnerable to SQL injection. 
- `PreparedStatement` is pre-compiled, uses placeholders (`?`), is faster for repeated execution, and prevents SQL injection.

**Q7: Which method is used to execute a SELECT query?**
**Ans:** `executeQuery()`, which returns a `ResultSet` object containing the tabular data.

**Q8: Which method is used to execute INSERT, UPDATE, or DELETE queries?**
**Ans:** `executeUpdate()`, which returns an integer representing the number of rows affected.

### Advanced JDBC (Batch & Transactions)
**Q9: What is Batch Processing in JDBC?**
**Ans:** Executing multiple SQL queries as a single batch in one network round-trip to the database, significantly improving performance for bulk operations. Methods used are `addBatch()` and `executeBatch()`.

**Q10: What is a Database Transaction?**
**Ans:** A sequence of operations performed as a single logical unit of work. It follows the ACID properties (Atomicity, Consistency, Isolation, Durability) — "All or Nothing."

**Q11: How do you handle transactions in JDBC?**
**Ans:** 
1. Disable auto-commit: `connection.setAutoCommit(false);`
2. Execute queries.
3. If successful, call `connection.commit();`
4. If an exception occurs, call `connection.rollback();`

---

## Unit 2: Java Servlets & Filters

### Servlet Fundamentals
**Q12: What is a Servlet?**
**Ans:** A Servlet is a server-side Java program that handles client requests, processes them, and generates a dynamic web response. 

**Q13: Explain the lifecycle of a Servlet.**
**Ans:** 
1. **Instantiation**: Server creates the Servlet object.
2. **Initialization**: `init(ServletConfig)` is called exactly once.
3. **Request Processing**: `service(request, response)` is called for every incoming HTTP request.
4. **Destruction**: `destroy()` is called once before the servlet is removed from memory.

**Q14: What is the deployment descriptor?**
**Ans:** `web.xml` is the deployment descriptor. It is used to declare servlets, map them to specific URLs (`<servlet-mapping>`), and define init parameters and filters.

**Q15: What is the difference between `ServletConfig` and `ServletContext`?**
**Ans:** 
- `ServletConfig` provides configuration details specific to a *single* servlet.
- `ServletContext` provides configuration and data shared across the *entire* web application (all servlets).

### Session Management
**Q16: Why is Session Management required?**
**Ans:** HTTP is a stateless protocol, meaning the server forgets the client after each request/response cycle. Session management techniques are used to remember user state (e.g., login status, shopping cart) across multiple requests.

**Q17: Name the common technique used for session management.**
**Ans:** Cookies, `HttpSession`, URL Rewriting, and Hidden Form Fields.

**Q18: What is the difference between Cookies and HttpSession?**
**Ans:** 
- **Cookies**: Stored on the client-side (browser), limited size (4KB), less secure.
- **HttpSession**: Stored on the server-side, no hard size limit, more secure. Only a session ID is sent to the client (usually via a cookie or URL rewriting).

**Q19: What does `request.getSession(false)` do?**
**Ans:** It returns the current existing session if one exists. If no session exists, it returns `null` instead of creating a new one.

**Q20: What is URL Rewriting?**
**Ans:** Appending the session ID directly to the end of all URLs (e.g., `url;jsessionid=123ABC`). It is used as a fallback when the user disables cookies in their browser.

### Servlet Filters
**Q21: What is a Filter?**
**Ans:** An object invoked to intercept and pre-process an HTTP request before it reaches the Servlet, or post-process a response before it is sent to the client.

**Q22: Give examples of when to use a Filter.**
**Ans:** Authentication/Authorization checks (checking if a user is logged in), Logging requests, and Data compression/encryption.

**Q23: What does `chain.doFilter(request, response)` do inside a filter?**
**Ans:** It passes the control to the next filter in the chain, or if there are no more filters, it passes control to the target Servlet.

---

## Unit 3: JSP, EL & JSTL

### JSP Basics
**Q24: What is JSP? What advantage does it have over Servlets?**
**Ans:** JavaServer Pages (JSP) is a server-side technology used to create dynamic web pages by embedding Java code within HTML. It is easier to write and maintain than Servlets because you don't have to use `out.println()` for every single HTML tag.

**Q25: Are JSPs executed directly?**
**Ans:** No. A JSP is translated into a Servlet (`.java` file) by the JSP engine, compiled into a `.class` file, and then executed by the server.

**Q26: Explain the 3 main JSP Scripting Elements.**
**Ans:** 
1. **Scriptlet** `<% ... %>`: Used to write normal Java statements within `_jspService()`.
2. **Expression** `<%= ... %>`: Directly evaluates and prints a value (no semicolon needed).
3. **Declaration** `<%! ... %>`: Used to declare class-level instance variables and methods outside of `_jspService()`.

**Q27: Name some implicit objects in JSP.**
**Ans:** There are 9 implicit objects. The main ones are `request`, `response`, `out`, `session`, `application`, and `pageContext`.

### EL & JSTL
**Q28: What is Expression Language (EL)?**
**Ans:** EL (`${...}`) provides a simplified, short syntax to access data, variables, and javabeans stored in various scopes (page, request, session, application) without writing scriptlets.

**Q29: How does EL search for an attribute like `${user}`?**
**Ans:** It sequentially searches scopes in this order: page -> request -> session -> application. It returns the first match it finds.

**Q30: What is JSTL?**
**Ans:** JavaServer Pages Standard Tag Library (JSTL) is a collection of custom tags that encapsulate core functionality (loops, conditionals) to avoid writing raw Java code in JSP pages.

**Q31: What is the use of the JSTL `<c:forEach>` tag?**
**Ans:** It is used for iterating over collections, arrays, or a specific range of numbers, replacing normal Java `for` loops in JSPs.

**Q32: Distinguish between `<c:if>` and `<c:choose>`.**
**Ans:** `<c:if>` provides a simple conditional evaluation but lacks an `else` clause. `<c:choose>` (along with `<c:when>` and `<c:otherwise>`) acts like a switch/if-else-if block.

---

## Unit 4: Spring Framework, DI, IoC and REST

### Spring Framework & Boot
**Q33: What were the problems with traditional Servlet/JDBC development that Spring solved?**
**Ans:** Tight coupling of classes, massive amounts of repetitive boilerplate code (especially in JDBC), complex XML configurations (`web.xml`), and the need for external application servers.

**Q34: What is Inversion of Control (IoC)?**
**Ans:** IoC is a design principle where the control of object creation and lifecycle management is transferred from the programmer (who manually uses `new`) to the Spring Framework container.

**Q35: What is a Spring Bean?**
**Ans:** A Java object that is instantiated, assembled, and managed by the Spring IoC container.

**Q36: What is Dependency Injection (DI)?**
**Ans:** It is the application of the IoC principle. Instead of a class creating its dependent objects, the Spring container automatically "injects" those dependencies into the class when needed.

**Q37: What are the types of Dependency Injection in Spring?**
**Ans:** 
1. Field Injection (using `@Autowired` directly on fields).
2. Setter Injection (via setter methods).
3. Constructor Injection (injecting dependencies via the class constructor — this is the recommended approach).

**Q38: What does the `@Autowired` annotation do?**
**Ans:** It tells the Spring IoC container to find a matching bean and inject it automatically into the field, setter, or constructor.

**Q39: What is `@Qualifier` used for?**
**Ans:** When there are multiple beans of the same type, `@Autowired` gets confused. `@Qualifier` is used alongside `@Autowired` to specify the exact name of the bean to be injected.

### Spring Boot
**Q40: What is Spring Boot?**
**Ans:** Spring Boot is an extension of the Spring framework that simplifies setup and provides auto-configuration, embedded servers (like Tomcat), and starter dependencies. Its goal is to get production-ready apps running with minimal configuration.

**Q41: Mention the key differences between Spring and Spring Boot.**
**Ans:**
- Spring requires extensive configuration (XML or Java configs); Spring Boot utilizes Auto-Configuration.
- Spring requires deploying a WAR file to an external server; Spring Boot uses an embedded server and runs as an executable JAR.

### REST Controllers
**Q42: What is REST?**
**Ans:** Representational State Transfer. It's an architectural style for designing networked applications (APIs) where resources are identified by URLs and manipulated using standard HTTP methods.

**Q43: What is the difference between `@Controller` and `@RestController`?**
**Ans:** 
- `@Controller` is used for traditional MVC web apps where the method returns a View (like a JSP file).
- `@RestController` combines `@Controller` and `@ResponseBody`. It directly returns data (like JSON) to the client without looking for a view template.

**Q44: What are the main HTTP methods used in REST APIs?**
**Ans:** 
- **GET**: Read data (`@GetMapping`)
- **POST**: Create data (`@PostMapping`)
- **PUT**: Update data (`@PutMapping`)
- **DELETE**: Delete data (`@DeleteMapping`)

**Q45: Explain the difference between `@PathVariable` and `@RequestParam`.**
**Ans:** 
- `@PathVariable` extracts values directly embedded in the URL path (e.g., `/students/{id}`). Best used to identify a specific resource.
- `@RequestParam` extracts values from the query string of the URL (e.g., `/students?id=5`). Best used for filtering, searching, or pagination.

**Q46: What doesn `@RequestBody` do?**
**Ans:** It reads the incoming HTTP request body (usually in JSON format) and automatically deserializes it into a Java object (e.g., converting a JSON payload to a `Student` object in a POST request).

**Q47: What is the default scope of a Spring Bean?**
**Ans:** Singleton. Spring creates exactly one instance of the object for the entire application. Other scopes include Prototype, Request, and Session.
