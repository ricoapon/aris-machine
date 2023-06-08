import {LevelFinder} from "./level-finder";
import {
  CompilationError,
  Level,
  MachineEditor,
  MachineGUI,
  MachineGuiExecutor,
  MachineGuiExecutorCreator,
  Parser,
  Stage
} from "code-processing";

describe('Main levels', () => {
  function getLevel(i: number): Level {
    return new LevelFinder().getLevel(Stage.MAIN, i)
  }

  function checkSolution(level: Level, code: string) {
    const parser: Parser = new Parser()
    expect(parser.validate(level, code)).toHaveSize(0)
    const creator: MachineGuiExecutorCreator = parser.parse(level, code)
    const executor: MachineGuiExecutor = creator.initialize(new MockMachineGUI(), new MockMachineEditor())
    expect(executor.getFinishedWithError()).toBeFalse()
  }

  it('1', () => {
    checkSolution(getLevel(1),
      'move input to output\n' +
      'move input to output\n' +
      'move input to output\n')
  })

  it('2', () => {
    checkSolution(getLevel(2),
      'loop {\n' +
      '  move input to output\n' +
      '}\n')
  })
  it('3', () => {
    checkSolution(getLevel(3),
      'loop {\n' +
      '  move input to 0\n' +
      '  move input to output\n' +
      '  move 0 to output\n' +
      '}\n')
  })
  it('4', () => {
    checkSolution(getLevel(4),
      'loop {\n' +
      '  move input to 0\n' +
      '  move input to 1\n' +
      '  add 0 to 1\n' +
      '  move 1 to output\n' +
      '}\n')
  })
  it('5', () => {
    checkSolution(getLevel(5),
      'loop {\n' +
      '  move input to 0\n' +
      '  copy 0 to 1\n' +
      '  move 0 to output\n' +
      '  move 1 to output\n' +
      '}\n')
  })
  it('6', () => {
    checkSolution(getLevel(6),
      'loop {\n' +
      '  move input to 0\n' +
      '  copy 0 to 1\n' +
      '  add 1 to 0\n' +
      '  add 1 to 0\n' +
      '  move 0 to output\n' +
      '}\n')
  })
  it('7', () => {
    checkSolution(getLevel(7),
      'loop {\n' +
      '  move input to 0\n' +
      '  add 0 to 0\n' +
      '  add 0 to 0\n' +
      '  add 0 to 0\n' +
      '  move 0 to output\n' +
      '}\n')
  })
  it('8', () => {
    checkSolution(getLevel(8),
      'loop {\n' +
      '  move input to 0\n' +
      '  add 0 to 0\n' +
      '  add 0 to 0\n' +
      '  add 0 to 0\n' +
      '  copy 0 to 1\n' +
      '  add 0 to 1\n' +
      '  add 0 to 1\n' +
      '  add 0 to 1\n' +
      '  add 0 to 1\n' +
      '  move 1 to output\n' +
      '}\n')
  })
  it('9', () => {
    checkSolution(getLevel(9),
      'loop {\n' +
      '  ifzero input {\n' +
      '    move input to output\n' +
      '  }\n' +
      '  ifnotzero input {\n' +
      '    move input to 0\n' +
      '  }\n' +
      '}\n')
  })
  it('10', () => {
    checkSolution(getLevel(10),
      'loop {\n' +
      '  move input to 0\n' +
      '  ifpos 0 {\n' +
      '    incr 0\n' +
      '  }\n' +
      '  ifneg 0 {\n' +
      '    decr 0\n' +
      '  }\n' +
      '  ifnotzero 0 {\n' +
      '    move 0 to output\n' +
      '  }\n' +
      '}\n')
  })
  it('11', () => {
    checkSolution(getLevel(11),
      'loop {\n' +
      '  move input to 0\n' +
      '  move input to 1\n' +
      '  sub 0 from 1\n' +
      '  move 1 to output\n' +
      '  move input to 0\n' +
      '  move input to 1\n' +
      '  sub 1 from 0\n' +
      '  move 0 to output\n' +
      '}\n')
  })
  it('12', () => {
    checkSolution(getLevel(12),
      'loop {\n' +
      '  move input to 0\n' +
      '  move input to 1\n' +
      '  sub 1 from 0\n' +
      '  ifzero 0 {\n' +
      '    move 1 to output\n' +
      '  }\n' +
      '}\n')
  })
  it('13', () => {
    checkSolution(getLevel(13),
      'loop {\n' +
      '  move input to 0\n' +
      '  move input to 1\n' +
      '  copy 0 to 2\n' +
      '  sub 1 from 0\n' +
      '  ifpos 0 {\n' +
      '    move 2 to output\n' +
      '  }\n' +
      '  ifneg 0 {\n' +
      '    move 1 to output\n' +
      '  }\n' +
      '  ifzero 0 {\n' +
      '    move 1 to output\n' +
      '  }\n' +
      '}\n')
  })
  it('14', () => {
    checkSolution(getLevel(14),
      'loop {\n' +
      '  move input to 0\n' +
      '  ifneg 0 {\n' +
      '    copy 0 to 1\n' +
      '\tsub 1 from 0\n' +
      '\tsub 1 from 0\n' +
      '  }\n' +
      '  move 0 to output\n' +
      '}\n')
  })
  it('15', () => {
    checkSolution(getLevel(15),
      'loop {\n' +
      '  move input to 0\n' +
      '  loop {\n' +
      '    copy 0 to 1\n' +
      '    move 1 to output\n' +
      '    ifzero 0 {\n' +
      '      break\n' +
      '    }\n' +
      '    ifneg 0 {\n' +
      '      incr 0\n' +
      '    }\n' +
      '    ifpos 0 {\n' +
      '      decr 0\n' +
      '    }\n' +
      '  }\n' +
      '}\n')
  })
  it('16', () => {
    checkSolution(getLevel(16),
      'loop {\n' +
      '  move input to 0\n' +
      '  move input to 1\n' +
      '  ifzero 0 {\n' +
      '    move 0 to output\n' +
      '    continue\n' +
      '  }\n' +
      '  copy 1 to 2\n' +
      '  loop {\n' +
      '    decr 0\n' +
      '    ifzero 0 {\n' +
      '      move 1 to output\n' +
      '      break\n' +
      '    }\n' +
      '    add 2 to 1\n' +
      '  }\n' +
      '}\n')
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
