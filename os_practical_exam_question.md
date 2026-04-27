# Operating System Practical Exam Questions


---

## Section A: CPU Scheduling Algorithms

*For the following questions, the program should compute the Waiting Time and Turnaround Time for each process, and also calculate the Average Waiting Time and Average Turnaround Time.*

1. Write a program to simulate the **First Come First Serve (FCFS)** CPU scheduling algorithm.
2. Write a program to simulate the **Shortest Job First (SJF)** CPU scheduling algorithm (Non-preemptive).
3. Write a program to simulate the **Round Robin (RR)** CPU scheduling algorithm for a given time quantum.
4. Write a program to simulate the **Priority** CPU scheduling algorithm.

---

## Section B: Process Synchronization & Inter-Process Communication

1. **Producer-Consumer Problem:**
   - Write a program to implement the Producer-Consumer problem using Semaphores and Mutex to avoid race conditions.
2. **Reader-Writer Problem:**
   - Write a program to simulate the Reader-Writer problem where multiple readers can read simultaneously, but a writer requires exclusive access.
3. **Dining Philosophers Problem:**
   - Write a program to simulate the Dining Philosophers problem using Semaphores.

---

## Section C: Deadlocks

1. **Banker's Algorithm:**
   - Write a program to implement **Banker's Algorithm** for Deadlock Avoidance. The program should accept the number of processes, number of resources, Allocation matrix, and Max matrix, and determine whether the system is in a safe state. If safe, output the safe sequence.

---

## Section D: Memory Management & Page Replacement

1. **Memory Allocation Strategies:**
   - Write a program to simulate memory allocation techniques:
     - **First Fit**
     - **Best Fit**
     - **Worst Fit**
2. **Page Replacement Algorithms:**
   - Write a program to simulate the **FIFO (First-In-First-Out)** page replacement algorithm and calculate the total number of page faults for a given reference string.
   - Write a program to simulate the **LRU (Least Recently Used)** page replacement algorithm and calculate the total number of page faults.
   - Write a program to simulate the **Optimal** page replacement algorithm.
