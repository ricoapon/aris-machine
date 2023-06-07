import {Level, Stage} from "code-processing";

const MAIN_LEVELS: Level[] = [
  {
    stage: Stage.MAIN,
    id: 1,
    title: 'Hello world',
    input: [9, 6, 4],
    expectedOut: [9, 6, 4],
    nrOfMemorySlots: 1,
    description: "Write commands in the editor below to build a program. Your task is to use the numbers (the purple boxes) in the input to " +
      "get the expected output. In this first simple program, you can move the input to the output without modifications.<br>" +
      "<br>" +
      "You can use the command <code>move input to output</code>."
  },
  {
    stage: Stage.MAIN,
    id: 2,
    title: 'Hello world',
    input: [9, 6, 4, 9, 6, 4, 9, 6, 4, 9, 6, 4],
    expectedOut: [9, 6, 4, 9, 6, 4, 9, 6, 4, 9, 6, 4],
    nrOfMemorySlots: 1,
    description: "Writing out every line by hand is very tedious work. We can do that far easier: use a loop! Try and move " +
      "all the input numbers to the output with only four lines of code!<br>" +
      "<br>" +
      "You can use the command <code>loop { ... }</code> to loop."
  },
  {
    stage: Stage.MAIN,
    id: 3,
    title: 'Switcheroo',
    input: [4, 5, 1, 7, 8, 9],
    expectedOut: [5, 4, 7, 1, 9, 8],
    nrOfMemorySlots: 3,
    description: "If every level was just moving the input to the output, this game would be too simple! Let's switch it up: " +
      "you have to grab the first TWO numbers from the input and move them to the output in REVERSE order.<br>" +
      "<br>" +
      "The tiles you can see in the middle are called 'memory slots'. The number you can see on the memory slot is called " +
      "index. You can store numbers in memory slots. You should use them.<br>" +
      "<br>" +
      "You can use the command <code>move X to Y</code> to move numbers from X to Y. You can either use 'input', 'output' or the index " +
      "of a memory slot. For example, <code>move input to 0</code> would move a number from the input to the " +
      "memory slot with the number 0."
  },
  {
    stage: Stage.MAIN,
    id: 4,
    title: 'Add me on Facebook',
    input: [3, 6, 6, 8, -1, 8, 5, -5],
    expectedOut: [9, 14, 7, 0],
    nrOfMemorySlots: 3,
    description: "It is now time to modify the numbers using the power of addition! For each two things in the input, add " +
      "them together and put the result in the output.<br>" +
      "<br>" +
      "You can use the command <code>add X to Y</code> where X and Y must be memory slots."
  },
  {
    stage: Stage.MAIN,
    id: 5,
    title: 'Ctrl + C',
    input: [1, 2, 3, 4, 5],
    expectedOut: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    nrOfMemorySlots: 3,
    description: "Output every number twice.<br>" +
      "<br>" +
      "You can use the command <code>copy X to Y</code> where X is a memory slot and Y is either a memory slot or output."
  },
  {
    stage: Stage.MAIN,
    id: 6,
    title: 'Triple kill',
    input: [4, 8, 3, 1, 10],
    expectedOut: [12, 24, 9, 3, 30],
    nrOfMemorySlots: 3,
    description: "Triple the input value and output the result.<br>"
      + "<br>" +
        "If you are interested in how to make use useful tricks with the text editor, go to this page: " +
        "<a href='/docs/editor' target='_blank'>Monaco editor</a>."
  },
  {
    stage: Stage.MAIN,
    id: 7,
    title: '8 ball',
    input: [4, 8, 3, 1, 10],
    expectedOut: [32, 64, 24, 8, 80],
    nrOfMemorySlots: 3,
    description: "Multiply the input by 8 and output the result. Can you do it using only 3 ADD commands?"
  },
  {
    stage: Stage.MAIN,
    id: 8,
    title: '5 times',
    input: [4, 8, 3, 1, 10],
    expectedOut: [160, 320, 120, 40, 400],
    nrOfMemorySlots: 5,
    description: "Multiply the input by 40 and output the result."
  },
  {
    stage: Stage.MAIN,
    id: 9,
    title: 'If only',
    input: [9, 0, 8, 1, 0, 0, -6, 0],
    expectedOut: [0, 0, 0, 0],
    nrOfMemorySlots: 3,
    description: "Only move the 0 values to the output. You can use the command <code>ifzero [memory-slot | input] { ... }</code> " +
      "to only execute commands if the memory slot or input has the value 0 in it.<br>" +
      "<br>" +
      "The function <code>ifnotzero</code> also exists, which does the opposite: executes code only if the value is not equal to 0."
  },
  {
    stage: Stage.MAIN,
    id: 10,
    title: 'Absolutely larger',
    input: [9, 0, -5, 1, 6, 8, 0, -1],
    expectedOut: [10, -6, 2, 7, 9, -2],
    nrOfMemorySlots: 3,
    description: "If the input is positive, add 1 and output that. If the input is negative, subtract 1 and output that. " +
      "Ignore any input that is 0.<br>" +
      "<br>" +
      "You can use the command <code>ifpos [memory-slot | input] { ... }</code> or similarly <code>ifneg</code>.<br>" +
      "<br>" +
      "You can use the command <code>incr [memory-slot]</code> to increase the value of a memory slot by 1. Or you can use" +
      "<code>decr</code> to decreate the value by 1."
  },
  {
    stage: Stage.MAIN,
    id: 11,
    title: 'I wanted to make a math joke, but I decided to subtract it.',
    input: [1, -5, 6, 8, 0, 9, 2, -6, 5, -5, 7, 8],
    expectedOut: [-6, -2, 9, 8, -10, -1],
    nrOfMemorySlots: 3,
    description: "For each two things in the input, first subtract the 1st from the 2nd and put the result in the output. " +
      "And then, subtract the 2nd from the 1st and put the result in the output. repeat.<br>" +
      "<br>" +
      "You can use the command <code>sub [memory-slot] from [memory-slot]</code> to subtract the first memory slot from the" +
      "second. Alternatively, you can use <code>add [memory-slot] to [memory-slot]</code>."
  },
  {
    stage: Stage.MAIN,
    id: 12,
    title: 'Equality',
    input: [1, -5, 6, 6, 0, 9, -6, -6, 5, -5, 7, 7],
    expectedOut: [6, -6, 7],
    nrOfMemorySlots: 3,
    description: "For each two elements in the input: if they are equal, put one of them in the output. Discard non-equal pairs. Repeat!"
  },
  {
    stage: Stage.MAIN,
    id: 13,
    title: 'Big brother',
    input: [1, -5, 6, 6, 0, 9, -6, -7, 5, -5, 7, 7],
    expectedOut: [1, 6, 9, -6, 5, 7],
    nrOfMemorySlots: 3,
    description: "For each two elements in the input: put the bigger of the two in the output, If they are equal, just pick either one. Repeat!"
  },
  {
    stage: Stage.MAIN,
    id: 14,
    title: 'Stay positive',
    input: [1, -5, 6, 9, -6, -7, 0, -5],
    expectedOut: [1, 5, 6, 9, 6, 7, 0, 5],
    nrOfMemorySlots: 3,
    description: "Send each input to the output. But if the number is negative, first make it positive. Repeat!"
  },
  {
    stage: Stage.MAIN,
    id: 15,
    title: 'Countdown',
    input: [9, -3, 0, 2],
    expectedOut: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -3, -2, -1, 0, 0, 2, 1, 0],
    nrOfMemorySlots: 5,
    description: "For each input, send that number to the output, followed by all numbers down to (or up to!) zero.<br>" +
      "<br>" +
      "When using the <code>break</code> command, you stop the innermost loop that is currently running."
  },
  {
    stage: Stage.MAIN,
    id: 16,
    title: 'Multiplication',
    input: [6, 4, 6, 2, 0, 0, 5, 3, 1, 1, 7, 0, 0, 7],
    expectedOut: [24, 12, 0, 15, 1, 0, 0],
    nrOfMemorySlots: 5,
    description: "For each two items in the input, multiply them and output the result. Don't worry about negative numbers for now.<br>" +
      "<br>" +
      "When using the <code>continue</code> command, you continue the loop again from the start."
  },
]

export const LEVELS: Map<Stage, Level[]> = new Map<Stage, Level[]>([
  [Stage.MAIN, MAIN_LEVELS]
])
