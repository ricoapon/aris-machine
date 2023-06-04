import {Level} from "./level";

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
  handleError(message: string): void
  // Remove the first element of the list of inputs.
  handleShiftInput(): void
  // Sets the value of the memory slot with the given value.
  handleSetMemory(index: number, value: number | undefined): void
  // Add a new value to the output.
  handleAddOutput(value: number): void
}

export type CompilationError = {
  lineNr: number
  fromCharIndex: number
  toCharIndex: number
  message: string
}
