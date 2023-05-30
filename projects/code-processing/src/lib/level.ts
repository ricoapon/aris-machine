export enum Stage {
  // I don't use stages yet. Maybe I will divide the levels in different sections. This will be pretty likely.
  // To avoid refactoring in the future, I will create a main stage right now. This is very little work.
  MAIN
}

export type Level = {
  stage: Stage
  // Starts counting from 1.
  id: number
  title: string
  input: number[]
  expectedOut: number[]
  nrOfMemorySlots: number
  maxCodeLengthScoreForStar: number
  maxRunLengthScoreForStar: number
  description: string
}

