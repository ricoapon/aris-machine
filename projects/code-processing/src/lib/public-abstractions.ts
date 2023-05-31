import {Level} from "./level";

export abstract class Parser {
  abstract validate(level: Level, code: string): CompilationError[]
  abstract parse(level: Level, code: string): MachineExecutorCreator
}

export abstract class MachineExecutorCreator {
  abstract initialize(machineGUI: MachineGUI, machineEditor: MachineEditor): MachineExecutor
}

export interface MachineEditor {
  addCaret(lineNumber: number): void;

  removeCaret(): void;
}

export interface MachineGUI {
  // The UI doesn't always properly update after making changes. This method is the fix.
  detectChanges(): void;
  // Prepare the screen with the level information.
  initialize(level: Level): void;

  // Is executed when the program is done without error.
  handleFinished(): void
  // Is executed when the program is fails with an error.
  handleError(): void
  // Remove the first element of the list of inputs.
  handleShiftInput(): void
  // Sets the value of the memory slot with the given value.
  handleSetMemory(index: number, value: number): void
  // Add a new value to the output.
  handleAddOutput(value: number): void
}

interface MachineExecutor {
  getRunInfo(): RunInfo

  play(): void
  pause(): void
  playSingleStep(): void

  canPlay(): boolean
  canPause(): boolean
  canPlaySingleStep(): boolean

  destroy(): void
}

type RunInfo = {
  finishedWithError: boolean
  // Scores are only relevant if finishedWithError is false.
  lengthScore: number
  runScore: number
}

export type CompilationError = {
  lineNr: number
  fromCharIndex: number
  toCharIndex: number
  message: string
}
