import {Level, Stage} from "../level";
import {Machine} from "./machine";


describe('Machine', () => {
  const DEFAULT_LEVEL: Level = {
    stage: Stage.MAIN,
    id: 0,
    title: '',
    input: [],
    expectedOut: [],
    nrOfMemorySlots: 100,
    description: ''
  }
  // Some methods require an editor line value. If this is not important for the test, use this constant.
  const IGNORE_EDITOR_LINE = 0

  it('any function throws an error if finished', () => {
    // Given
    const level = {...DEFAULT_LEVEL, input: [1, 2, 3], output: [1]}
    const machine = new Machine(level)
    machine.moveInputToOutput(IGNORE_EDITOR_LINE)

    // When and then
    expect(() => machine.getValueOfInputElement()).toThrowError()
    expect(() => machine.getValueOfMemorySlot(0)).toThrowError()
    expect(() => machine.moveInputToOutput(IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.moveInputToMemorySlot(0, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.moveMemorySlotToOutput(0, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.moveMemorySlotToMemorySlot(0, 1, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.copyMemorySlotToMemorySlot(0, 1, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.copyMemorySlotToOutput(0, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.incrementMemorySlot(0, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.decrementMemorySlot(0, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.addMemorySlotToMemorySlot(0, 1, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.subtractMemorySlotFromMemorySlot(0, 1, IGNORE_EDITOR_LINE)).toThrowError()
    expect(() => machine.error('')).toThrowError()

    // This method should not throw an error.
    machine.checkWinningCondition()
  })

  it('isRunning(), getValueOfMemorySlot(), getValueOfInputElement() work', () => {
    // Given
    const level = {...DEFAULT_LEVEL, input: [1, 2], expectedOut: [1]}
    const machine = new Machine(level)

    // When and then
    expect(machine.getValueOfInputElement()).toEqual(1)
    machine.moveInputToMemorySlot(0, IGNORE_EDITOR_LINE)
    expect(machine.getValueOfInputElement()).toEqual(2)
    expect(machine.getValueOfMemorySlot(0)).toEqual(1)

    expect(machine.isRunning()).toBeTrue()
    machine.moveMemorySlotToOutput(0, IGNORE_EDITOR_LINE)
    expect(machine.isRunning()).toBeFalse()
  });

  it('getValueOfMemorySlot() returns error if memory slot is empty', () => {
    // Given
    const machine = new Machine(DEFAULT_LEVEL)

    // When
    machine.getValueOfMemorySlot(0)

    // Then
    expect(machine.createMachineResult().machineGUIActions).toEqual([{error: 'Trying to read memory slot 0, but it is empty'}])
  })

  it('methods fail if no input is available', () => {
    const test = function (when: (machine: Machine) => void) {
      const machine = new Machine(DEFAULT_LEVEL)
      when(machine)
      expect(machine.createMachineResult().machineGUIActions).toEqual([{error: 'Cannot read from input anymore'}])
    }

    test((machine) => machine.moveInputToOutput(IGNORE_EDITOR_LINE))
    test((machine) => machine.moveInputToMemorySlot(0, IGNORE_EDITOR_LINE))
  })

  it('methods fail if new output value is incorrect', () => {
    const test = function (when: (machine: Machine) => void) {
      const level = {...DEFAULT_LEVEL, input: [1, 1], expectedOut: [0]}
      const machine = new Machine(level)
      machine.moveInputToMemorySlot(0, IGNORE_EDITOR_LINE)
      when(machine)
      expect(machine.createMachineResult().machineGUIActions.pop()).toEqual({error: 'Output is not correct'})
    }

    test((machine) => machine.moveInputToOutput(IGNORE_EDITOR_LINE))
    test((machine) => machine.moveMemorySlotToOutput(0, IGNORE_EDITOR_LINE))
    test((machine) => machine.copyMemorySlotToOutput(0, IGNORE_EDITOR_LINE))
  })

  it('error can be called to force stop at any time', () => {
    // Given
    const level = {...DEFAULT_LEVEL, input: [0, 1], expectedOut: [0]}
    const machine = new Machine(level)

    // When
    machine.error('This is a custom error')

    // Then
    expect(machine.isRunning()).toBeFalse()
    expect(machine.createMachineResult().finishedWithError).toBeTrue()
    expect(machine.createMachineResult().machineGUIActions).toEqual([{error: 'This is a custom error'}])
  })

  describe('MachineGUIAction', () => {
    it('moveInputToOutput finishes if expectedOut is filled', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToOutput(0)

      // Then
      expect(machine.createMachineResult().machineGUIActions).toEqual([
        {editorLine: 0, shiftInput: true, addValueToOutput: 1},
        {finished: true}])
    })

    it('moveInputToMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 2)

      // Then
      expect(machine.createMachineResult().machineGUIActions).toEqual([
        {editorLine: 2, shiftInput: true, memory: [{index: 0, value: 1}]},
      ])
    })

    it('moveMemorySlotToOutput finishes if expectedOut is filled', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 0)
      machine.moveMemorySlotToOutput(0, 1)

      // Then
      // We add a splice, since we don't want the event from moveInputToMemorySlot.
      expect(machine.createMachineResult().machineGUIActions.splice(1)).toEqual([
        {editorLine: 1, addValueToOutput: 1, memory: [{index: 0, value: undefined}]},
        {finished: true}])
    })

    it('moveMemorySlotToMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 1)
      machine.moveMemorySlotToMemorySlot(0, 1, 2)

      // Then
      // We use pop, since we don't want the event from moveInputToMemorySlot.
      expect(machine.createMachineResult().machineGUIActions.pop()).toEqual(
        {editorLine: 2, memory: [{index: 1, value: 1}, {index: 0, value: undefined}]},
      )
    })

    it('copyMemorySlotToMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 1)
      machine.copyMemorySlotToMemorySlot(0, 1, 2)

      // Then
      // We use pop, since we don't want the event from moveInputToMemorySlot.
      expect(machine.createMachineResult().machineGUIActions.pop()).toEqual(
        {editorLine: 2, memory: [{index: 1, value: 1}]},
      )
    })

    it('copyMemorySlotToOutput finishes if expectedOut is filled', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 0)
      machine.copyMemorySlotToOutput(0, 1)

      // Then
      // We add a splice, since we don't want the event from moveInputToMemorySlot.
      expect(machine.createMachineResult().machineGUIActions.splice(1)).toEqual([
        {editorLine: 1, addValueToOutput: 1},
        {finished: true}])
    })

    it('incrementMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 0)
      machine.incrementMemorySlot(0, 1)

      // Then
      // We add a splice, since we don't want the event from moveInputToMemorySlot.
      expect(machine.createMachineResult().machineGUIActions.splice(1)).toEqual([
        {editorLine: 1, memory: [{index: 0, value: 2}]}
      ])
    })

    it('decrementMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 0)
      machine.decrementMemorySlot(0, 1)

      // Then
      // We add a splice, since we don't want the event from moveInputToMemorySlot.
      expect(machine.createMachineResult().machineGUIActions.splice(1)).toEqual([
        {editorLine: 1, memory: [{index: 0, value: 0}]}
      ])
    })

    it('addMemorySlotToMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1, 2], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 0)
      machine.moveInputToMemorySlot(1, 1)
      machine.addMemorySlotToMemorySlot(0, 1, 2)

      // Then
      // We add a pop, since we only want the last event.
      expect(machine.createMachineResult().machineGUIActions.pop()).toEqual(
        {editorLine: 2, memory: [{index: 1, value: 3}]}
      )
    })

    it('subtractMemorySlotFromMemorySlot', () => {
      // Given
      const level = {...DEFAULT_LEVEL, input: [1, 2], expectedOut: [1]}
      const machine = new Machine(level)

      // When
      machine.moveInputToMemorySlot(0, 0)
      machine.moveInputToMemorySlot(1, 1)
      machine.subtractMemorySlotFromMemorySlot(0, 1, 2)

      // Then
      // We add a pop, since we only want the last event.
      expect(machine.createMachineResult().machineGUIActions.pop()).toEqual(
        {editorLine: 2, memory: [{index: 1, value: 1}]}
      )
    })


    describe('checkWinningCondition', () => {
      it('gives error if values are still expected', () => {
        // Given
        const level = {...DEFAULT_LEVEL, input: [], expectedOut: [1]}
        const machine = new Machine(level)

        // When
        machine.checkWinningCondition()

        // Then
        expect(machine.createMachineResult().machineGUIActions).toEqual([
          {error: 'Your program stopped executing, but more output is still expected. Value 1 is still expected.'}
        ])
      })
      it('finishes if all values are delivered', () => {
        // Given
        const level = {...DEFAULT_LEVEL, input: [], expectedOut: []}
        const machine = new Machine(level)

        // When
        machine.checkWinningCondition()

        // Then
        expect(machine.createMachineResult().machineGUIActions).toEqual([
          {finished: true}
        ])
      })
    })
  })

});
