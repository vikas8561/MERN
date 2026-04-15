# Operating System - Viva Questions

---

## Unit 1: Introduction to Operating Systems (Q1–Q38)

### OS Fundamentals & Evolution

**Q1.** What is an operating system? Explain its primary role in a computer system.

**Q2.** Name the three main objectives of an operating system.

**Q3.** What is the difference between system software and application software?

**Q4.** Explain the evolution of operating systems from Generation 0 to Generation 4.

**Q5.** What were the limitations of early batch processing systems?

**Q6.** How did multiprogramming improve CPU utilization over simple batch systems?

**Q7.** What is time-sharing? How does it differ from multiprogramming?

**Q8.** What is the kernel of an operating system? Why is it called the core?

### OS Services

**Q9.** List and explain any five services provided by an operating system.

**Q10.** What is the difference between user interface and system calls?

**Q11.** Explain the role of the OS in file management.

**Q12.** What is inter-process communication (IPC)? Name two methods of IPC.

**Q13.** What is the purpose of the accounting service in an operating system?

**Q14.** How does an OS provide error detection and handling?

**Q15.** What is the role of protection and security services in an OS?

### Types of Operating Systems

**Q16.** Differentiate between batch OS and time-sharing OS.

**Q17.** What is a real-time operating system? Give two examples.

**Q18.** Differentiate between hard real-time and soft real-time operating systems.

**Q19.** What is a distributed operating system? State its advantages.

**Q20.** What is an embedded operating system? Where is it used?

**Q21.** Explain the concept of a network operating system.

### OS Concepts & Views

**Q22.** Explain the user view and system view of an operating system.

**Q23.** What is a process? How is it different from a program?

**Q24.** Define the Process Control Block (PCB) and list its contents.

**Q25.** Explain the five states of a process with a state diagram.

**Q26.** What is context switching? Why is it considered pure overhead?

**Q27.** What is a system call? Give examples of system calls for file operations.

### Memory & I/O Management Basics

**Q28.** Differentiate between logical address and physical address.

**Q29.** What is the role of the Memory Management Unit (MMU)?

**Q30.** Explain the three memory allocation strategies: First Fit, Best Fit, and Worst Fit.

**Q31.** What is programmed I/O (polling)? What is its main disadvantage?

**Q32.** Explain interrupt-driven I/O. How is it better than polling?

**Q33.** What is Direct Memory Access (DMA)? When is it used?

**Q34.** Differentiate between buffering and spooling in I/O management.

**Q35.** What is caching? How does it improve system performance?

### Linux & UNIX

**Q36.** Differentiate between Linux and UNIX operating systems.

**Q37.** What is the significance of Linux being open source?

**Q38.** Name the key components of the Linux operating system architecture.

---

## Unit 2: Process Management & Synchronization (Q39–Q88)

### Process Fundamentals

**Q39.** Explain the difference between a process and a thread.

**Q40.** What are the different states of a process? Draw the state transition diagram.

**Q41.** What information is stored in a Process Control Block (PCB)?

**Q42.** What happens during a context switch between two processes?

**Q43.** Explain the difference between preemptive and non-preemptive scheduling.

### Threads & Multithreading

**Q44.** What is a thread? Why are threads called lightweight processes?

**Q45.** List the resources that are shared between threads of the same process.

**Q46.** What resource is NOT shared between threads? Why?

**Q47.** Explain the Many-to-One multithreading model. What is its limitation?

**Q48.** What is the One-to-One multithreading model? Give an example OS that uses it.

**Q49.** Explain the Many-to-Many multithreading model and its advantage.

**Q50.** What are the benefits of multithreading in a system?

### CPU Scheduling

**Q51.** What is CPU scheduling? Why is it necessary?

**Q52.** Define the following scheduling criteria: CPU utilization, throughput, turnaround time, waiting time, and response time.

**Q53.** What is the formula for Turnaround Time and Waiting Time?

**Q54.** Explain the First Come First Served (FCFS) scheduling algorithm with an example.

**Q55.** What is the Convoy Effect? Which scheduling algorithm suffers from it?

**Q56.** Explain Shortest Job First (SJF) scheduling. Why does it give minimum average waiting time?

**Q57.** Differentiate between preemptive SJF (SRTF) and non-preemptive SJF.

**Q58.** What is Round Robin scheduling? How does the time quantum affect performance?

**Q59.** What happens when Round Robin uses a very large time quantum?

**Q60.** What happens when Round Robin uses a very small time quantum?

**Q61.** Explain Priority Scheduling. What is the starvation problem in it?

**Q62.** What is Aging? How does it solve the starvation problem?

**Q63.** Compare FCFS, SJF, Round Robin, and Priority scheduling algorithms.

### Process Synchronization

**Q64.** What is the critical section problem? State the three requirements for its solution.

**Q65.** Define mutual exclusion, progress, and bounded waiting conditions.

**Q66.** What is a race condition? Give an example.

**Q67.** Explain Peterson's solution for the critical section problem.

**Q68.** What is the purpose of the turn variable and flag array in Peterson's solution?

**Q69.** Why does Peterson's solution only work for two processes?

### Semaphores

**Q70.** What is a semaphore? Explain the wait() and signal() operations.

**Q71.** Differentiate between binary semaphore and counting semaphore.

**Q72.** How is the Producer-Consumer problem solved using semaphores?

**Q73.** What are the initial values of empty, full, and mutex semaphores in the Producer-Consumer problem?

**Q74.** What happens if the order of wait() operations is reversed in Producer-Consumer?

### Classical Problems

**Q75.** Explain the Readers-Writers problem. What are the two variations?

**Q76.** In the first Readers-Writers solution, why can writers get starved?

**Q77.** What role does the readcount variable play in the Readers-Writers solution?

**Q78.** Explain the Dining Philosophers problem. Why can deadlock occur?

**Q79.** Name three solutions to prevent deadlock in the Dining Philosophers problem.

### Hardware Solutions & Advanced Synchronization

**Q80.** How does disabling interrupts solve the critical section problem? What are its drawbacks?

**Q81.** Explain the Test-and-Set Lock (TSL) instruction. Is bounded waiting guaranteed?

**Q82.** Explain the Compare-and-Swap (CAS) instruction with pseudocode.

**Q83.** What is a monitor? How does it differ from a semaphore?

**Q84.** Explain condition variables in monitors with wait() and signal() operations.

**Q85.** Differentiate between Hoare semantics and Mesa semantics for monitors.

**Q86.** What is message passing? Differentiate between direct and indirect communication.

**Q87.** Explain blocking (synchronous) and non-blocking (asynchronous) message passing.

**Q88.** What is an event counter? List its three operations: read(), advance(), and await().

---

## Unit 3: Deadlock (Q89–Q118)

### Deadlock Fundamentals

**Q89.** Define deadlock. Give a real-life analogy.

**Q90.** State and explain the four necessary conditions for deadlock (Coffman conditions).

**Q91.** Can deadlock occur if any one of the four conditions does not hold? Why or why not?

**Q92.** Explain the system model for resource usage: Request → Use → Release.

**Q93.** Differentiate between deadlock, starvation, and livelock.

### Resource Allocation Graph

**Q94.** What is a Resource Allocation Graph (RAG)? Explain its components.

**Q95.** What is a request edge and an assignment edge in a RAG?

**Q96.** If there is no cycle in a RAG, can deadlock exist? Why?

**Q97.** If a cycle exists in a RAG with single-instance resources, what does it confirm?

**Q98.** If a cycle exists in a RAG with multiple-instance resources, can we confirm deadlock?

### Deadlock Detection & Recovery

**Q99.** What is the Wait-for Graph? How is it used for deadlock detection?

**Q100.** Explain the deadlock detection algorithm for multiple-instance resources.

**Q101.** What is the time complexity of cycle detection in a wait-for graph?

**Q102.** When should the deadlock detection algorithm be invoked? List three strategies.

**Q103.** What are the two approaches for deadlock recovery using process termination?

**Q104.** Compare aborting all deadlocked processes vs. aborting one at a time.

**Q105.** List the criteria used for selecting a victim process during deadlock recovery.

**Q106.** Explain resource preemption as a deadlock recovery method.

**Q107.** What is rollback? Differentiate between total rollback and partial rollback.

**Q108.** How can starvation be prevented during resource preemption?

### Deadlock Avoidance

**Q109.** What is deadlock avoidance? What information does it require?

**Q110.** Differentiate between a safe state and an unsafe state.

**Q111.** Does an unsafe state always lead to deadlock? Explain.

**Q112.** Explain the Banker's Algorithm for a single resource type with an example.

**Q113.** Write the steps of the Safety Algorithm used in Banker's Algorithm.

**Q114.** Explain the Resource Request Algorithm used in Banker's Algorithm.

**Q115.** Why is the Banker's Algorithm not practical for real systems?

### Deadlock Prevention & Ignorance

**Q116.** Explain how each of the four necessary conditions can be broken to prevent deadlock.

**Q117.** Why is breaking mutual exclusion impractical for most resources?

**Q118.** Explain the two methods to break the Hold and Wait condition.

**Q119.** How can the No Preemption condition be broken? For which resources is it applicable?

**Q120.** Explain how resource ordering breaks the Circular Wait condition with an example.

**Q121.** Which deadlock prevention method is the most practical? Why?

**Q122.** What is the Ostrich Algorithm? Why do modern OS like Linux and Windows use it?

**Q123.** Compare deadlock prevention, avoidance, detection, and ignorance.

---

## Unit 4: Memory Management (Q124–Q150)

### Fixed Partitions & Fragmentation

**Q124.** What is multiprogramming with fixed partitions? Explain its two types.

**Q125.** Differentiate between internal fragmentation and external fragmentation.

**Q126.** Which fragmentation occurs in fixed partitions? Give an example.

### Paging

**Q127.** What is paging? Explain the concepts of pages and frames.

**Q128.** What is the structure of a logical address in paging?

**Q129.** Explain the address translation process in paging step by step.

**Q130.** What is a page table? Where is it stored?

**Q131.** What is the average internal fragmentation in paging?

**Q132.** Does paging eliminate external fragmentation? Why?

### Page Allocation & Hardware Support

**Q133.** Differentiate between equal allocation and proportional allocation of frames.

**Q134.** Explain the formula for proportional allocation with an example.

**Q135.** Differentiate between local replacement and global replacement policies.

**Q136.** What is the Translation Look-aside Buffer (TLB)? Why is it needed?

**Q137.** Write the formula for Effective Access Time (EAT) with TLB.

**Q138.** What is the difference between a TLB hit and a TLB miss?

**Q139.** Explain hierarchical (multi-level) paging. Why is it needed?

**Q140.** What is an inverted page table? How does it save memory?

### Segmentation

**Q141.** What is segmentation? How does it support the user's view of memory?

**Q142.** What are the two fields in a segment table entry?

**Q143.** Explain the address translation in segmentation with the formula.

**Q144.** What is a segmentation fault? When does it occur?

**Q145.** Compare paging and segmentation across at least five parameters.

### Swapping & Virtual Memory

**Q146.** What is swapping? Explain swap-in and swap-out operations.

**Q147.** Write the formula for calculating swap time.

**Q148.** What is virtual memory? How does it allow programs larger than physical memory to run?

**Q149.** Explain demand paging and the concept of lazy loading.

**Q150.** What is the valid-invalid bit in a page table? What happens on a page fault?

**Q151.** Explain the page fault handling procedure step by step.

**Q152.** What is pure demand paging? How does the page fault rate change over time?

**Q153.** What is Copy-on-Write (COW)? How does it make fork() efficient?

### Page Replacement & Thrashing

**Q154.** Why is page replacement needed? List the goals of a page replacement algorithm.

**Q155.** Explain the FIFO page replacement algorithm with an example.

**Q156.** What is Belady's Anomaly? Which algorithm suffers from it?

**Q157.** Explain the Optimal (MIN) page replacement algorithm. Why is it impractical?

**Q158.** Explain the LRU page replacement algorithm. Does it suffer from Belady's Anomaly?

**Q159.** What are the two implementation methods for LRU (counter and stack)?

**Q160.** What is the MRU algorithm? For which access pattern does it outperform LRU?

**Q161.** Compare FIFO, Optimal, LRU, and MRU algorithms in a table.

**Q162.** Write the EAT formula for demand paging. Why must the page fault rate be very low?

**Q163.** What is thrashing? What causes it and what are its effects on CPU utilization?

**Q164.** What is the Working Set Model? How does it prevent thrashing?

**Q165.** Explain the Page Fault Frequency (PFF) method for preventing thrashing.

**Q166.** Differentiate between temporal locality and spatial locality with examples.

**Q167.** How does good locality of reference reduce page faults?

---

