# Java Basics - Comprehensive Notes
## Essential Concepts for JDBC, JSP, Servlet, and Spring Boot

---

## Table of Contents
1. [Introduction to Java](#introduction-to-java)
2. [Data Types and Variables](#data-types-and-variables)
3. [Operators](#operators)
4. [Control Flow Statements](#control-flow-statements)
5. [Arrays](#arrays)
6. [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
7. [Classes and Objects](#classes-and-objects)
8. [Inheritance](#inheritance)
9. [Polymorphism](#polymorphism)
10. [Encapsulation](#encapsulation)
11. [Abstraction](#abstraction)
12. [Interfaces](#interfaces)
13. [Packages](#packages)
14. [Exception Handling](#exception-handling)
15. [Collections Framework](#collections-framework)
16. [Generics](#generics)
17. [File I/O](#file-io)
18. [Multi-threading](#multi-threading)
19. [Lambda Expressions and Streams](#lambda-expressions-and-streams)
20. [Annotations](#annotations)
21. [String Handling](#string-handling)
22. [Wrapper Classes](#wrapper-classes)

---

## Introduction to Java

### What is Java?
- **Platform-independent**: Write once, run anywhere (WORA)
- **Object-oriented**: Everything is an object
- **Compiled and Interpreted**: Source code → Bytecode → JVM
- **Robust**: Strong memory management, exception handling
- **Secure**: No pointers, bytecode verification

### Java Architecture
```
Source Code (.java) 
    ↓
Compiler (javac)
    ↓
Bytecode (.class)
    ↓
JVM (Java Virtual Machine)
    ↓
Machine Code
```

### JDK, JRE, JVM
- **JDK (Java Development Kit)**: Development tools + JRE
- **JRE (Java Runtime Environment)**: Runtime libraries + JVM
- **JVM (Java Virtual Machine)**: Executes bytecode

---

## Data Types and Variables

### Primitive Data Types

| Type | Size | Range | Default Value |
|------|------|-------|---------------|
| `byte` | 1 byte | -128 to 127 | 0 |
| `short` | 2 bytes | -32,768 to 32,767 | 0 |
| `int` | 4 bytes | -2³¹ to 2³¹-1 | 0 |
| `long` | 8 bytes | -2⁶³ to 2⁶³-1 | 0L |
| `float` | 4 bytes | ~±3.4E38 | 0.0f |
| `double` | 8 bytes | ~±1.7E308 | 0.0d |
| `char` | 2 bytes | Unicode characters | '\u0000' |
| `boolean` | 1 bit | true/false | false |

### Variable Declaration
```java
// Syntax: dataType variableName = value;
int age = 25;
String name = "John";
double salary = 50000.50;
boolean isActive = true;
```

### Variable Types
1. **Local Variables**: Declared inside methods/blocks
2. **Instance Variables**: Declared in class, outside methods
3. **Static Variables**: Shared across all instances

```java
public class Example {
    static int count = 0;        // Static variable
    String name;                 // Instance variable
    
    public void method() {
        int localVar = 10;       // Local variable
    }
}
```

### Type Casting
```java
// Implicit (Widening)
int a = 10;
long b = a;  // Automatic

// Explicit (Narrowing)
double x = 10.5;
int y = (int) x;  // Manual casting
```

---

## Operators

### Arithmetic Operators
```java
+  Addition
-  Subtraction
*  Multiplication
/  Division
%  Modulus
++ Increment
-- Decrement
```

### Relational Operators
```java
== Equal to
!= Not equal to
>  Greater than
<  Less than
>= Greater than or equal
<= Less than or equal
```

### Logical Operators
```java
&& Logical AND
|| Logical OR
!  Logical NOT
```

### Assignment Operators
```java
=   Simple assignment
+=  Add and assign
-=  Subtract and assign
*=  Multiply and assign
/=  Divide and assign
%=  Modulus and assign
```

### Ternary Operator
```java
int result = (condition) ? valueIfTrue : valueIfFalse;
int max = (a > b) ? a : b;
```

---

## Control Flow Statements

### If-Else Statements
```java
if (condition) {
    // code block
} else if (condition2) {
    // code block
} else {
    // code block
}
```

### Switch Statement
```java
switch (variable) {
    case value1:
        // code
        break;
    case value2:
        // code
        break;
    default:
        // code
}
```

### Loops

#### For Loop
```java
for (initialization; condition; increment) {
    // code
}

for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

#### Enhanced For Loop (For-Each)
```java
for (dataType item : collection) {
    // code
}

int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num);
}
```

#### While Loop
```java
while (condition) {
    // code
}
```

#### Do-While Loop
```java
do {
    // code
} while (condition);
```

### Break and Continue
```java
// Break: exits the loop
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
}

// Continue: skips current iteration
for (int i = 0; i < 10; i++) {
    if (i == 5) continue;
    System.out.println(i);
}
```

---

## Arrays

### Array Declaration and Initialization
```java
// Declaration
int[] numbers;
String[] names;

// Initialization
int[] numbers = new int[5];
int[] numbers = {1, 2, 3, 4, 5};

// Accessing elements
numbers[0] = 10;
int value = numbers[0];
```

### Multi-dimensional Arrays
```java
int[][] matrix = new int[3][3];
int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};

// Accessing
matrix[0][0] = 10;
```

### Array Methods
```java
int[] arr = {1, 2, 3};
int length = arr.length;  // Get array length
```

---

## Object-Oriented Programming (OOP)

### Four Pillars of OOP
1. **Encapsulation**: Bundling data and methods together
2. **Inheritance**: Reusing code from parent classes
3. **Polymorphism**: One interface, multiple implementations
4. **Abstraction**: Hiding implementation details

---

## Classes and Objects

### Class Definition
```java
public class Student {
    // Fields (Attributes)
    private String name;
    private int age;
    
    // Constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    // Getter and Setter
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

### Object Creation
```java
// Using new keyword
Student student1 = new Student("John", 20);
student1.display();
```

### Constructor Types
```java
public class Example {
    // Default Constructor (no parameters)
    public Example() {
        // code
    }
    
    // Parameterized Constructor
    public Example(String name) {
        this.name = name;
    }
    
    // Constructor Overloading
    public Example(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

### Method Overloading
```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
}
```

### Access Modifiers
- **public**: Accessible from anywhere
- **private**: Accessible only within the class
- **protected**: Accessible within package and subclasses
- **default** (no modifier): Accessible within package

### Static Keyword
```java
public class Counter {
    static int count = 0;  // Static variable
    
    static void increment() {  // Static method
        count++;
    }
    
    // Access: Counter.count, Counter.increment()
}
```

### Final Keyword
```java
final int MAX_VALUE = 100;  // Constant
final class MyClass {}      // Cannot be inherited
final void method() {}      // Cannot be overridden
```

### This Keyword
```java
public class Student {
    private String name;
    
    public Student(String name) {
        this.name = name;  // 'this' refers to current object
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
```

---

## Inheritance

### Basic Inheritance
```java
// Parent Class (Superclass)
public class Animal {
    String name;
    
    public void eat() {
        System.out.println("Eating...");
    }
}

// Child Class (Subclass)
public class Dog extends Animal {
    public void bark() {
        System.out.println("Barking...");
    }
}

// Usage
Dog dog = new Dog();
dog.name = "Buddy";
dog.eat();   // Inherited method
dog.bark();  // Own method
```

### Super Keyword
```java
public class Parent {
    String name = "Parent";
    
    public Parent(String name) {
        this.name = name;
    }
}

public class Child extends Parent {
    String name = "Child";
    
    public Child(String name) {
        super(name);  // Call parent constructor
    }
    
    public void display() {
        System.out.println(super.name);  // Access parent field
    }
}
```

### Types of Inheritance
1. **Single Inheritance**: One parent, one child
2. **Multilevel Inheritance**: Chain of inheritance
3. **Hierarchical Inheritance**: Multiple children, one parent
4. **Multiple Inheritance**: Not supported (use interfaces instead)

### Method Overriding
```java
public class Animal {
    public void makeSound() {
        System.out.println("Some sound");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

---

## Polymorphism

### Runtime Polymorphism (Method Overriding)
```java
Animal animal = new Dog();  // Parent reference, Child object
animal.makeSound();  // Calls Dog's makeSound()
```

### Compile-time Polymorphism (Method Overloading)
```java
// Same method name, different parameters
public int add(int a, int b) { return a + b; }
public double add(double a, double b) { return a + b; }
```

---

## Encapsulation

### Concept
- Binding data and methods together
- Data hiding using access modifiers
- Controlled access through getters/setters

```java
public class BankAccount {
    private double balance;  // Private field
    
    public double getBalance() {  // Getter
        return balance;
    }
    
    public void deposit(double amount) {  // Setter with validation
        if (amount > 0) {
            balance += amount;
        }
    }
}
```

---

## Abstraction

### Abstract Class
```java
// Cannot be instantiated
public abstract class Shape {
    // Abstract method (no body)
    public abstract double calculateArea();
    
    // Concrete method
    public void display() {
        System.out.println("This is a shape");
    }
}

public class Circle extends Shape {
    private double radius;
    
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}
```

### Abstract Methods
- Must be in abstract class
- No implementation in parent class
- Must be overridden in child class

---

## Interfaces

### Interface Definition
```java
// Interface (all methods are abstract by default)
public interface Drawable {
    void draw();  // Abstract method (public abstract by default)
    
    // Default method (Java 8+)
    default void display() {
        System.out.println("Displaying...");
    }
    
    // Static method (Java 8+)
    static void info() {
        System.out.println("Drawable interface");
    }
}

// Implementation
public class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}
```

### Multiple Interface Implementation
```java
public interface A {
    void methodA();
}

public interface B {
    void methodB();
}

public class C implements A, B {
    @Override
    public void methodA() { }
    
    @Override
    public void methodB() { }
}
```

### Interface vs Abstract Class
| Interface | Abstract Class |
|-----------|----------------|
| Multiple inheritance | Single inheritance |
| All methods abstract (default) | Can have concrete methods |
| Variables are public static final | Can have instance variables |
| No constructors | Can have constructors |

---

## Packages

### Package Declaration
```java
package com.example.util;

public class Calculator {
    // class code
}
```

### Importing Packages
```java
import java.util.ArrayList;
import java.util.*;  // Import all classes
import java.util.Date;
import java.sql.Date;  // Fully qualified name if conflict
```

### Common Java Packages
- `java.lang` - Core classes (automatically imported)
- `java.util` - Collections, Date, Scanner
- `java.io` - File I/O
- `java.sql` - JDBC classes
- `java.net` - Networking
- `javax.servlet` - Servlet API
- `org.springframework` - Spring Framework

---

## Exception Handling

### Try-Catch Block
```java
try {
    // Risky code
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // Handle exception
    System.out.println("Division by zero: " + e.getMessage());
} catch (Exception e) {
    // Handle all other exceptions
    System.out.println("Error: " + e.getMessage());
} finally {
    // Always executes
    System.out.println("Cleanup code");
}
```

### Exception Hierarchy
```
Throwable
├── Error (unchecked)
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   └── ArithmeticException
    └── Checked Exceptions
        ├── IOException
        ├── SQLException
        └── ClassNotFoundException
```

### Checked vs Unchecked Exceptions
- **Checked**: Must be handled (compile-time)
- **Unchecked**: Runtime exceptions (RuntimeException, Error)

### Throwing Exceptions
```java
public void method() throws IOException {
    throw new IOException("Error occurred");
}
```

### Custom Exception
```java
public class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

// Usage
throw new CustomException("Custom error message");
```

### Try-with-Resources (Java 7+)
```java
try (FileReader fr = new FileReader("file.txt")) {
    // Use resource
} catch (IOException e) {
    // Handle exception
}
// Resource automatically closed
```

---

## Collections Framework

### Collection Interface Hierarchy
```
Collection
├── List (ordered, allows duplicates)
│   ├── ArrayList (dynamic array)
│   ├── LinkedList (doubly linked list)
│   └── Vector (synchronized)
├── Set (no duplicates)
│   ├── HashSet (hash table)
│   ├── LinkedHashSet (ordered HashSet)
│   └── TreeSet (sorted)
└── Queue (FIFO)
    └── PriorityQueue

Map (key-value pairs)
├── HashMap (hash table)
├── LinkedHashMap (ordered HashMap)
├── TreeMap (sorted)
└── Hashtable (synchronized)
```

### List Examples
```java
// ArrayList
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Cherry");
list.get(0);  // Access by index
list.remove(1);  // Remove element
list.size();  // Get size

// LinkedList
List<Integer> linkedList = new LinkedList<>();
linkedList.add(10);
linkedList.add(20);
```

### Set Examples
```java
// HashSet
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple");  // Duplicate ignored
set.contains("Apple");  // Check existence

// TreeSet (sorted)
Set<Integer> treeSet = new TreeSet<>();
treeSet.add(30);
treeSet.add(10);
treeSet.add(20);
// Automatically sorted: [10, 20, 30]
```

### Map Examples
```java
// HashMap
Map<String, Integer> map = new HashMap<>();
map.put("John", 25);
map.put("Jane", 30);
map.get("John");  // Returns 25
map.containsKey("John");  // true
map.containsValue(25);  // true
map.remove("John");

// Iterating Map
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

### Iterator
```java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String item = iterator.next();
    System.out.println(item);
}
```

---

## Generics

### Generic Classes
```java
public class Box<T> {
    private T item;
    
    public void setItem(T item) {
        this.item = item;
    }
    
    public T getItem() {
        return item;
    }
}

// Usage
Box<String> stringBox = new Box<>();
stringBox.setItem("Hello");
String value = stringBox.getItem();

Box<Integer> intBox = new Box<>();
intBox.setItem(100);
```

### Generic Methods
```java
public static <T> void printArray(T[] array) {
    for (T element : array) {
        System.out.println(element);
    }
}

// Usage
Integer[] intArray = {1, 2, 3};
String[] strArray = {"A", "B", "C"};
printArray(intArray);
printArray(strArray);
```

### Bounded Type Parameters
```java
public class NumberBox<T extends Number> {
    private T number;
    
    public double getDoubleValue() {
        return number.doubleValue();
    }
}

// T must be Number or its subclass
```

### Wildcards
```java
// Upper bound: ? extends Number
public void processNumbers(List<? extends Number> numbers) { }

// Lower bound: ? super Integer
public void addNumbers(List<? super Integer> numbers) { }

// Unbounded: ?
public void processList(List<?> list) { }
```

---

## File I/O

### Reading Files
```java
import java.io.*;

// Using FileReader
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### Writing Files
```java
// Using FileWriter
try (FileWriter fw = new FileWriter("output.txt");
     BufferedWriter bw = new BufferedWriter(fw)) {
    bw.write("Hello World");
    bw.newLine();
    bw.write("Second line");
} catch (IOException e) {
    e.printStackTrace();
}
```

### File Operations
```java
File file = new File("example.txt");
file.exists();  // Check if file exists
file.createNewFile();  // Create file
file.delete();  // Delete file
file.length();  // Get file size
file.getName();  // Get file name
```

---

## Multi-threading

### Thread Creation

#### Extending Thread Class
```java
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

// Usage
MyThread thread = new MyThread();
thread.start();
```

#### Implementing Runnable Interface
```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Thread running");
    }
}

// Usage
Thread thread = new Thread(new MyRunnable());
thread.start();
```

### Thread Methods
```java
Thread thread = new Thread(runnable);
thread.start();  // Start thread
thread.sleep(1000);  // Sleep for 1 second
thread.join();  // Wait for thread to complete
thread.getName();  // Get thread name
thread.setPriority(Thread.MAX_PRIORITY);  // Set priority
```

### Synchronization
```java
public class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}
```

### Synchronized Block
```java
public void method() {
    synchronized (this) {
        // Critical section
    }
}
```

---

## Lambda Expressions and Streams

### Lambda Expressions (Java 8+)
```java
// Syntax: (parameters) -> expression

// Before (Anonymous class)
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// After (Lambda)
Runnable r = () -> System.out.println("Hello");

// With parameters
List<String> list = Arrays.asList("A", "B", "C");
list.forEach(item -> System.out.println(item));

// Method reference
list.forEach(System.out::println);
```

### Functional Interfaces
```java
// Predicate: returns boolean
Predicate<Integer> isEven = n -> n % 2 == 0;
isEven.test(4);  // true

// Function: transforms input to output
Function<String, Integer> length = s -> s.length();
length.apply("Hello");  // 5

// Consumer: accepts input, returns void
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello");

// Supplier: provides value
Supplier<String> supplier = () -> "Hello";
supplier.get();  // "Hello"
```

### Streams API
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// Filter: filter even numbers
List<Integer> evens = numbers.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

// Map: transform elements
List<Integer> squares = numbers.stream()
    .map(n -> n * n)
    .collect(Collectors.toList());

// Reduce: aggregate operations
int sum = numbers.stream()
    .reduce(0, (a, b) -> a + b);

// ForEach: iterate
numbers.stream()
    .forEach(System.out::println);

// Collect: collect to collection
List<String> names = Arrays.asList("John", "Jane", "Bob");
Set<String> nameSet = names.stream()
    .collect(Collectors.toSet());
```

---

## Annotations

### Built-in Annotations
```java
@Override  // Indicates method overriding
public void method() { }

@Deprecated  // Marks as deprecated
public void oldMethod() { }

@SuppressWarnings("unchecked")  // Suppress warnings
public void method() { }
```

### Custom Annotations
```java
// Define annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAnnotation {
    String value() default "";
    int count() default 0;
}

// Use annotation
@MyAnnotation(value = "test", count = 5)
public void method() { }
```

### Common Spring Annotations (Preview)
```java
@Component  // Spring component
@Service    // Service layer
@Repository // Data access layer
@Controller // Web controller
@Autowired  // Dependency injection
@RequestMapping // URL mapping
```

---

## String Handling

### String Creation
```java
String str1 = "Hello";  // String literal (pool)
String str2 = new String("Hello");  // New object
```

### String Methods
```java
String str = "Hello World";

str.length();  // 11
str.charAt(0);  // 'H'
str.substring(0, 5);  // "Hello"
str.indexOf("World");  // 6
str.contains("Hello");  // true
str.equals("Hello World");  // true
str.equalsIgnoreCase("hello world");  // true
str.toUpperCase();  // "HELLO WORLD"
str.toLowerCase();  // "hello world"
str.trim();  // Remove leading/trailing spaces
str.replace("World", "Java");  // "Hello Java"
str.split(" ");  // ["Hello", "World"]
```

### StringBuffer and StringBuilder
```java
// StringBuffer (thread-safe, synchronized)
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");
sb.insert(5, ",");
sb.reverse();
String result = sb.toString();

// StringBuilder (not thread-safe, faster)
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
```

### String Comparison
```java
String s1 = "Hello";
String s2 = "Hello";
String s3 = new String("Hello");

s1 == s2;  // true (same reference)
s1 == s3;  // false (different references)
s1.equals(s3);  // true (same content)
```

---

## Wrapper Classes

### Primitive to Wrapper
```java
// Boxing: primitive → wrapper
Integer i = Integer.valueOf(10);
Integer j = 10;  // Auto-boxing

// Unboxing: wrapper → primitive
int k = i.intValue();
int l = i;  // Auto-unboxing
```

### Wrapper Classes
```java
Integer, Long, Short, Byte
Float, Double
Character, Boolean
```

### Common Methods
```java
Integer.parseInt("123");  // String to int
Integer.toString(123);  // int to String
Integer.valueOf("123");  // String to Integer
Integer.max(10, 20);  // 20
Integer.min(10, 20);  // 10
```

---

## Important Concepts for JDBC, JSP, Servlet, Spring Boot

### 1. JDBC Requirements
- **Exception Handling**: SQLException handling
- **Interfaces**: Connection, Statement, PreparedStatement, ResultSet
- **Try-with-Resources**: Automatic resource management
- **Collections**: Storing query results

### 2. JSP Requirements
- **JavaBeans**: POJO classes with getters/setters
- **EL (Expression Language)**: Accessing data
- **JSTL**: Tag libraries
- **String Handling**: Displaying dynamic content

### 3. Servlet Requirements
- **Interfaces**: Servlet, HttpServlet
- **Exception Handling**: ServletException, IOException
- **Collections**: Request/Response handling
- **Annotations**: @WebServlet, @WebFilter

### 4. Spring Boot Requirements
- **Annotations**: @Component, @Service, @Repository, @Controller, @Autowired
- **Interfaces**: Dependency injection
- **Exception Handling**: @ExceptionHandler
- **Lambda Expressions**: Streams for data processing
- **Generics**: Type-safe collections
- **Reflection**: Framework uses reflection for dependency injection

---

## Best Practices

1. **Naming Conventions**
   - Classes: PascalCase (e.g., `StudentClass`)
   - Methods/Variables: camelCase (e.g., `getStudentName`)
   - Constants: UPPER_SNAKE_CASE (e.g., `MAX_SIZE`)
   - Packages: lowercase (e.g., `com.example.util`)

2. **Code Organization**
   - One class per file
   - Package structure: `com.company.project.module`
   - Use meaningful names

3. **Memory Management**
   - Use try-with-resources for I/O
   - Avoid memory leaks (close resources)
   - Use StringBuilder for string concatenation in loops

4. **Exception Handling**
   - Catch specific exceptions first
   - Don't catch and ignore
   - Use finally for cleanup

5. **OOP Principles**
   - Follow SOLID principles
   - Use interfaces for abstraction
   - Prefer composition over inheritance

---

## Quick Reference

### Common Imports
```java
import java.util.*;  // Collections
import java.io.*;   // File I/O
import java.sql.*;   // JDBC
import javax.servlet.*;  // Servlets
import org.springframework.*;  // Spring
```

### Common Patterns
```java
// Singleton Pattern
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

// Factory Pattern
public class Factory {
    public static Object create(String type) {
        if (type.equals("A")) return new TypeA();
        if (type.equals("B")) return new TypeB();
        return null;
    }
}
```

---


- **Spring Boot**: Annotations, dependency injection, interfaces, genericsMaster these concepts to effectively
