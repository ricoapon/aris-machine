import {Level, Stage} from "../level";
import {ProgramVisitor} from "./program-visitor";

// Note: level solutions are tested, which means that this code is already heavily tested (at least happy flows).
// This means we need to focus on error situations or very specific situations (like testing a difficult to program keyword).
describe('ProgramVisitor', () => {
  const DEFAULT_LEVEL: Level = {
    stage: Stage.MAIN,
    id: 0,
    title: '',
    input: [],
    expectedOut: [],
    exampleInput: [],
    exampleOutput: [],
    nrOfMemorySlots: 100,
    description: ''
  }

  it('infinite loops are cut off', () => {
    // Given
    const level = {...DEFAULT_LEVEL, input: [1], expectedOut: [0]}
    const code =
      'move input to 0\n' +
      'loop {\n' +
      '  move 0 to 1\n' +
      '  move 1 to 0\n' +
      '}'

    // When
    const result = new ProgramVisitor().run(level, code)

    // Then
    expect(result.finishedWithError).toBeTrue()
    expect(result.machineGUIActions.pop()).toEqual({error: 'Infinite loop reached'})
  })

  it('break only breaks out of the most inner loop', () => {
    // Given
    const level = {...DEFAULT_LEVEL, input: [0], expectedOut: [1]}
    const code =
      'move input to 0\n' +
      'loop {\n' +
      '  loop {\n' +
      '    break\n' +
      '    incr 0\n' +
      '  }\n' +
      '  incr 0\n' +
      '  move 0 to output\n' +
      '}'

    // When
    const result = new ProgramVisitor().run(level, code)

    // Then
    expect(result.finishedWithError).toBeFalse()
    expect(result.machineGUIActions.pop()).toEqual({finished: true})
  })

  it('continue skips all commands until going back to the for loop again', () => {
    // Given
    const level = {...DEFAULT_LEVEL, input: [5], expectedOut: [0]}
    const code =
      'move input to 0\n' +
      'loop {\n' +
      '  decr 0\n' +
      '  ifnotzero 0 {\n' +
      '    continue\n' +
      '  }\n' +
      '  move 0 to output\n' +
      '}'

    // When
    const result = new ProgramVisitor().run(level, code)

    // Then
    expect(result.finishedWithError).toBeFalse()
    expect(result.machineGUIActions.pop()).toEqual({finished: true})
  })
});
