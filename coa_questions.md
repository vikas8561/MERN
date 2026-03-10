# Computer Organization & Architecture — Viva Theory Questions
---

## 📘 Instruction Codes, Registers, Bus & Micro-Operations

### 🔹 Instruction Code — Deep Dive

1. What is an instruction code? What are its two main parts?
2. What is the opcode field in an instruction? What does it determine?
3. What is the address field in an instruction? What does it specify?
4. In a 16-bit instruction code with 4 opcode bits, how many operations are possible and how many memory locations are addressable?
5. What is the formula to calculate the number of opcode bits needed for a given number of operations?
6. What is the stored program concept? Who proposed it?
7. What are the key features of the Von Neumann stored program concept?
8. How does the basic computer differ from Von Neumann architecture in terms of instruction size?
9. In a 16-bit basic computer instruction, how many bits are used for the opcode and how many for the address?
10. Why does the basic computer use only 3 opcode bits even though the instruction is 16 bits?

### 🔹 Computer Registers — Sizes and Reasons

11. Why do AC, DR, IR, and TR have 16 bits in the basic computer?
12. Why do AR and PC have only 12 bits in the basic computer?
13. Why do INPR and OUTR have only 8 bits in the basic computer?
14. What is the role of the Temporary Register (TR)? When is it used?
15. What is the Address Register (AR)? How does it differ from MAR?
16. How many registers does the basic computer have? List all of them with their sizes.
17. Which register is the only one directly connected to the ALU?
18. Which register always points to the address of the next instruction?
19. Which register holds the instruction currently being decoded?
20. Which register acts as a buffer between memory and the CPU during data transfers?

### 🔹 Addressing Modes — Basic Computer Specific

21. How many addressing modes does the basic computer support?
22. In direct addressing (I=0), how many memory accesses are needed to get the operand?
23. In indirect addressing (I=1), how many memory accesses are needed to get the operand?
24. In immediate addressing, how many memory accesses are needed?
25. What is the indirect bit (I bit)? Which bit position does it occupy in the instruction?
26. If I=0 and opcode ≠ 111, what type of instruction is it?
27. If I=1 and opcode = 111, what type of instruction is it?
28. If I=0 and opcode = 111, what type of instruction is it?
29. What is an effective address (EA)? How is it determined in direct vs. indirect mode?
30. What is the main advantage of indirect addressing over direct addressing?
31. What is the main disadvantage of indirect addressing?
32. Why is indirect addressing useful for accessing arrays and dynamic data structures?

### 🔹 Types of Instructions — Basic Computer

33. What are the three types of instructions in the basic computer?
34. How are memory reference instructions identified from the instruction binary format?
35. How are register reference instructions identified from the instruction binary format?
36. How are I/O instructions identified from the instruction binary format?
37. What is the total number of instructions in the basic computer? Break it down by type.
38. What is the opcode range for memory reference instructions?
39. What opcode value and I bit combination identifies a register reference instruction?
40. What opcode value and I bit combination identifies an I/O instruction?
41. Which instruction type does NOT access main memory for its operand?
42. Which instruction type uses the INPR and OUTR registers?

### 🔹 Memory Reference Instructions — Opcodes and Micro-Operations

43. What are the 7 memory reference instructions of the basic computer? List each with its opcode.
44. What is the binary opcode of the AND instruction? What operation does it perform?
45. What is the binary opcode of the ADD instruction? What operation does it perform?
46. What is the binary opcode of the LDA instruction? What operation does it perform?
47. What is the binary opcode of the STA instruction? What operation does it perform?
48. What is the binary opcode of the BUN instruction? What operation does it perform?
49. What is the binary opcode of the BSA instruction? What operation does it perform?
50. What is the binary opcode of the ISZ instruction? What operation does it perform?
51. Write all micro-operations for the AND instruction (T₄ onwards).
52. Write all micro-operations for the ADD instruction. What register is affected by the carry output?
53. Write all micro-operations for the LDA instruction.
54. Write all micro-operations for the STA instruction. Why does it only need one execute cycle?
55. Write all micro-operations for the BUN instruction.
56. Write all micro-operations for the BSA instruction across T₄ and T₅.
57. Write all micro-operations for the ISZ instruction across T₄, T₅, and T₆.
58. Which memory reference instruction is the fastest to execute? Why?
59. Which memory reference instruction is the slowest to execute? Why?
60. How does the ISZ instruction implement a loop counter? Explain with an example.
61. How does BSA save the return address and where does it save it?
62. How does a subroutine return after being called via BSA?
63. What is the E register? Which instruction affects the E bit and how?

### 🔹 Register Reference Instructions — Detailed

64. List all 12 register reference instructions of the basic computer.
65. What does the CLA instruction do? Write its RTL.
66. What does the CLE instruction do? Write its RTL.
67. What does the CMA instruction do? Write its RTL.
68. What does the CME instruction do? Write its RTL.
69. What does the CIR (Circular shift right) instruction do? How does it involve E?
70. What does the CIL (Circular shift left) instruction do? How does it involve E?
71. What does the INC instruction do? Write its RTL.
72. What does SPA (Skip if Positive AC) do? What condition does it check?
73. What does SNA (Skip if Negative AC) do? What condition does it check?
74. What does SZA (Skip if Zero AC) do? What condition does it check?
75. What does SZE (Skip if Zero E) do? What condition does it check?
76. What does HLT do? How does it stop execution?

### 🔹 I/O Instructions — Detailed

77. List all 6 I/O instructions of the basic computer.
78. What does the INP instruction do? Which registers are involved?
79. What does the OUT instruction do? Which registers are involved?
80. What does SKI (Skip if Input Flag) do? When does it skip?
81. What does SKO (Skip if Output Flag) do? When does it skip?
82. What does ION do? What does it enable?
83. What does IOF do? What does it disable?
84. What is the input flag (FGI)? When is it set to 1? When is it cleared?
85. What is the output flag (FGO)? When is it set to 1? When is it cleared?
86. Why are SKI and SKO used? What problem do they solve?

### 🔹 Common Bus System — Detailed

87. What is the purpose of the common bus system in the basic computer?
88. How many selection lines does the common bus use? How many sources can it select from?
89. What binary selection code puts AR onto the bus?
90. What binary selection code puts PC onto the bus?
91. What binary selection code puts DR onto the bus?
92. What binary selection code puts AC onto the bus?
93. What binary selection code puts IR onto the bus?
94. What binary selection code puts TR onto the bus?
95. What binary selection code puts Memory output onto the bus?
96. What are the three register control signals connected to the bus? What does each do?
97. What is the LD (Load) signal? Which direction does data flow when LD is active?
98. What is the INR (Increment) signal? Which register is most commonly incremented?
99. What is the CLR (Clear) signal? What does it do to a register?
100. Why can only ONE register drive the bus at a time while multiple registers can read from it?

### 🔹 Instruction Cycle — Fetch Micro-Operations (Detailed)

101. What is the very first micro-operation that occurs at timing signal T₀?
102. What two things happen simultaneously at timing signal T₁?
103. Why does PC increment at T₁ rather than later in the cycle?
104. What three things happen at timing signal T₂ during the decode phase?
105. What does D₀–D₆ represent in the decoding process at T₂?
106. What is a timing signal? How is it generated from the Sequence Counter?
107. How does the SC (Sequence Counter) know when to reset to 0?
108. What is the role of the decoder connected to IR bits 14–12?
109. After T₂, how does the control unit know whether to do an indirect memory fetch?
110. How many total timing cycles does the fetch phase always take, regardless of instruction?
111. If an instruction uses indirect addressing, what extra step happens before execution?
112. Write the complete micro-operation sequence for an indirect memory-reference instruction from T₀ to final execute.

### 🔹 Instruction Formats by Address Count — Detailed

113. In a three-address instruction ADD A, B, C — what is A, B, and C?
114. What is the main advantage of three-address instructions?
115. What is the main disadvantage of three-address instructions?
116. In a two-address instruction ADD A, B — what happens to A?
117. Why does a one-address instruction need an implicit register (accumulator)?
118. Give an example of how to compute X = (A+B)×(C+D) using one-address instructions.
119. Give an example of how to compute X = (A+B)×(C+D) using zero-address (stack) instructions.
120. Which instruction format produces the shortest programs (fewest instructions)?
121. Which instruction format produces the longest individual instructions?
122. What is the fundamental trade-off between instruction length and program length?
123. Why does the basic computer use the one-address format?

### 🔹 Control Unit — Detailed

124. What are the three categories of inputs to the control unit?
125. What are the outputs generated by the control unit?
126. In hardwired control, how are control signals generated?
127. What makes hardwired control faster than microprogrammed control?
128. What is a control word in microprogrammed control?
129. What is control memory (CM)? What is stored in it?
130. What is a microprogram counter (μPC)? What does it do?
131. Why is microprogrammed control easier to debug than hardwired control?
132. Why is hardwired control preferred in RISC processors?
133. Why is microprogrammed control preferred in CISC processors?
134. What is a horizontal microinstruction? How many control signals can it specify?
135. What is a vertical microinstruction? How does it differ from horizontal?
136. What is the key trade-off between horizontal and vertical microinstructions?

---

## 📋 Additional Comparison Questions

137. What is the difference between the AND and ADD memory reference instructions?
138. What is the difference between LDA and STA instructions?
139. What is the difference between BUN and BSA instructions?
140. What is the difference between SPA, SNA, and SZA register reference instructions?
141. What is the difference between SKI and SKO I/O instructions?
142. What is the difference between ION and IOF instructions?
143. What is the difference between CIR and CIL instructions?
144. What is the difference between CLA and CMA instructions?
145. What is the difference between INP and OUT instructions?
146. What is the difference between FGI and FGO flags?
147. What is the difference between the AR and PC registers in terms of size and function?
148. What is the difference between the DR and TR registers?
149. What is the difference between register reference instructions and I/O instructions in terms of identification?
150. What is the difference between direct addressing and indirect addressing in terms of number of memory accesses?

---

## 📘 Detailed Practical & Circuit-Level Questions (Micro-Operations)

### 🔹 Arithmetic Micro-Operations — Deep Dive

151. What are arithmetic micro-operations? List all with RTL notation.
152. Explain the Half Adder with truth table, Boolean expressions, and circuit diagram.
153. Explain the Full Adder with truth table, Boolean expressions, and circuit diagram.
154. What is the difference between a Half Adder and a Full Adder?
155. Draw and explain a 4-bit Ripple Carry Adder. Solve: 6 + 5 using it.
156. Draw and explain a Binary Adder-Subtractor. How does the XOR gate act as a programmable inverter?
157. Explain the complete arithmetic circuit function table with inputs S1, S0, and Cin.
158. What is 2's complement? How is it used for subtraction in hardware?
159. What is the difference between carry and overflow in binary arithmetic?
160. Solve using a Ripple Carry Adder: 9 + 6 in 4-bit binary. Show all carry bits.

### 🔹 Logic Micro-Operations — Deep Dive

161. What are logic micro-operations? List all 16 possible operations with RTL notation.
162. Explain AND, OR, XOR, and NOT operations with their truth tables and 8-bit examples.
163. What is a mask operation? How is it used in logic micro-operations? Give an example.
164. Explain selective complement, selective set, and selective clear operations with examples.
165. What is the difference between selective set and selective clear?
166. How is XOR used to clear a register? Why is it preferred over direct zero assignment?
167. Explain the Insert operation with a step-by-step example.
168. Draw and explain the 4-function logic circuit (AND, OR, XOR, NOT) with its function table.
169. Why does the NOT operation in the 4-function logic circuit use only input A and not B?
170. State the key property: what does AND with 0, OR with 1, and XOR with 1 each do to a bit?

### 🔹 Shift Micro-Operations — Deep Dive

171. What are shift micro-operations? Why are they important in computer arithmetic?
172. Explain Logical Shift Left and Logical Shift Right with diagrams and examples.
173. Explain Arithmetic Shift Left and Arithmetic Shift Right. How do they differ from logical shifts?
174. What is the significance of Arithmetic Right Shift for signed numbers? Why is the sign bit preserved?
175. Explain Circular Shift Left and Circular Shift Right with examples. Why are no bits lost?
176. What is Rotate Through Carry? Explain with a diagram and example.
177. Compare Logical Shift Right and Arithmetic Shift Right with an example using a negative number.
178. What is a shift register? Explain its four types: SISO, SIPO, PISO, and PIPO.
179. Draw the circuit diagram of a 4-bit Serial-In Parallel-Out (SIPO) shift register.
180. Compare all three types of micro-operations: Arithmetic, Logic, and Shift in a table.

### 🔹 Overflow, Examples & Numerical Problems

181. What happens when Arithmetic Shift Left causes overflow? Give a numerical example.
182. If R = 0 0 0 0 1 1 0 0, find the result after: (a) shl  (b) shr  (c) cil  (d) cir

---

## 📘 From Notes — Structure of Computers, Data Representation & Computer Arithmetic

### 🔹 Structure of Computers — Computer Types & Functional Units

183. What is a computer? What are its four basic capabilities?
184. What are the five types of computers? Name and describe each briefly.
185. What is a Microcomputer? Who uses it and what are its examples?
186. What is a Minicomputer? How many users can it serve simultaneously?
187. What is a Mainframe Computer? Give two real-world application examples.
188. What is a Supercomputer? What tasks is it used for?
189. What is an Embedded System? Give three examples of devices that contain one.
190. What are the five Functional Units of a computer? List and briefly explain each.
191. What is the Input Unit? Give four examples of input devices.
192. What is the Output Unit? Give four examples of output devices.
193. What is the CPU? What are its two main internal parts?
194. What is the ALU (Arithmetic Logic Unit)? What operations does it perform?
195. What is the Control Unit? What is its role in a computer system?
196. What are the two types of Memory in a computer? Compare them.
197. What are Registers? Why are they the fastest storage in a computer?

### 🔹 Basic Operational Concepts

198. What is the Fetch-Decode-Execute (FDE) cycle? Explain each of the three steps.
199. What happens during the Fetch phase of the FDE cycle?
200. What happens during the Decode phase of the FDE cycle?
201. What happens during the Execute phase of the FDE cycle?
202. What is an Interrupt? Why is it needed? Describe how it works step by step.

### 🔹 Bus Structures

203. What is a Bus in a computer? What is its purpose?
204. What are the three types of buses? Describe each one.
205. What is the Data Bus? In which direction does it operate?
206. What is the Address Bus? In which direction does it operate?
207. What is the Control Bus? What signals does it carry?
208. Explain how all three buses work together using a memory-read example.
209. What is the difference between a Single Bus and a Multiple Bus structure? Compare advantages and disadvantages.

### 🔹 Software

210. What is Software? What are the two main types?
211. What is an Operating System? What functions does it perform? Give three examples.
212. What is the difference between a Compiler and an Interpreter? Compare with a table.
213. What is an Assembler? What does it take as input and what does it produce?

### 🔹 Performance

214. What is Clock Speed? What unit is it measured in?
215. What is CPI (Cycles Per Instruction)? Is a lower or higher value better?
216. What is MIPS? Write its formula.
217. What is the CPU Execution Time formula? What three factors affect it?

### 🔹 Multiprocessors and Multicomputers

218. What is a Multiprocessor System? What type of memory does it use?
219. What is a Multicomputer System? What type of memory does it use?
220. Compare Multiprocessor vs Multicomputer systems in terms of memory, communication, scalability, and examples.
221. What is Flynn's Taxonomy? List and explain all four classifications with examples.
222. What does SISD stand for? Give an example processor.
223. What does SIMD stand for? Give an example processor.
224. What does MISD stand for? Where is it used?
225. What does MIMD stand for? Why is it the most common today?

### 🔹 Data Representation

226. Why do computers use Binary (0s and 1s) to represent all data?
227. What are the four common number systems used in computing? State the base and digits of each.
228. Convert Binary 1011 to Decimal. Show full working.
229. Convert Decimal 13 to Binary using the divide-by-2 method. Show all steps.
230. How do you convert a Binary number to Octal? Give an example.
231. How do you convert a Binary number to Hexadecimal? Give an example.
232. What are the three methods for representing Signed Integers?
233. What is Sign-Magnitude representation? What is its main limitation?
234. What is 1's Complement representation? How is it computed?
235. What is 2's Complement representation? How is it computed?
236. Why is 2's Complement preferred over Sign-Magnitude and 1's Complement?
237. Find the 2's Complement of -12 in 8-bit binary. Show all steps.
238. What is the shortcut method for finding 2's Complement?
239. What is the range of unsigned and signed integers for n bits? Give the values for 8-bit.
240. What is Floating-Point representation? Why is it needed?
241. What are the three parts of IEEE 754 Single-Precision (32-bit) format? State the bit width of each.
242. What is the Bias in IEEE 754? What is the bias value for single-precision and double-precision?
243. Convert the decimal number 12.5 to IEEE 754 single-precision format. Show all steps.
244. What is IEEE 754 Double-Precision (64-bit)? How does it differ from single-precision?

### 🔹 Computer Arithmetic — Addition & Subtraction

245. What are the four basic rules of Binary Addition?
246. How is Binary Subtraction performed using 2's Complement? Give a worked example of 7 - 5 in 4-bit.

### 🔹 Multiplication Algorithms

247. What is Booth's Multiplication Algorithm? Why is it used instead of simple shift-and-add?
248. What is the decision table for Booth's Algorithm? List all four cases for Q₀Q₋₁ and the operation taken.
249. Multiply 7 × 3 using Booth's Algorithm. Show the complete step-by-step table.

### 🔹 Division Algorithms

250. What is the Restoring Division Algorithm? Why is it called "restoring"? List the procedure steps.
251. What is the Non-Restoring Division Algorithm? How does it differ from Restoring Division?
252. Divide 11 ÷ 3 using the Restoring Division Algorithm. Show the complete step-by-step table.
253. Compare Restoring vs Non-Restoring Division in terms of operations per cycle, speed, and final correction.

### 🔹 Floating-Point Arithmetic

254. What is the normalized form in Floating-Point representation? Give three examples.
255. What are the four steps for Floating-Point Addition? Explain each step.
256. Add 0.964572 E2 and 0.586351 E5. Show all steps.
257. What are the four steps for Floating-Point Multiplication?
258. Multiply 0.200000 E4 and 0.400000 E-2. Show all steps.
259. What are the steps for Floating-Point Division?
260. Summarize Floating-Point Arithmetic rules for addition, subtraction, multiplication, and division in a table.

### 🔹 Decimal Arithmetic — BCD

261. What is BCD (Binary Coded Decimal)? How does it differ from standard binary representation?
262. Write the BCD codes for all decimal digits 0 through 9. Which codes are invalid and why?
263. Convert 59 to BCD.
264. Convert BCD 0011 0111 to Decimal.
265. What is the difference between Packed BCD and Unpacked BCD?
266. What is the Golden Rule for BCD Addition? Why is the correction factor 6 (0110) added?
267. Add 25 + 33 in BCD. Show full working.
268. Add 47 + 35 in BCD. Show full working including the correction step.
269. What is 10's Complement Subtraction in BCD? How is it related to 2's Complement?
270. Subtract 72 - 48 in BCD using 10's Complement. Show all steps.
271. What happens in BCD subtraction when there is no carry out?
272. What are the advantages of BCD representation? Why is it used in financial applications?
273. What are the disadvantages of BCD representation?
274. Why does BCD avoid rounding errors in financial calculations that binary cannot avoid?
275. Summarize the BCD Addition rules in a table (conditions and actions).
276. Summarize the BCD Subtraction steps in a table.

---
