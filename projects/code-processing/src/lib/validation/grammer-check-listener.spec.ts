import {GrammarCheckListener} from "./grammar-check-listener";
import {CompilationError} from "../public-abstractions";
import {Level, Stage} from "../level";
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

declare global {
  namespace jasmine {
    // noinspection JSUnusedGlobalSymbols
    interface Matchers<T> {
      toEqualIgnoringMessage(expected: CompilationErrorWithoutMessage[]): boolean;
    }
  }
}

type CompilationErrorWithoutMessage = {
  lineNr: number
  fromCharIndex: number
  toCharIndex: number
}

export const CustomCompilationErrorMatcher: CustomMatcherFactories = {
  toEqualIgnoringMessage: function (): CustomMatcher {
    return {
      compare: function (actual: CompilationError[], expected: CompilationErrorWithoutMessage[]): CustomMatcherResult {
        if (actual.length != expected.length) {
          return {
            pass: false,
            message: 'Lengths are not the same. Should be ' + expected.length + ', but is ' + actual.length
          }
        }

        for (let i = 0; i < actual.length; i++) {
          const actualElement = actual[i]
          const expectedElement = expected[i]

          if (actualElement.lineNr != expectedElement.lineNr) {
            return {
              pass: false,
              message: 'lineNr doesnt match. Should be ' + expectedElement.lineNr + ', but is ' + actualElement.lineNr
            }
          }

          if (actualElement.fromCharIndex != expectedElement.fromCharIndex) {
            return {
              pass: false,
              message: 'fromCharIndex doesnt match. Should be ' + expectedElement.fromCharIndex + ', but is ' + actualElement.fromCharIndex
            }
          }

          if (actualElement.toCharIndex != expectedElement.toCharIndex) {
            return {
              pass: false,
              message: 'toCharIndex doesnt match. Should be ' + expectedElement.toCharIndex + ', but is ' + actualElement.toCharIndex
            }
          }
        }

        // Result and message generation.
        return {
          pass: true
        }
      }
    }
  }
};


describe('GrammarCheckListener', () => {
  beforeEach(() => {
    jasmine.addMatchers(CustomCompilationErrorMatcher)
  });

  const DEFAULT_LEVEL: Level = {
    stage: Stage.MAIN,
    id: 0,
    title: '',
    input: [],
    expectedOut: [],
    nrOfMemorySlots: 100,
    description: ''
  }

  it('gives compile error on incorrect commands', () => {
    // Given
    const input = "move input to 0\nmov 0 to output"

    // When
    const errors = new GrammarCheckListener().checkGrammer(DEFAULT_LEVEL, input)

    // Then
    expect(errors).toEqualIgnoringMessage([{lineNr: 2, fromCharIndex: 0, toCharIndex: 3}])
  });

  it('brackets should close', () => {
    // Given
    const input = "loop {\n  loop {\n    move 0 to output\n  }\n"

    // When
    const errors = new GrammarCheckListener().checkGrammer(DEFAULT_LEVEL, input)

    // Then
    expect(errors).toEqualIgnoringMessage([{lineNr: 5, fromCharIndex: 0, toCharIndex: 1}])
  });

  it('empty brackets are not allowed for loops', () => {
    // Given
    const input = "incr 0\nloop {\n\n}"

    // When
    const errors = new GrammarCheckListener().checkGrammer(DEFAULT_LEVEL, input)

    // Then
    expect(errors).toEqualIgnoringMessage([{lineNr: 2, fromCharIndex: 0, toCharIndex: 4}])
  });

  it('only allow memory slots that are used in the level', () => {
    // Given
    const level: Level = {
      ...DEFAULT_LEVEL,
      nrOfMemorySlots: 0, // Any memory slot value is considered invalid.
    }
    const input =
      "move 1 to 2\n" +
      "copy 1 to 2\n" +
      "add 1 to 2\n" +
      "sub 1 from 2\n" +
      "incr 1\n" +
      "decr 1\n" +
      "ifzero 1 {\n}\n" +
      "ifnotzero 1 {\n}\n" +
      "ifpos 1 {\n}\n" +
      "ifneg 1 {\n}\n" +
      "move adsf to asdf\n"

    // When
    const errors = new GrammarCheckListener().checkGrammer(level, input)

    // Then
    expect(errors).toEqualIgnoringMessage([
      // Move
      {lineNr: 1, fromCharIndex: 5, toCharIndex: 6},
      {lineNr: 1, fromCharIndex: 10, toCharIndex: 11},
      // Copy
      {lineNr: 2, fromCharIndex: 5, toCharIndex: 6},
      {lineNr: 2, fromCharIndex: 10, toCharIndex: 11},
      // Add
      {lineNr: 3, fromCharIndex: 4, toCharIndex: 5},
      {lineNr: 3, fromCharIndex: 9, toCharIndex: 10},
      // Sub
      {lineNr: 4, fromCharIndex: 4, toCharIndex: 5},
      {lineNr: 4, fromCharIndex: 11, toCharIndex: 12},
      // Incr
      {lineNr: 5, fromCharIndex: 5, toCharIndex: 6},
      // Decr
      {lineNr: 6, fromCharIndex: 5, toCharIndex: 6},
      // Ifzero
      {lineNr: 7, fromCharIndex: 7, toCharIndex: 8},
      // Ifnotzero
      {lineNr: 9, fromCharIndex: 10, toCharIndex: 11},
      // Ifpos
      {lineNr: 11, fromCharIndex: 6, toCharIndex: 7},
      // Ifneg
      {lineNr: 13, fromCharIndex: 6, toCharIndex: 7},
      // Memory slot that are not numbers
      {lineNr: 15, fromCharIndex: 5, toCharIndex: 9},
      {lineNr: 15, fromCharIndex: 13, toCharIndex: 17},
    ])
  });

  it('continue and break can only be used inside loops', () => {
    // Given
    const input =
      "break\n" +
      "continue"

    // When
    const errors = new GrammarCheckListener().checkGrammer(DEFAULT_LEVEL, input)

    // Then
    expect(errors).toEqualIgnoringMessage([
      {lineNr: 1, fromCharIndex: 0, toCharIndex: 5},
      {lineNr: 2, fromCharIndex: 0, toCharIndex: 8},
    ])
  })
});
