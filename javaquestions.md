# Advanced Java — Viva Theory Questions
## Unit 1: Introduction to JDBC

### Basic Concepts
1. What is JDBC? Why is it needed in Java applications?
2. What does JDBC stand for and what is its full form?
3. What are the main components of the JDBC architecture?
4. What is the role of the DriverManager class in JDBC?
5. What is a JDBC driver? Why is it required?
6. Name and explain the four types of JDBC drivers.
7. Which JDBC driver type is most commonly used in production and why?
8. What is the difference between Type 1 and Type 4 JDBC drivers?
9. What is a JDBC URL? What are its three parts?
10. Write the standard JDBC URL format for connecting to a MySQL database.
11. What is the java.sql package? Name at least five interfaces it provides.

### Connecting to Database
12. What are the steps to establish a database connection using JDBC?
13. What is the purpose of Class.forName() in JDBC?
14. Is Class.forName() mandatory in modern JDBC 4.0? Why or why not?
15. What does DriverManager.getConnection() return?
16. What are the three parameters typically passed to DriverManager.getConnection()?
17. What is a Connection object in JDBC? What does it represent?
18. Why is it important to close the Connection object after use?
19. What happens if you do not close a database connection in JDBC?
20. What is connection pooling? How does it differ from a regular JDBC connection?

### Executing Queries
21. What is the Statement interface in JDBC? When is it used?
22. What is the difference between executeQuery(), executeUpdate(), and execute()?
23. What does executeQuery() return? What does executeUpdate() return?
24. What is a ResultSet in JDBC?
25. How do you iterate through a ResultSet? Which method is used?
26. What does ResultSet.next() return and what does it do?
27. How do you retrieve column values from a ResultSet? Name at least three getter methods.
28. What is the difference between getString() and getInt() in ResultSet?
29. What is the initial position of the ResultSet cursor before calling next()?
30. What is a scrollable ResultSet? How does it differ from a forward-only ResultSet?
31. What are the different types of ResultSet (TYPE_FORWARD_ONLY, TYPE_SCROLL_INSENSITIVE, TYPE_SCROLL_SENSITIVE)?

### PreparedStatement
32. What is a PreparedStatement? How is it different from Statement?
33. Why is PreparedStatement preferred over Statement?
34. What is SQL injection? How does PreparedStatement prevent it?
35. What is the '?' placeholder in a PreparedStatement?
36. How do you set values for placeholders in a PreparedStatement?
37. What is the difference between setString(), setInt(), and setDouble() in PreparedStatement?
38. Can a PreparedStatement be reused with different parameter values? How?
39. What is the performance benefit of PreparedStatement for repeated queries?
40. How do you execute a PreparedStatement that runs a SELECT query?

### CallableStatement & Transactions
41. What is a CallableStatement? When is it used?
42. How do you create a CallableStatement in JDBC?
43. What is a stored procedure? How is it called using JDBC?
44. What is a transaction in JDBC?
45. What is auto-commit mode in JDBC? What is its default value?
46. How do you disable auto-commit mode in JDBC?
47. What is the difference between commit() and rollback() in JDBC?
48. When should you use rollback() in a JDBC transaction?
49. What is a savepoint in JDBC? How is it used?
50. What is the SQLException class? When is it thrown?
51. What information does a SQLException object carry?
52. What is the purpose of the finally block when working with JDBC?
53. What is try-with-resources and how does it help in JDBC?

---

## Unit 2: Java Servlets and Web Application Basics

### Servlet Fundamentals
54. What is a Java Servlet? What is its purpose?
55. How does a Servlet differ from a regular Java class?
56. What is a servlet container (web container)? Give an example.
57. What is the role of Apache Tomcat in Java web applications?
58. What is the Servlet API? Which package provides it?
59. What is the javax.servlet package? What does it contain?
60. What is the difference between GenericServlet and HttpServlet?
61. Which class do you extend to create an HTTP Servlet?
62. Why is HttpServlet abstract?
63. What are the methods provided by the HttpServlet class?

### Servlet Lifecycle
64. Explain the complete lifecycle of a Java Servlet.
65. When is the init() method of a Servlet called?
66. How many times is the init() method called during a servlet's lifetime?
67. What is the purpose of the init() method?
68. What does the service() method do in a Servlet?
69. How does the service() method decide which doXxx() method to call?
70. When is the destroy() method called?
71. How many times is the destroy() method called?
72. What should the destroy() method do? Give practical examples.
73. What is the difference between init(ServletConfig config) and init()?
74. Is a Servlet instantiated once or for every request? Explain.

### HTTP Request–Response Model
75. What is the HTTP request-response model?
76. What is the difference between HTTP GET and HTTP POST?
77. When should you use GET and when should you use POST?
78. What are the limitations of the GET method for sending data?
79. What is the HttpServletRequest interface? What does it represent?
80. What is the HttpServletResponse interface? What does it represent?
81. How do you read a request parameter from a form using Servlets?
82. What is the difference between getParameter() and getAttribute()?
83. What does getParameterValues() return? When is it used?
84. How do you get all parameter names from a request?
85. What is request.getReader()? When is it used?
86. How do you write HTML output from a Servlet?
87. What is PrintWriter and how is it obtained from HttpServletResponse?
88. What is the purpose of response.setContentType()?
89. What is the difference between sendRedirect() and RequestDispatcher.forward()?
90. What happens to the URL in the browser when you use sendRedirect() vs forward()?

### Initialization Parameters
91. What are initialization parameters (init params) in Servlets?
92. Where are init params defined? Show the web.xml syntax.
93. How do you read an init param inside a Servlet?
94. What is the ServletConfig interface?
95. What is the difference between ServletConfig and ServletContext?
96. What is a context parameter? How does it differ from a servlet init param?
97. How do you read a context parameter in a Servlet?

### Session Management
98. What is session management? Why is it needed in web applications?
99. Why is HTTP called a stateless protocol?
100. What are the different session management techniques in Servlets?
101. What is a Cookie? How does it work?
102. How do you create a Cookie in a Servlet?
103. How do you add a Cookie to the response?
104. How do you read Cookies from the request?
105. What is the difference between a session cookie and a persistent cookie?
106. How do you set the expiry time of a Cookie?
107. What are the limitations of Cookies for session management?
108. What is HttpSession? How does it differ from a Cookie?
109. How do you create or retrieve an HttpSession object?
110. What is the difference between request.getSession() and request.getSession(false)?
111. How do you store and retrieve objects in an HttpSession?
112. What is session.invalidate()? When should it be called?
113. What is session timeout? How is it configured?
114. What is URL rewriting? How does it work?
115. How does URL rewriting maintain session when cookies are disabled?
116. What is response.encodeURL()? What is its purpose?
117. What is a session ID?
118. Compare Cookies, HttpSession, and URL rewriting as session management techniques.

### Filters and Authentication
119. What is a Servlet Filter?
120. What is the purpose of the Filter interface in the Servlet API?
121. What are the three methods defined in the Filter interface?
122. What is the FilterChain? What does chain.doFilter() do?
123. How is a filter mapped to a servlet in web.xml?
124. Can multiple filters be applied to a single servlet? In what order?
125. What is the difference between a Filter and a Servlet?
126. What is an authentication filter? How does it work?
127. Give practical use cases for Servlet Filters.
128. What is the init() method of a Filter and when is it called?

### web.xml and Deployment
129. What is web.xml? What is its role in a Java web application?
130. What is a deployment descriptor?
131. How do you map a Servlet to a URL pattern in web.xml?
132. What is the <servlet> element in web.xml?
133. What is the <servlet-mapping> element?
134. What is the <load-on-startup> element? What does it do?
135. What is the difference between a WAR file and a JAR file?
136. What is the structure of a Java web application (WAR structure)?
137. What is the WEB-INF folder? Why is it important?

---

## Unit 3: Java Server Pages (JSP)

### JSP Architecture and Basics
138. What is JSP? What is its full form?
139. What is the purpose of JSP in Java web development?
140. How does JSP differ from a Servlet?
141. What is the relationship between JSP and Servlets?
142. What is the JSP container?
143. What happens when a JSP page is first accessed by a client?
144. Into what does a JSP page get converted before execution?
145. What are the advantages of JSP over Servlets for generating HTML?

### JSP Lifecycle
146. Explain the complete lifecycle of a JSP page.
147. What is the translation phase in the JSP lifecycle?
148. What is the compilation phase in the JSP lifecycle?
149. What is the _jspService() method? Who calls it?
150. What is the difference between _jspInit(), _jspService(), and _jspDestroy()?
151. How many times is a JSP page translated and compiled?
152. When does re-translation of a JSP occur?
153. What is the difference between the JSP lifecycle and the Servlet lifecycle?

### JSP Scripting Elements
154. What are the three scripting elements in JSP?
155. What is a JSP Scriptlet? What is its syntax?
156. Inside which generated method does the scriptlet code go?
157. What is a JSP Expression? What is its syntax?
158. What is the difference between a scriptlet and an expression?
159. Can you use a semicolon inside a JSP Expression? Why or why not?
160. What is a JSP Declaration? What is its syntax?
161. What is the difference between a Declaration and a Scriptlet?
162. Inside which part of the generated class do declarations go?
163. Why is it not recommended to use scriptlets in JSP?

