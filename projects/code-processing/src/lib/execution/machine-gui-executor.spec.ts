import {Level, Stage} from "../level";
import {MachineGUIAction} from "./machine";
import {CompilationError, MachineEditor, MachineGUI} from "../public-abstractions";
import {MachineGuiExecutor, MachineState} from "./machine-gui-executor";

describe('MachineGuiExecutor', () => {
  const DEFAULT_LEVEL: Level = {
    stage: Stage.MAIN,
    id: 0,
    title: '',
    input: [],
    expectedOut: [],
    nrOfMemorySlots: 100,
    description: ''
  }

  const SHIFT_INPUT_ACTION: MachineGUIAction = {shiftInput: true}

  beforeEach(() => {
    jasmine.clock().install()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('getState() works', () => {
    // Given
    const machineGUIExecutor = new MachineGuiExecutor(new MockMachineGUI(), new MockMachineEditor(), DEFAULT_LEVEL, {
      machineGUIActions: [SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION],
      finishedWithError: false
    })

    // When and then
    expect(machineGUIExecutor.getState()).toEqual(MachineState.INITIALIED)
    machineGUIExecutor.playSingleStep()
    expect(machineGUIExecutor.getState()).toEqual(MachineState.READY)
    machineGUIExecutor.play()
    expect(machineGUIExecutor.getState()).toEqual(MachineState.RUNNING)
    // 3 actions take 2000ms to execute.
    jasmine.clock().tick(2000)
    expect(machineGUIExecutor.getState()).toEqual(MachineState.FINISHED)
  })

  it('updateDelayInMs() updates while playing', () => {
    // Given
    const machineGUIExecutor = new MachineGuiExecutor(new MockMachineGUI(), new MockMachineEditor(), DEFAULT_LEVEL, {
      machineGUIActions: [SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION],
      finishedWithError: false
    })

    // When
    machineGUIExecutor.play()
    machineGUIExecutor.updateDelayInMs(50)
    // 5 actions would take 4000ms to execute. Now with the updated 50, it would take 250ms.
    jasmine.clock().tick(250)

    // Then
    expect(machineGUIExecutor.getState()).toEqual(MachineState.FINISHED)
  })

  it('playSingleStep() executes a step and pauses if it is already running', () => {
    // Given
    const machineGUI = spyOnAllFunctions(new MockMachineGUI(), true)
    const machineGUIExecutor = new MachineGuiExecutor(machineGUI, new MockMachineEditor(), DEFAULT_LEVEL, {
      machineGUIActions: [SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION, SHIFT_INPUT_ACTION],
      finishedWithError: false
    })

    // When
    machineGUIExecutor.play()
    machineGUIExecutor.playSingleStep()

    // Then
    // One from play, one from playSingleStep.
    expect(machineGUI.handleShiftInput).toHaveBeenCalledTimes(2)
    expect(machineGUIExecutor.getState()).toEqual(MachineState.READY)
  })

  it('all actions are handled', () => {
    // Given
    const machineGUI = spyOnAllFunctions(new MockMachineGUI(), true)
    const machineEditor = spyOnAllFunctions(new MockMachineEditor(), true)
    const machineGUIExecutor = new MachineGuiExecutor(machineGUI, machineEditor, DEFAULT_LEVEL, {
      machineGUIActions: [
        {editorLine: 1, shiftInput: true},
        {editorLine: 2, addValueToOutput: 0},
        {editorLine: 3, memory: [{index: 1, value: 2}, {index: 0, value: 3}]},
        {editorLine: 4, shiftInput: true, addValueToOutput: 2, memory: [{index: 3, value: 4}]},
        {error: 'Some error'},
        {finished: true}
      ],
      finishedWithError: false
    })

    // When and then
    // Checking order of spy calls is a bit cumbersome, so we just execute them one by one and check.
    machineGUIExecutor.playSingleStep()
    expect(machineGUI.handleShiftInput).toHaveBeenCalled()
    expect(machineEditor.removeCaret).toHaveBeenCalled()
    expect(machineEditor.addCaret).toHaveBeenCalledWith(1)

    machineGUIExecutor.playSingleStep()
    expect(machineGUI.handleAddOutput).toHaveBeenCalledWith(0)
    expect(machineEditor.removeCaret).toHaveBeenCalledTimes(2)
    expect(machineEditor.addCaret).toHaveBeenCalledWith(2)

    machineGUIExecutor.playSingleStep()
    expect(machineGUI.handleSetMemory).toHaveBeenCalledWith(1, 2)
    expect(machineGUI.handleSetMemory).toHaveBeenCalledWith(0, 3)
    expect(machineEditor.removeCaret).toHaveBeenCalledTimes(3)
    expect(machineEditor.addCaret).toHaveBeenCalledWith(3)

    machineGUIExecutor.playSingleStep()
    expect(machineGUI.handleShiftInput).toHaveBeenCalled()
    expect(machineGUI.handleAddOutput).toHaveBeenCalledWith(2)
    expect(machineGUI.handleSetMemory).toHaveBeenCalledWith(3, 4)
    expect(machineEditor.removeCaret).toHaveBeenCalledTimes(4)
    expect(machineEditor.addCaret).toHaveBeenCalledWith(4)

    machineGUIExecutor.playSingleStep()
    expect(machineGUI.handleError).toHaveBeenCalledWith('Some error')

    machineGUIExecutor.playSingleStep()
    expect(machineGUI.handleFinished).toHaveBeenCalled()
  })

  it('stopAndClear() works', () => {
    // Given
    const machineGUI = spyOnAllFunctions(new MockMachineGUI(), true)
    const machineEditor = spyOnAllFunctions(new MockMachineEditor(), true)
    const machineGUIExecutor = new MachineGuiExecutor(machineGUI, machineEditor, DEFAULT_LEVEL, {
      machineGUIActions: [SHIFT_INPUT_ACTION],
      finishedWithError: false
    })

    // When
    machineGUIExecutor.stopAndClear()

    // Then
    expect(machineGUIExecutor.getState()).toEqual(MachineState.FINISHED)
    expect(machineEditor.removeCaret).toHaveBeenCalled()
    expect(machineGUI.initialize).toHaveBeenCalledWith(DEFAULT_LEVEL)
  })
})


class MockMachineGUI implements MachineGUI {
  detectChanges(): void {
  }

  handleAddOutput(value: number): void {
  }

  handleError(message: string): void {
  }

  handleFinished(): void {
  }

  handleSetMemory(index: number, value: number): void {
  }

  handleShiftInput(): void {
  }

  initialize(level: Level): void {
  }
}

class MockMachineEditor implements MachineEditor {
  addCaret(lineNumber: number): void {
  }

  removeCaret(): void {
  }

  removeCompilationErrors(): void {
  }

  showCompilationErrors(compilationErrors: CompilationError[]): void {
  }
}
