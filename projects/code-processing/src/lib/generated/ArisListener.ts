// Generated from antlr4/Aris.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./ArisParser";
import { LinesContext } from "./ArisParser";
import { LineContext } from "./ArisParser";
import { ExpressionContext } from "./ArisParser";
import { ActionContext } from "./ArisParser";
import { MoveContext } from "./ArisParser";
import { CopyContext } from "./ArisParser";
import { AddContext } from "./ArisParser";
import { SubtractContext } from "./ArisParser";
import { IncrementContext } from "./ArisParser";
import { DecrementContext } from "./ArisParser";
import { LoopContext } from "./ArisParser";
import { BreakContext } from "./ArisParser";
import { ContinueContext } from "./ArisParser";
import { IfZeroContext } from "./ArisParser";
import { IfNotZeroContext } from "./ArisParser";
import { IfPosContext } from "./ArisParser";
import { IfNegContext } from "./ArisParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ArisParser`.
 */
export interface ArisListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ArisParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.lines`.
	 * @param ctx the parse tree
	 */
	enterLines?: (ctx: LinesContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.lines`.
	 * @param ctx the parse tree
	 */
	exitLines?: (ctx: LinesContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.line`.
	 * @param ctx the parse tree
	 */
	enterLine?: (ctx: LineContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.line`.
	 * @param ctx the parse tree
	 */
	exitLine?: (ctx: LineContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.action`.
	 * @param ctx the parse tree
	 */
	enterAction?: (ctx: ActionContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.action`.
	 * @param ctx the parse tree
	 */
	exitAction?: (ctx: ActionContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.move`.
	 * @param ctx the parse tree
	 */
	enterMove?: (ctx: MoveContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.move`.
	 * @param ctx the parse tree
	 */
	exitMove?: (ctx: MoveContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.copy`.
	 * @param ctx the parse tree
	 */
	enterCopy?: (ctx: CopyContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.copy`.
	 * @param ctx the parse tree
	 */
	exitCopy?: (ctx: CopyContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.add`.
	 * @param ctx the parse tree
	 */
	enterAdd?: (ctx: AddContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.add`.
	 * @param ctx the parse tree
	 */
	exitAdd?: (ctx: AddContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.subtract`.
	 * @param ctx the parse tree
	 */
	enterSubtract?: (ctx: SubtractContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.subtract`.
	 * @param ctx the parse tree
	 */
	exitSubtract?: (ctx: SubtractContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.increment`.
	 * @param ctx the parse tree
	 */
	enterIncrement?: (ctx: IncrementContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.increment`.
	 * @param ctx the parse tree
	 */
	exitIncrement?: (ctx: IncrementContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.decrement`.
	 * @param ctx the parse tree
	 */
	enterDecrement?: (ctx: DecrementContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.decrement`.
	 * @param ctx the parse tree
	 */
	exitDecrement?: (ctx: DecrementContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.loop`.
	 * @param ctx the parse tree
	 */
	enterLoop?: (ctx: LoopContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.loop`.
	 * @param ctx the parse tree
	 */
	exitLoop?: (ctx: LoopContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.break`.
	 * @param ctx the parse tree
	 */
	enterBreak?: (ctx: BreakContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.break`.
	 * @param ctx the parse tree
	 */
	exitBreak?: (ctx: BreakContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.continue`.
	 * @param ctx the parse tree
	 */
	enterContinue?: (ctx: ContinueContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.continue`.
	 * @param ctx the parse tree
	 */
	exitContinue?: (ctx: ContinueContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.ifZero`.
	 * @param ctx the parse tree
	 */
	enterIfZero?: (ctx: IfZeroContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.ifZero`.
	 * @param ctx the parse tree
	 */
	exitIfZero?: (ctx: IfZeroContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.ifNotZero`.
	 * @param ctx the parse tree
	 */
	enterIfNotZero?: (ctx: IfNotZeroContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.ifNotZero`.
	 * @param ctx the parse tree
	 */
	exitIfNotZero?: (ctx: IfNotZeroContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.ifPos`.
	 * @param ctx the parse tree
	 */
	enterIfPos?: (ctx: IfPosContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.ifPos`.
	 * @param ctx the parse tree
	 */
	exitIfPos?: (ctx: IfPosContext) => void;

	/**
	 * Enter a parse tree produced by `ArisParser.ifNeg`.
	 * @param ctx the parse tree
	 */
	enterIfNeg?: (ctx: IfNegContext) => void;
	/**
	 * Exit a parse tree produced by `ArisParser.ifNeg`.
	 * @param ctx the parse tree
	 */
	exitIfNeg?: (ctx: IfNegContext) => void;
}

