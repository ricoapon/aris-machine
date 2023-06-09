import {MachineGUIAction, MachineResult} from "./machine";
import {MachineEditor, MachineGUI} from "../public-abstractions";
import {Level} from "../level";

export enum MachineState {
  /** Indicates that there are still actions left to be played, but not a single step is executed. */
  INITIALIED,
  /** Indicates that there are still actions left to be played and a single step is executed, but is currently not running. */
  READY,
  /** Indicates that there are actions still left to be played and is also running. */
  RUNNING,
  /** Indicates that there are no actions left (and obviously not running anymore). */
  FINISHED
}

/**
 * This class "runs" the code on the screen, meaning that all steps that the code makes (for example: moving a memory
 * from input to memory slot 0) is executed on screen. Using the {@link MachineGUI} interface, all actions are delegated
 * to a frontend component.
 *
 * The initialization is done by the {@link MachineGuiExecutorCreator}.
 */
export class MachineGuiExecutor {
  // Array with all the actions that will be emptied after actions are executed.
  private actions: MachineGUIAction[]
  private delayInMs: number = 1000;
  private timeout: NodeJS.Timeout | undefined
  private hasExecutedFirstAction = false

  constructor(private machineGUI: MachineGUI,
              private machineEditor: MachineEditor,
              private level: Level,
              private machineResult: MachineResult) {
    // Clone the input array, since we modify it. We don't really need to, but just to be safe we do it anyway.
    this.actions = [...machineResult.machineGUIActions]
  }

  getFinishedWithError(): boolean {
    return this.machineResult.finishedWithError
  }

  getState(): MachineState {
    if (!this.hasExecutedFirstAction) {
      return MachineState.INITIALIED
    }

    if (this.timeout != undefined) {
      return MachineState.RUNNING
    }

    if (this.actions.length > 0) {
      return MachineState.READY
    }

    return MachineState.FINISHED
  }

  play() {
    this.handleNextRecursive()
  }

  updateDelayInMs(delayInMs: number) {
    this.delayInMs = delayInMs

    // Update the current running sequence with the new value.
    if (this.getState() == MachineState.RUNNING) {
      this.pause()
      this.handleNextRecursive()
    }
  }

  playSingleStep() {
    if (this.timeout != undefined) {
      this.pause()
    }

    this.handleNext()
  }

  /** After calling this method, this object should be deleted. */
  stopAndClear() {
    this.pause()
    this.actions = []
    this.machineEditor.removeCaret()
    this.machineGUI.initialize(this.level)
    this.hasExecutedFirstAction = true
  }

  private pause(): void {
    if (this.timeout != undefined) {
      clearTimeout(this.timeout)
      this.timeout = undefined
    }
  }

  private handleNextRecursive() {
    this.handleNext()

    if (this.actions.length > 0) {
      this.timeout = setTimeout(() => this.handleNextRecursive(), this.delayInMs)
    } else {
      this.timeout = undefined
    }
  }

  private handleNext() {
    const action = this.actions.shift()
    // This should never happen, but just in case.
    if (action == undefined) {
      this.pause()
      return
    }

    this.handle(action);
  }

  private handle(action: MachineGUIAction) {
    this.hasExecutedFirstAction = true

    if (action.editorLine) {
      this.machineEditor.removeCaret()
      this.machineEditor.addCaret(action.editorLine)
    }

    if (action.shiftInput) {
      this.machineGUI.handleShiftInput()
    }

    if (action.addValueToOutput != undefined) {
      this.machineGUI.handleAddOutput(action.addValueToOutput)
    }

    if (action.memory) {
      for (const memoryAction of action.memory) {
        this.machineGUI.handleSetMemory(memoryAction.index, memoryAction.value)
      }
    }
    if (action.error) {
      this.machineGUI.handleError(action.error)
    }
    if (action.finished) {
      this.machineGUI.handleFinished()
    }

    this.machineGUI.detectChanges()
  }
}
