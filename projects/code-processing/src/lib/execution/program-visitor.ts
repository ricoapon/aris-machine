import {ArisVisitor} from "../generated/ArisVisitor";
import {Machine, MachineResult} from "./machine";
import {ErrorNode, ParseTree, RuleNode} from "antlr4ts/tree";
import {TerminalNode} from "antlr4ts/tree/TerminalNode";
import {
  AddContext,
  ArisParser,
  BreakContext,
  ContinueContext,
  CopyContext,
  DecrementContext,
  IfNegContext,
  IfNotZeroContext,
  IfPosContext,
  IfZeroContext,
  IncrementContext,
  LinesContext,
  LoopContext,
  MoveContext,
  SubtractContext
} from "../generated/ArisParser";
import {CharStreams, CommonTokenStream} from "antlr4ts";
import {ArisLexer} from "../generated/ArisLexer";
import {Level} from "../level";

enum BreakContinueState {
  IGNORE,
  CONTINUE,
  BREAK,
}

/**
 * Executes a program by walking through the code using the visitor pattern.
 * State will be processed in {@link Machine} and the result will be returned.
 */
export class ProgramVisitor implements ArisVisitor<void> {
  private machine: Machine
  // If execute break or continue commands, we want to go back to the most recent loop we started executing.
  // We cannot "go back" in the visitor pattern, so the solution is stop block any execution of code until
  // we are back in the visitLoop function. Not the prettiest solution, but it works.
  private breakContinueState: BreakContinueState = BreakContinueState.IGNORE

  private shouldStopExecutionUntilLoopIsReached(): boolean {
    return this.breakContinueState != BreakContinueState.IGNORE
  }

  run(level: Level, input: string): MachineResult {
    this.machine = new Machine(level)

    const inputStream = CharStreams.fromString(input);
    const lexer = new ArisLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ArisParser(tokenStream);

    this.visit(parser.program())
    return this.machine.createMachineResult()
  }

  visit(tree: ParseTree): void {
    for (let i = 0; i < tree.childCount; i++) {
      this.call(tree.getChild(i))
    }
    this.machine.checkWinningCondition();
  }

  visitErrorNode(node: ErrorNode): void {
  }

  visitTerminal(node: TerminalNode): void {
  }

  visitMove(ctx: MoveContext) {
    this.templateMethod(() => {
      const editorLine = ctx.start.line;
      if (ctx.INPUT() != undefined && ctx.OUTPUT() != undefined) {
        this.machine.moveInputToOutput(editorLine)
      } else if (ctx.INPUT() != undefined) {
        const memorySlot = +ctx.MEMORY_SLOT(0).text
        this.machine.moveInputToMemorySlot(memorySlot, editorLine)
      } else if (ctx.OUTPUT() != undefined) {
        const memorySlot = +ctx.MEMORY_SLOT(0).text
        this.machine.moveMemorySlotToOutput(memorySlot, editorLine)
      } else {
        const from = +ctx.MEMORY_SLOT(0).text
        const to = +ctx.MEMORY_SLOT(1).text
        this.machine.moveMemorySlotToMemorySlot(from, to, editorLine)
      }
    })
  }

  visitCopy(ctx: CopyContext) {
    this.templateMethod(() => {
      const editorLine = ctx.start.line;
      const from = +ctx.MEMORY_SLOT(0)

      if (ctx.OUTPUT() != undefined) {
        this.machine.copyMemorySlotToOutput(from, editorLine)
      } else {
        const to = +ctx.MEMORY_SLOT(1)
        this.machine.copyMemorySlotToMemorySlot(from, to, editorLine)
      }
    })
  }

  visitAdd(ctx: AddContext) {
    this.templateMethod(() => {
      const editorLine = ctx.start.line;
      const from = +ctx.MEMORY_SLOT(0)
      const to = +ctx.MEMORY_SLOT(1)
      this.machine.addMemorySlotToMemorySlot(from, to, editorLine)
    })
  }

  visitSubtract(ctx: SubtractContext): void {
    this.templateMethod(() => {
      const editorLine = ctx.start.line;
      const from = +ctx.MEMORY_SLOT(0)
      const to = +ctx.MEMORY_SLOT(1)
      this.machine.subtractMemorySlotFromMemorySlot(from, to, editorLine)
    })
  }

  visitIncrement(ctx: IncrementContext): void {
    this.templateMethod(() => {
      const editorLine = ctx.start.line;
      this.machine.incrementMemorySlot(+ctx.MEMORY_SLOT(), editorLine)
    })
  }

  visitDecrement(ctx: DecrementContext): void {
    this.templateMethod(() => {
      const editorLine = ctx.start.line;
      this.machine.decrementMemorySlot(+ctx.MEMORY_SLOT(), editorLine)
    })
  }

  visitLoop(ctx: LoopContext) {
    this.templateMethod(() => {
      // To prevent loops to go infinite, we set a max that we will never reach in normal situations.
      let counter = 0;
      while (counter < 1000 && this.machine.isRunning()) {
        this.callLines(ctx.lines())
        counter++

        if (this.breakContinueState == BreakContinueState.BREAK) {
          this.breakContinueState = BreakContinueState.IGNORE
          break;
        } else if (this.breakContinueState == BreakContinueState.CONTINUE) {
          this.breakContinueState = BreakContinueState.IGNORE
        }

        if (!this.machine.isRunning()) {
          return
        }
      }

      if (counter == 1000) {
        this.machine.error('Infinite loop reached')
      }
    })
  }

  // noinspection JSUnusedLocalSymbols
  visitBreak(ctx: BreakContext): void {
    this.templateMethod(() => {
      this.breakContinueState = BreakContinueState.BREAK
    })
  }

  // noinspection JSUnusedLocalSymbols
  visitContinue(ctx: ContinueContext): void {
    this.templateMethod(() => {
      this.breakContinueState = BreakContinueState.CONTINUE
    })
  }

  visitIfZero(ctx: IfZeroContext) {
    this.ifTemplate(ctx, (value: number) => value == 0)
  }

  visitIfNotZero(ctx: IfNotZeroContext) {
    this.ifTemplate(ctx, (value: number) => value != 0)
  }

  visitIfPos(ctx: IfPosContext): void {
    this.ifTemplate(ctx, (value: number) => value > 0)
  }

  visitIfNeg(ctx: IfNegContext): void {
    this.ifTemplate(ctx, (value: number) => value < 0)
  }

  // We use ctx as any, because we know that it has certain methods we need and there is no way to enforce this easily.
  private ifTemplate(ctx: any, check: (value: number) => boolean) {
    this.templateMethod(() => {
      let value
      if (ctx.INPUT() != undefined) {
        value = this.machine.getValueOfInputElement()
      } else {
        // We know the value of memory slot is defined here.
        // @ts-ignore
        value = this.machine.getValueOfMemorySlot(+ctx.MEMORY_SLOT())
      }
      if (check(value)) {
        this.callLines(ctx.lines())
      }
    })
  }

  visitChildren(node: RuleNode): void {
    for (let i = 0; i < node.childCount; i++) {
      this.call(node.getChild(i))
    }
  }

  private callLines(lines: LinesContext) {
    for (let i = 0; i < lines.line().length; i++) {
      this.call(lines.line()[i])
    }
  }

  private call(tree: ParseTree) {
    if (this.machine.isRunning()) {
      tree.accept(this)
    }
  }

  private templateMethod(fn: () => void) {
    if (!this.machine.isRunning()) {
      return
    }

    if (this.shouldStopExecutionUntilLoopIsReached()) {
      return
    }

    fn()
  }
}
