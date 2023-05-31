// Generated from antlr4/Aris.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `ArisParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface ArisVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `ArisParser.program`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProgram?: (ctx: ProgramContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.lines`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLines?: (ctx: LinesContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.line`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLine?: (ctx: LineContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.action`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction?: (ctx: ActionContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.move`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMove?: (ctx: MoveContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.copy`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCopy?: (ctx: CopyContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.add`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdd?: (ctx: AddContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.subtract`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtract?: (ctx: SubtractContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.increment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncrement?: (ctx: IncrementContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.decrement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecrement?: (ctx: DecrementContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.loop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoop?: (ctx: LoopContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.break`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreak?: (ctx: BreakContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.continue`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinue?: (ctx: ContinueContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.ifZero`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfZero?: (ctx: IfZeroContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.ifNotZero`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNotZero?: (ctx: IfNotZeroContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.ifPos`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfPos?: (ctx: IfPosContext) => Result;

	/**
	 * Visit a parse tree produced by `ArisParser.ifNeg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfNeg?: (ctx: IfNegContext) => Result;
}

