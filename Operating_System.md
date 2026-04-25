# Operating System — Viva Theory Questions

---

## Unit 1: Introduction to Operating Systems

1. What is an Operating System? What is its role?
2. What are the key functions of an Operating System?
3. What are the main components of an Operating System?
4. What is the difference between a Kernel and a Shell?
5. Explain the evolution of Operating Systems generation by generation.
6. What is a Batch Processing System? Give an example.
7. What is a Multiprogramming System? How is it different from batch processing?
8. What is a Time-Sharing Operating System? Give an example.
9. What is a Real-Time Operating System (RTOS)?
10. What is the difference between Hard Real-Time and Soft Real-Time systems?
11. What are the different types of Operating Systems?
12. What are the two main views of an Operating System?
13. Explain the User View of an Operating System.
14. What is a Single User View? Give an example.
15. What is a Multi-User View? How does the OS handle multiple users?
16. What is a Handheld User View?
17. What is an Embedded User View? Give examples.
18. Explain the System View of an Operating System.
19. What is the OS as a Resource Allocator?
20. What is the OS as a Control Program?
21. What services does an Operating System provide?
22. What is Program Execution as an OS service?
23. What is I/O Management as an OS service?
24. What is File System Management?
25. What is Inter-Process Communication (IPC)? What methods are used?
26. What is the difference between Shared Memory and Message Passing?
27. What is a Pipe in IPC?
28. What is Memory Management? Why is it needed?
29. Explain the Memory Hierarchy.
30. What is the difference between Logical Address and Physical Address?
31. What is the role of MMU (Memory Management Unit)?
32. What is First Fit memory allocation strategy?
33. What is Best Fit memory allocation strategy?
34. What is Worst Fit memory allocation strategy?
35. What is Memory Protection? How is it achieved using base and limit registers?
36. What is UNIX? Who created it and when?
37. What is Linux? Who created it and when?
38. What is the difference between UNIX and Linux?
39. Explain the architecture of UNIX/Linux.
40. Explain the UNIX file system hierarchy.
41. What is I/O Management in an Operating System?
42. What is a Device Driver? What is its role?
43. What is Programmed I/O (Polling)? What is its drawback?
44. What is Interrupt-Driven I/O? How is it better than polling?
45. What is DMA (Direct Memory Access)?
46. Compare Programmed I/O, Interrupt-Driven I/O, and DMA.
47. What is Buffering? Why is it used?
48. What is Spooling? Give an example.
49. What is the Convoy Effect in Batch Processing?
50. What are the advantages and disadvantages of Time-Sharing Systems?

---

## Unit 2: Process Management, Threads & CPU Scheduling

### Process Fundamentals

1. What is a Process? How is it different from a Program?
2. What are the components of a Process?
3. What is the Process Control Block (PCB)? What information does it contain?
4. What are the five states of a process?
5. Explain the NEW state of a process.
6. Explain the READY state of a process.
7. Explain the RUNNING state of a process.
8. Explain the WAITING (Blocked) state of a process.
9. Explain the TERMINATED state of a process.
10. What is a Process State Transition? List all transitions.
11. What triggers the transition from RUNNING to WAITING state?
12. Can a process go directly from WAITING to RUNNING? Why or why not?
13. What is Context Switching?
14. What are the steps involved in a Context Switch?
15. Why is Context Switching considered pure overhead?
16. What is the difference between Context Switch and Mode Switch?

### Threads & Multithreading

17. What is a Thread? How is it different from a Process?
18. What resources does a thread have exclusively?
19. What resources do threads share within the same process?
20. What are the benefits of multithreading?
21. What is Responsiveness in the context of multithreading?
22. What is Economy in the context of multithreading?
23. What is Scalability in the context of multithreading?
24. What are User-Level Threads (ULT)?
25. What are Kernel-Level Threads (KLT)?
26. What is the advantage and disadvantage of User-Level Threads?
27. What is the advantage and disadvantage of Kernel-Level Threads?
28. What is the Many-to-One multithreading model?
29. What is the One-to-One multithreading model?
30. What is the Many-to-Many multithreading model?
31. What is the Two-Level (Hybrid) multithreading model?
32. What is Thread Join? What is its purpose?
33. What is Thread Yield?

### CPU Scheduling

34. What is CPU Scheduling? What is its goal?
35. What is a CPU Burst and an I/O Burst?
36. What is the difference between Preemptive and Non-Preemptive Scheduling?
37. What are the scheduling criteria (performance metrics)?
38. Define Turnaround Time. How is it calculated?
39. Define Waiting Time. How is it calculated?
40. Define Response Time. How is it different from Waiting Time?
41. What is Throughput in CPU Scheduling?
42. What is FCFS (First Come First Serve) Scheduling?
43. What is the Convoy Effect in FCFS?
44. What is SJF (Shortest Job First) Scheduling?
45. What is the drawback of SJF Scheduling?
46. What is Starvation in CPU Scheduling?
47. What is SRTF (Shortest Remaining Time First)?
48. What is Priority Scheduling?
49. What is Aging? What problem does it solve?
50. What is Round Robin (RR) Scheduling?
51. What happens if the time quantum is too large in Round Robin?
52. What happens if the time quantum is too small in Round Robin?
53. What is Multilevel Queue Scheduling?
54. What is Multilevel Feedback Queue Scheduling?
55. What is HRRN (Highest Response Ratio Next)? What formula is used?
56. Which scheduling algorithm gives minimum average waiting time?

### Process Synchronization

57. What is Process Synchronization?
58. What is a Race Condition?
59. What is a Critical Section?
60. What are the four conditions for solving the Critical Section Problem?
61. What is Mutual Exclusion?
62. What is the Progress condition in synchronization?
63. What is Bounded Waiting?
64. What is Strict Alternation (Turn Variable) algorithm?
65. What is Peterson's Solution? For how many processes does it work?
66. How does Peterson's Solution satisfy Mutual Exclusion?

### Semaphores

67. What is a Semaphore?
68. What are the two atomic operations on a Semaphore?
69. What is the wait() (P) operation?
70. What is the signal() (V) operation?
71. What is a Binary Semaphore (Mutex)?
72. What is a Counting Semaphore?
73. What is the difference between Binary and Counting Semaphore?
74. What is Busy Waiting? Why is it inefficient?
75. What is the Producer-Consumer Problem?
76. How do semaphores solve the Producer-Consumer Problem?
77. What is the Dining Philosophers Problem?
78. What is the Deadlock scenario in the Dining Philosophers Problem?
79. What are Monitors?
80. What is Message Passing?

---

## Unit 3: Deadlock

1. What is a Deadlock?
2. Give a real-life analogy of Deadlock.
3. What are the four necessary conditions for Deadlock (Coffman Conditions)?
4. What is Mutual Exclusion as a deadlock condition?
5. What is Hold and Wait as a deadlock condition?
6. What is No Preemption as a deadlock condition?
7. What is Circular Wait as a deadlock condition?
8. What is a Resource Allocation Graph (RAG)?
9. What are the components of a RAG?
10. What is a Request Edge and an Assignment Edge in a RAG?
11. If there is no cycle in a RAG, what can you conclude?
12. If there is a cycle in a RAG with single instances, what can you conclude?
13. What is the difference between Deadlock and Starvation?
14. What is Livelock?
15. What are the three steps of resource usage by a process?
16. What are the four strategies to handle Deadlock?

### Deadlock Detection & Recovery

17. What is Deadlock Detection?
18. What is a Wait-for Graph? When is it used?
19. How is deadlock detected using a Wait-for Graph?
20. What algorithm is used for deadlock detection with multiple resource instances?
21. What data structures are used in the detection algorithm?
22. When should the Deadlock Detection Algorithm be invoked?
23. What are the two approaches for Deadlock Recovery?
24. What is the "Abort All Deadlocked Processes" recovery method?
25. What is the "Abort One Process at a Time" recovery method?
26. What criteria are used to select which process to abort?
27. What is Resource Preemption in deadlock recovery?
28. What is Rollback in resource preemption?
29. What is Total Rollback vs Partial Rollback?
30. What is the starvation problem in resource preemption? How is it prevented?

### Deadlock Avoidance

31. What is Deadlock Avoidance?
32. What is a Safe State?
33. What is an Unsafe State?
34. Is an Unsafe State the same as a Deadlock?
35. What is a Safe Sequence?
36. What is Banker's Algorithm?
37. What is the formula for Need in Banker's Algorithm?
38. What are the data structures used in Banker's Algorithm?
39. What are the steps of the Safety Algorithm in Banker's?
40. What are the steps of the Resource Request Algorithm in Banker's?
41. Why is Banker's Algorithm not practical in real systems?

### Deadlock Prevention

42. What is Deadlock Prevention?
43. How can Mutual Exclusion be broken to prevent deadlock?
44. How can Hold and Wait be broken to prevent deadlock?
45. How can No Preemption be broken to prevent deadlock?
46. How can Circular Wait be broken to prevent deadlock?
47. What is Resource Ordering? How does it prevent circular wait?
48. Which deadlock prevention method is most practical and why?
49. What is the Ostrich Algorithm (Deadlock Ignorance)?
50. Why do modern Operating Systems like UNIX and Windows use the Ostrich Algorithm?
51. Compare Deadlock Prevention, Avoidance, Detection, and Ignorance.

---

## Unit 4: Memory Management

### Fixed Partitions & Paging

1. What is Multiprogramming?
2. What is Fixed Partition Memory Management?
3. What is Internal Fragmentation?
4. What is External Fragmentation?
5. What is the difference between Internal and External Fragmentation?
6. What is Paging?
7. What is a Frame in physical memory?
8. What is a Page in logical memory?
9. What is a Page Table?
10. What is the structure of a Logical Address in paging?
11. How is address translation done in paging?
12. What is the formula to find Physical Address from a Logical Address?
13. Does paging suffer from Internal or External Fragmentation?
14. What are the advantages of paging?
15. What are the disadvantages of paging?
16. What is Page Allocation?
17. What is TLB (Translation Lookaside Buffer)?
18. How does TLB improve paging performance?

### Segmentation

19. What is Segmentation?
20. What is the difference between Paging and Segmentation?
21. What is a Segment Table?
22. What are the two fields in a Segment Table entry?
23. What is the structure of a Logical Address in Segmentation?
24. What is a Segmentation Fault?
25. How is address translation done in Segmentation?
26. What are the advantages of Segmentation?
27. What are the disadvantages of Segmentation?
28. What is Segmented Paging?

### Swapping & Virtual Memory

29. What is Swapping?
30. What is Virtual Memory?
31. What is the key idea behind Virtual Memory?
32. What is Demand Paging?
33. What is a Page Fault?
34. What are the steps of Page Fault Handling?
35. What is the Valid-Invalid Bit in a page table entry?
36. What is Pure Demand Paging?
37. What is Prepaging?
38. What is Copy-on-Write (COW)?
39. How does COW make fork() faster?
40. What is a Memory-Mapped File?

### Page Replacement Algorithms

41. Why is Page Replacement needed?
42. What is the goal of a Page Replacement Algorithm?
43. What is FIFO Page Replacement?
44. What is Belady's Anomaly?
45. Which algorithm suffers from Belady's Anomaly?
46. What is Optimal (OPT/MIN) Page Replacement?
47. Why can't Optimal Page Replacement be implemented in practice?
48. What is LRU (Least Recently Used) Page Replacement?
49. What is MRU (Most Recently Used) Page Replacement?
50. When is MRU better than LRU?
51. Compare FIFO, Optimal, LRU, and MRU page replacement algorithms.
52. Which page replacement algorithm gives minimum page faults?
53. What are the implementation methods of LRU?

### Thrashing & Locality

54. What is Thrashing?
55. What causes Thrashing?
56. How does adding more processes lead to Thrashing?
57. What is the Working Set Model?
58. What is a Working Set Window?
59. How does the Working Set Model prevent Thrashing?
60. What is Page Fault Frequency (PFF)?
61. How is PFF used to control Thrashing?
62. What is Local Replacement and how does it help with Thrashing?
63. What is the Principle of Locality?
64. What is Spatial Locality?
65. What is Temporal Locality?

---

## Unit 5: Unix/Linux Operating System

1. What is UNIX? Who created it and where?
2. In which programming language was UNIX written? Why is this significant?
3. What is the architecture of UNIX?
4. What is the role of the Shell in UNIX?
5. What is the role of the Kernel in UNIX?
6. What is the key concept "Everything in Unix is treated as a file"?
7. Explain the UNIX File System Hierarchy.
8. What is the purpose of the `/bin` directory in UNIX?
9. What is the purpose of the `/etc` directory?
10. What is the purpose of the `/home` directory?
11. What is the purpose of the `/dev` directory?
12. What is the purpose of the `/tmp` directory?
13. What is Linux? Who created it and when?
14. What is the difference between Linux and UNIX?
15. What is GNU/Linux?
16. Name five popular Linux distributions and their use cases.
17. What is Ubuntu used for?
18. What is Kali Linux used for?
19. What are the features of UNIX/Linux?
20. What does Multi-user mean in UNIX/Linux?
21. What does Multitasking mean in UNIX/Linux?
22. Why is UNIX/Linux called portable?
23. How does UNIX/Linux provide security?
24. What is Shell Scripting? What is its use?
25. What are the disadvantages of UNIX/Linux?
26. Why is UNIX/Linux considered not user-friendly?

### Unix/Linux Commands

27. What is the `ls` command? What does `ls -l` do?
28. What is the `pwd` command?
29. What is the `cd` command?
30. What is the `mkdir` command?
31. What is the `rmdir` command?
32. What is the `touch` command?
33. What is the `cat` command?
34. What is the `cp` command?
35. What is the `mv` command?
36. What is the `rm` command?
37. What is the `kill` command?
38. What is the `top` command?
39. What is the `grep` command? Give an example.
40. What is the `find` command?
41. What is the `man` command?
42. What is the `who` command?
43. What is the `head` command?
44. What is the `tail` command?
45. What is the `echo` command?
46. What is the `date` command?

---

