import {MachineGuiExecutorCreator} from "./execution/machine-gui-executor-creator";
import {Level} from "./level";
import {CompilationError} from "./public-abstractions";
import {GrammarCheckListener} from "./validation/grammar-check-listener";
import {ProgramVisitor} from "./execution/program-visitor";

export class Parser {
  validate(level: Level, code: string): CompilationError[] {
    const grammar = new GrammarCheckListener()
    return grammar.checkGrammer(level, code)
  }

  parse(level: Level, code: string): MachineGuiExecutorCreator {
    const executor = new ProgramVisitor()
    const result = executor.run(level, code)

    return new MachineGuiExecutorCreator(level, result)
  }
}
