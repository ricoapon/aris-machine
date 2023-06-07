import {ArisListener} from "../generated/ArisListener";
import {
  ActionContext,
  AddContext,
  ArisParser,
  BreakContext,
  ContinueContext,
  CopyContext,
  DecrementContext,
  ExpressionContext,
  IfNegContext,
  IfNotZeroContext,
  IfPosContext,
  IfZeroContext,
  IncrementContext,
  LineContext,
  LinesContext,
  LoopContext,
  MoveContext,
  ProgramContext,
  SubtractContext
} from "../generated/ArisParser";
import {CharStreams, CommonTokenStream, Recognizer} from "antlr4ts";
import {ArisLexer} from "../generated/ArisLexer";
import {ParseTreeWalker, TerminalNode} from "antlr4ts/tree";
import {ANTLRErrorListener} from "antlr4ts/ANTLRErrorListener";
import {RecognitionException} from "antlr4ts/RecognitionException";
import {CompilationError} from "../public-abstractions";
import {Level} from "../level";

class ExprErrorListener implements ANTLRErrorListener<void> {
  compilationErrors: CompilationError[] = []

  syntaxError<T>(recognizer: Recognizer<T, any>, offendingSymbol: T | undefined, line: number, charPositionInLine: number, msg: string, e: RecognitionException | undefined): void {
    let length = 1
    if (offendingSymbol != undefined) {
      // @ts-ignore
      const text = offendingSymbol.text.replace("<EOF>", "")
      length = text.length

      // Length is negative if there is something missing (like forgotten bracket).
      if (length <= 0) {
        length = 1
      }
    }

    this.compilationErrors.push({
      lineNr: line,
      fromCharIndex: charPositionInLine,
      toCharIndex: charPositionInLine + length,
      message: msg
    })
  }
}


export class GrammarCheckListener implements ArisListener {
  compilationErrors: CompilationError[]
  level: Level
  loopDepth = 0

  checkGrammer(level: Level, input: string): CompilationError[] {
    this.level = level
    this.compilationErrors = []

    const inputStream = CharStreams.fromString(input);
    const lexer = new ArisLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ArisParser(tokenStream);
    const errorListener = new ExprErrorListener()
    // Default error listeners log to the console, which we don't want.
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener)

    // @ts-ignore
    ParseTreeWalker.DEFAULT.walk(this, parser.program());

    errorListener.compilationErrors.push(...this.compilationErrors)
    return errorListener.compilationErrors
  }

  enterAction(ctx: ActionContext): void {
  }

  enterAdd(ctx: AddContext): void {
    for (let memorySlot of ctx.MEMORY_SLOT()) {
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(memorySlot)
    }
  }

  enterBreak(ctx: BreakContext): void {
    if (this.loopDepth == 0) {
      this.compilationErrors.push({
        lineNr: ctx.BREAK().symbol.line,
        fromCharIndex: ctx.BREAK().symbol.charPositionInLine,
        toCharIndex: ctx.BREAK().symbol.charPositionInLine + ctx.BREAK().symbol.text!.length,
        message: 'Break can only occur inside a loop'
      })
    }
  }

  enterContinue(ctx: ContinueContext): void {
    if (this.loopDepth == 0) {
      this.compilationErrors.push({
        lineNr: ctx.CONTINUE().symbol.line,
        fromCharIndex: ctx.CONTINUE().symbol.charPositionInLine,
        toCharIndex: ctx.CONTINUE().symbol.charPositionInLine + ctx.CONTINUE().symbol.text!.length,
        message: 'Continue can only occur inside a loop'
      })
    }
  }

  enterCopy(ctx: CopyContext): void {
    for (let memorySlot of ctx.MEMORY_SLOT()) {
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(memorySlot)
    }
  }

  enterDecrement(ctx: DecrementContext): void {
    this.addCompilationErrorIfMemorySlotIndexIsInvalid(ctx.MEMORY_SLOT())
  }

  enterExpression(ctx: ExpressionContext): void {
  }

  enterIfNeg(ctx: IfNegContext): void {
    if (ctx.MEMORY_SLOT() != undefined) {
      // @ts-ignore
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(ctx.MEMORY_SLOT())
    }
  }

  enterIfNotZero(ctx: IfNotZeroContext): void {
    if (ctx.MEMORY_SLOT() != undefined) {
      // @ts-ignore
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(ctx.MEMORY_SLOT())
    }
  }

  enterIfPos(ctx: IfPosContext): void {
    if (ctx.MEMORY_SLOT() != undefined) {
      // @ts-ignore
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(ctx.MEMORY_SLOT())
    }
  }

  enterIfZero(ctx: IfZeroContext): void {
    if (ctx.MEMORY_SLOT() != undefined) {
      // @ts-ignore
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(ctx.MEMORY_SLOT())
    }
  }

  enterIncrement(ctx: IncrementContext): void {
    this.addCompilationErrorIfMemorySlotIndexIsInvalid(ctx.MEMORY_SLOT())
  }

  enterLine(ctx: LineContext): void {
  }

  enterLines(ctx: LinesContext): void {
  }

  enterLoop(ctx: LoopContext): void {
    this.loopDepth++
    if (ctx.lines().line().length == 0) {
      this.compilationErrors.push({
        lineNr: ctx.LOOP().symbol.line,
        fromCharIndex: ctx.LOOP().symbol.charPositionInLine,
        toCharIndex: ctx.LOOP().symbol.charPositionInLine + ctx.LOOP().symbol.text!.length,
        message: 'A loop must have a body'
      })
    }
  }

  exitLoop(ctx: LoopContext): void {
    this.loopDepth--
  }

  enterMove(ctx: MoveContext): void {
    for (let memorySlot of ctx.MEMORY_SLOT()) {
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(memorySlot)
    }
  }

  enterProgram(ctx: ProgramContext): void {
  }

  enterSubtract(ctx: SubtractContext): void {
    for (let memorySlot of ctx.MEMORY_SLOT()) {
      this.addCompilationErrorIfMemorySlotIndexIsInvalid(memorySlot)
    }
  }

  private addCompilationErrorIfMemorySlotIndexIsInvalid(memorySlot: TerminalNode) {
    const memorySlotIndex = +memorySlot.text
    if (isNaN(memorySlotIndex) || memorySlotIndex >= this.level.nrOfMemorySlots) {
      this.compilationErrors.push({
        lineNr: memorySlot.symbol.line,
        fromCharIndex: memorySlot.symbol.charPositionInLine,
        toCharIndex: memorySlot.symbol.charPositionInLine + memorySlot.text.length,
        message: 'Memory slot ' + memorySlot.text + ' does not exist'
      })
    }
  }
}
