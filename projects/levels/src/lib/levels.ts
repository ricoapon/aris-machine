import {Level, Stage} from "code-processing";

let mainIdCounter = 1
const MAIN_LEVELS: Level[] = [
  {
    stage: Stage.MAIN,
    id: mainIdCounter++,
    title: 'Hello world',
    input: [9, 6, 4],
    expectedOut: [9, 6, 4],
    nrOfMemorySlots: 1,
    maxCodeLengthScoreForStar: 2,
    maxRunLengthScoreForStar: 3,
    description: "Write commands in the editor below to build a program. Your task is to use the numbers (the purple boxes) in the input to " +
      "get the expected output. In this first simple program, you can move the input to the output without modifications.<br>" +
      "<br>" +
      "You can use the command <code>move input to output</code>."
  }
]

export const LEVELS: Map<Stage, Level[]> = new Map<Stage, Level[]>([
  [Stage.MAIN, MAIN_LEVELS]
])
