# Operating System — Viva Theory Questions

---

## 📘 UNIT 1 — Introduction to Operating Systems

### 🔹 Basic Concepts

1. What is an Operating System? Why is it needed?
2. What are the main goals of an Operating System?
3. What is the difference between a program and a process?
4. What is the difference between system software and application software?
5. What is a kernel? What are its responsibilities?
6. What is the difference between kernel mode and user mode?
7. What is a system call? Give two examples.
8. What is the difference between a monolithic kernel and a microkernel?
9. What is a shell? What is its role in an OS?
10. What is bootstrapping or booting in an operating system?

### 🔹 Evolution of OS

11. How has the operating system evolved from generation to generation?
12. What were the limitations of first-generation operating systems?
13. What was the significance of the second-generation OS? What technology did it use?
14. What major features were introduced in the third generation of operating systems?
15. What is multiprogramming? How is it different from multitasking?
16. What is spooling? How did it improve OS efficiency?
17. What improvements came with the fourth generation of operating systems?

### 🔹 OS Services

18. List at least five services provided by an Operating System.
19. What is the role of the OS in file management?
20. What is the role of the OS in error detection and handling?
21. What is the role of the OS in protection and security?
22. How does the OS manage communication between processes?
23. What is resource allocation and how does the OS handle it?
24. What is accounting in the context of OS services?

### 🔹 Types of OS

25. What is a Batch Processing Operating System? Give an example.
26. What are the advantages and disadvantages of batch processing OS?
27. What is a Time-Sharing Operating System? How is it different from batch OS?
28. What are the advantages of time-sharing operating systems?
29. What is a Real-Time Operating System (RTOS)?
30. What is the difference between Hard Real-Time and Soft Real-Time OS?
31. Give two real-world examples of Hard Real-Time OS applications.
32. Give two real-world examples of Soft Real-Time OS applications.
33. What is a Distributed Operating System?
34. What is a Network Operating System?
35. What is an Embedded Operating System? Give examples.

### 🔹 Views of OS

36. How is the OS viewed as an extended machine (abstract machine)?
37. How is the OS viewed as a resource manager?
38. What is the difference between the user's view and the system's view of an OS?

### 🔹 Memory Management (Introduction)

39. What is the basic role of the OS in memory management?
40. What is address binding? When can it occur?
41. What is the difference between logical and physical address space?
42. What is dynamic loading?
43. What is dynamic linking?

### 🔹 I/O Management

44. What is the role of the OS in Input/Output management?
45. What is a device driver? Why is it needed?
46. What is the difference between programmed I/O, interrupt-driven I/O, and DMA?
47. What is DMA (Direct Memory Access)? What is its advantage?
48. What is buffering in I/O management?
49. What is caching in the context of I/O?
50. What is spooling and how does it relate to I/O management?

### 🔹 Linux Operating System

51. What is Linux? Who developed it and when?
52. What is the Linux kernel? How is it different from the Linux OS?
53. What are the main features of the Linux operating system?
54. What is a Linux distribution? Give three examples.
55. What is the role of the GNU project in Linux?
56. What makes Linux open-source? What license does it use?
57. What is the difference between Linux and Windows as operating systems?

### 🔹 Unix Operating System

58. What is Unix? Where and when was it developed?
59. What are the main features of the Unix operating system?
60. What is the architecture of the Unix operating system?
61. What is the difference between Unix and Linux?
62. What languages are used to write Unix?
63. What is the role of the shell in Unix?
64. What are the different types of shells available in Unix/Linux?

---

## 📘 UNIT 2 — Process Management & Communication

### 🔹 Process

65. What is a process? How is it different from a program?
66. What are the different components of a process in memory?
67. What is the Process Control Block (PCB)? What information does it store?
68. What are the different states of a process? Explain each state.
69. Draw and explain the process state transition diagram.
70. What is a context switch? Why does it happen?
71. What is the cost of a context switch?
72. What is process creation? What system call is used in Unix/Linux?
73. What happens during a fork() system call?
74. What is the difference between fork() and exec()?
75. What is an orphan process?
76. What is a zombie process?
77. What is process termination? What are the ways a process can be terminated?

### 🔹 Threads

78. What is a thread? How is it different from a process?
79. Why are threads called lightweight processes?
80. What resources are shared between threads of the same process?
81. What resources are NOT shared between threads?
82. What are the advantages of multithreading?
83. What are the disadvantages of multithreading?
84. What is a user-level thread? What are its advantages and disadvantages?
85. What is a kernel-level thread? What are its advantages and disadvantages?
86. What are the differences between user-level threads and kernel-level threads?
87. What is a green thread?
88. What is the many-to-one threading model?
89. What is the one-to-one threading model?
90. What is the many-to-many threading model?
91. What is multithreading? Give a real-world example.

### 🔹 Scheduling

92. What is CPU scheduling? Why is it needed?
93. What is the difference between preemptive and non-preemptive scheduling?
94. What are the criteria used to evaluate a scheduling algorithm?
95. What is CPU burst time and I/O burst time?
96. Explain the First Come First Served (FCFS) scheduling algorithm with example.
97. What are the disadvantages of FCFS scheduling?
98. What is the convoy effect in FCFS scheduling?
99. Explain the Shortest Job First (SJF) scheduling algorithm.
100. What is the difference between preemptive SJF and non-preemptive SJF?
101. What is the Shortest Remaining Time First (SRTF) algorithm?
102. Explain Round Robin scheduling. What is a time quantum?
103. What happens if the time quantum in Round Robin is too large or too small?
104. Explain Priority Scheduling. What is starvation and how is it solved?
105. What is aging in scheduling? Why is it used?
106. What is Multilevel Queue Scheduling?
107. What is Multilevel Feedback Queue Scheduling?
108. What is the dispatcher? What is dispatch latency?
109. What is throughput in CPU scheduling?
110. What is turnaround time and how is it calculated?
111. What is waiting time in scheduling?
112. What is response time in scheduling?

### 🔹 Race Condition & Critical Section

113. What is a race condition? Give an example.
114. What is the critical section problem?
115. What are the three requirements that a solution to the critical section problem must satisfy?
116. What is mutual exclusion?
117. What is the progress condition in the critical section problem?
118. What is the bounded waiting condition in the critical section problem?
119. What is a lock? How is it used for mutual exclusion?
120. What is busy waiting (spin lock)? What are its drawbacks?

### 🔹 Synchronization Solutions

121. What is the hardware solution to the critical section problem?
122. What is the Test-and-Set instruction? How does it ensure mutual exclusion?
123. What is the Compare-and-Swap instruction?
124. Explain Strict Alternation for mutual exclusion. What is its problem?
125. Explain Peterson's Solution. What variables does it use?
126. Does Peterson's Solution satisfy all three critical section requirements? Explain.
127. What is a semaphore? Who introduced it?
128. What is the difference between a counting semaphore and a binary semaphore?
129. What are the wait() and signal() operations on a semaphore?
130. What is a mutex lock?
131. What is the difference between a mutex and a semaphore?
132. What are event counters? How are they used in synchronization?
133. What is a monitor? What are its advantages over semaphores?
134. What are condition variables in a monitor?
135. What is message passing? What are its two operations?
136. What is the difference between synchronous and asynchronous message passing?
137. What is a mailbox in message passing?

### 🔹 Classical IPC Problems

138. What is the Producer-Consumer (Bounded Buffer) problem? State the problem clearly.
139. How is the Producer-Consumer problem solved using semaphores?
140. What are the three semaphores used in the Producer-Consumer solution?
141. What is the Readers-Writers problem? State the problem clearly.
142. What is the First Readers-Writers problem?
143. What is the Second Readers-Writers problem?
144. What is writer starvation in the Readers-Writers problem?
145. What is the Dining Philosophers problem? Why was it introduced?
146. What does each philosopher and each fork represent in the Dining Philosophers problem?
147. What is the deadlock scenario in the Dining Philosophers problem?
148. How can the Dining Philosophers problem be solved?
149. What is the Sleeping Barber problem?

---

## 📘 UNIT 3 — Deadlock

### 🔹 Deadlock Fundamentals

150. What is a deadlock? Give a real-world analogy.
151. What are the four necessary conditions for a deadlock to occur?
152. Explain the Mutual Exclusion condition for deadlock.
153. Explain the Hold and Wait condition for deadlock.
154. Explain the No Preemption condition for deadlock.
155. Explain the Circular Wait condition for deadlock.
156. Are all four conditions individually sufficient for deadlock? Explain.
157. What is a Resource Allocation Graph (RAG)?
158. How do you detect a deadlock using a Resource Allocation Graph?
159. What is a cycle in a Resource Allocation Graph? Does it always mean deadlock?

### 🔹 Deadlock Characterization

160. What is the difference between deadlock detection, prevention, avoidance, and ignorance?
161. When is deadlock detection used in practice?
162. What algorithm is used for deadlock detection with single instance resources?
163. What algorithm is used for deadlock detection with multiple instance resources?
164. How often should the deadlock detection algorithm be run?

### 🔹 Deadlock Recovery

165. What are the two main methods of deadlock recovery?
166. What is process termination in deadlock recovery? What are the two strategies?
167. What is resource preemption in deadlock recovery?
168. What is rollback in deadlock recovery?
169. What is starvation in the context of deadlock recovery?

### 🔹 Deadlock Avoidance

170. What is deadlock avoidance? How is it different from prevention?
171. What is a safe state? What is an unsafe state?
172. Does an unsafe state always lead to deadlock? Explain.
173. What is the Banker's Algorithm? Who proposed it?
174. What data structures are used in the Banker's Algorithm?
175. Explain the Need matrix in the Banker's Algorithm.
176. Explain the Available vector in the Banker's Algorithm.
177. What is the safety algorithm in the Banker's Algorithm?
178. What is the resource request algorithm in the Banker's Algorithm?
179. What are the limitations of the Banker's Algorithm?
180. Explain the Banker's Algorithm for multiple resource types.
181. How does the Banker's Algorithm differ for single vs. multiple resource types?

### 🔹 Deadlock Prevention

182. What is deadlock prevention?
183. How is the Mutual Exclusion condition eliminated to prevent deadlock?
184. How is the Hold and Wait condition eliminated to prevent deadlock?
185. How is the No Preemption condition eliminated to prevent deadlock?
186. How is the Circular Wait condition eliminated to prevent deadlock?
187. What are the practical disadvantages of deadlock prevention strategies?

### 🔹 Deadlock Ignorance

188. What is the Ostrich Algorithm?
189. Why do most practical operating systems like Windows and Linux use deadlock ignorance?
190. What are the trade-offs involved in choosing to ignore deadlocks?

---

## 📘 UNIT 4 — Memory Management

### 🔹 Paging

191. What is paging in memory management?
192. What is a page? What is a frame?
193. What is a page table? What does it store?
194. How is a logical address translated to a physical address in paging?
195. What is the page offset? How is it calculated?
196. What is internal fragmentation in paging?
197. What is external fragmentation? Does paging suffer from it?
198. What is the Translation Lookaside Buffer (TLB)?
199. What is a TLB hit and a TLB miss?
200. What is the effective memory access time with TLB?
201. What is a multi-level page table? Why is it needed?
202. What is an inverted page table?
203. What is hardware support for paging? What is the page table base register (PTBR)?
204. What is page allocation? What are the methods of page allocation?
205. What is equal allocation vs. proportional allocation of frames?

### 🔹 Multiprogramming with Fixed Partitions

206. What is multiprogramming with fixed partitions?
207. What is a partition in memory management?
208. What is internal fragmentation in fixed partition scheme?
209. What are the limitations of fixed partition multiprogramming?
210. What is the difference between fixed and dynamic partitioning?
211. What is compaction? When is it used?

### 🔹 Segmentation

212. What is segmentation in memory management?
213. What is a segment? How is it different from a page?
214. What is a segment table? What does each entry contain?
215. How is a logical address translated in segmentation?
216. What is external fragmentation in segmentation?
217. What are the advantages of segmentation over paging?
218. What is segmentation with paging? Why is it used?

### 🔹 Swapping

219. What is swapping in memory management?
220. What is the difference between swapping and paging?
221. What is swap space?
222. What are the conditions required for swapping to work?
223. What are the performance implications of swapping?

### 🔹 Virtual Memory

224. What is virtual memory? Why is it needed?
225. What is the concept of demand paging?
226. What is a page fault? What happens when a page fault occurs?
227. What is the page fault rate? How does it affect system performance?
228. What is the effective access time (EAT) in demand paging?
229. What is pure demand paging?
230. What is prepaging?
231. What is the working set model?
232. What is the working set size?
233. How does the working set model help prevent thrashing?

### 🔹 Page Replacement Algorithms

234. Why are page replacement algorithms needed?
235. Explain the FIFO page replacement algorithm with an example.
236. What is Belady's Anomaly? Which algorithm suffers from it?
237. Explain the Optimal (OPT) page replacement algorithm.
238. Why can't the Optimal algorithm be implemented in practice?
239. Explain the Least Recently Used (LRU) page replacement algorithm.
240. What are the implementation methods for LRU?
241. What is the Second Chance (Clock) page replacement algorithm?
242. What is the difference between LRU and LFU (Least Frequently Used)?
243. How do you compare page replacement algorithms?
244. What is the reference string in page replacement?

### 🔹 Thrashing & Locality

245. What is thrashing? How does it occur?
246. What is the cause of thrashing in a multiprogrammed system?
247. How can thrashing be detected?
248. How can thrashing be prevented or controlled?
249. What is the principle of locality?
250. What is temporal locality? Give an example.
251. What is spatial locality? Give an example.
252. How does the principle of locality support demand paging efficiency?

---

## 📘 UNIT 5 — Unix/Linux Operating System & File System

### 🔹 Introduction to Unix File System

253. What is the Unix file system? What is its structure?
254. What is the root directory in Unix? What is its significance?
255. What are the key directories in the Unix file system and their purpose?
256. What is an inode in Unix? What information does it store?
257. What is the difference between a hard link and a soft (symbolic) link?
258. What are the types of files in Unix?
259. What is a regular file in Unix?
260. What is a directory file in Unix?
261. What is a device file in Unix? What is the difference between block and character device files?
262. What is a pipe file in Unix?
263. What is file permissions in Unix? Explain read, write, and execute permissions.
264. What does rwxr-xr-- mean in Unix file permissions?
265. What is the permission for owner, group, and others in Unix?
266. What is the umask in Unix?
267. What is the superuser (root) in Unix?

### 🔹 Introduction to Linux File Structure

268. What is the Linux file system hierarchy?
269. What is the purpose of the /bin directory in Linux?
270. What is the purpose of the /sbin directory in Linux?
271. What is stored in the /etc directory in Linux?
272. What is stored in the /home directory in Linux?
273. What is the purpose of the /dev directory in Linux?
274. What is the purpose of the /proc directory in Linux?
275. What is stored in the /tmp directory in Linux?
276. What is the purpose of the /usr directory in Linux?
277. What is stored in the /var directory in Linux?
278. What is the purpose of the /lib directory in Linux?
279. What is the purpose of the /boot directory in Linux?
280. What is the purpose of the /mnt and /media directories in Linux?
281. What is the difference between absolute path and relative path in Linux?

### 🔹 Unix/Linux Commands

282. What does the `ls` command do? What are its common options?
283. What does the `ls -l` command output show?
284. What does the `ls -a` command show?
285. What is the `pwd` command used for?
286. What does the `cd` command do? What is `cd ..` and `cd ~`?
287. What does the `mkdir` command do?
288. What does the `rmdir` command do? When does it fail?
289. What does the `rm` command do? What is the `-r` option used for?
290. What does the `cp` command do?
291. What does the `mv` command do?
292. What does the `cat` command do?
293. What does the `more` and `less` command do?
294. What does the `head` and `tail` command do?
295. What does the `touch` command do?
296. What does the `chmod` command do? Give an example.
297. What does the `chown` command do?
298. What does the `grep` command do? Give an example.
299. What does the `find` command do? Give an example.
300. What does the `ps` command do?
301. What does the `top` command do?
302. What does the `kill` command do?
303. What does the `man` command do?
304. What does the `echo` command do?
305. What does the `who` and `whoami` command do?
306. What does the `date` command do?
307. What does the `df` command do?
308. What does the `du` command do?
309. What does the `tar` command do? Give an example.
310. What does the `gzip` command do?
311. What is piping in Unix/Linux? Give an example using `|`.
312. What is redirection in Unix/Linux? Explain `>`, `>>`, and `<`.
313. What is the difference between `>` and `>>` in output redirection?
314. What is a shell script? Give a simple example.
315. What is the `chmod 755` permission? What does each digit mean?

### 🔹 Features of Unix/Linux

316. What are the main features of the Unix operating system?
317. Why is Unix considered a portable operating system?
318. What does it mean that Unix is a multi-user operating system?
319. What does it mean that Unix is a multitasking operating system?
320. What is the hierarchical file system in Unix?
321. What is a pipe in Unix? How does it support inter-process communication?
322. What makes Unix a security-oriented operating system?
323. What are the main features of the Linux operating system?
324. What makes Linux different from other operating systems?
325. What is the GNU/Linux ecosystem?
326. What is an open-source operating system? How does Linux qualify?

### 🔹 Disadvantages of Unix/Linux

327. What are the main disadvantages of the Unix operating system?
328. Why is Unix considered difficult for beginners?
329. What are the hardware compatibility issues with Unix?
330. What are the limitations of the Unix OS for desktop users?
331. What are the disadvantages of the Linux operating system?
332. What are the software compatibility issues with Linux?
333. What are the challenges of using Linux in enterprise environments?
334. Why does Linux have limited gaming support compared to Windows?
335. What is the learning curve associated with Linux administration?

---

## 📋 Quick Conceptual Questions (Cross-Unit)

336. What is the difference between concurrency and parallelism?
337. What is the difference between a process and a thread?
338. What is the difference between paging and segmentation?
339. What is the difference between internal fragmentation and external fragmentation?
340. What is the difference between deadlock avoidance and deadlock prevention?
341. What is the difference between a semaphore and a mutex?
342. What is the difference between hard and soft real-time systems?
343. What is the difference between time-sharing and multiprogramming?
344. What is the difference between swapping and demand paging?
345. What is the difference between a monolithic kernel and a microkernel?
346. What is the difference between Unix and Linux?
347. What is the difference between LRU and FIFO page replacement?
348. What is the difference between a page fault and a TLB miss?
349. What is the difference between a race condition and a deadlock?
350. What is the difference between static and dynamic loading?

---
