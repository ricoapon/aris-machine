// Generated from antlr4/Aris.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ArisListener } from "./ArisListener";
import { ArisVisitor } from "./ArisVisitor";


export class ArisParser extends Parser {
	public static readonly ADD = 1;
	public static readonly SUB = 2;
	public static readonly COPY = 3;
	public static readonly MOVE = 4;
	public static readonly TO = 5;
	public static readonly FROM = 6;
	public static readonly INPUT = 7;
	public static readonly OUTPUT = 8;
	public static readonly LOOP = 9;
	public static readonly BREAK = 10;
	public static readonly CONTINUE = 11;
	public static readonly IFZERO = 12;
	public static readonly IFNOTZERO = 13;
	public static readonly IFPOS = 14;
	public static readonly IFNEG = 15;
	public static readonly INCR = 16;
	public static readonly DECR = 17;
	public static readonly CURLY_OPEN = 18;
	public static readonly CURLY_CLOSED = 19;
	public static readonly MEMORY_SLOT = 20;
	public static readonly MEMORY_SLOT_NUMBER = 21;
	public static readonly MEMORY_SLOT_NAME = 22;
	public static readonly NEWLINE = 23;
	public static readonly LINE_COMMENT = 24;
	public static readonly UNIDENTIFIED = 25;
	public static readonly WHITESPACE = 26;
	public static readonly ERROR_CHARACTER = 27;
	public static readonly RULE_program = 0;
	public static readonly RULE_lines = 1;
	public static readonly RULE_line = 2;
	public static readonly RULE_expression = 3;
	public static readonly RULE_action = 4;
	public static readonly RULE_move = 5;
	public static readonly RULE_copy = 6;
	public static readonly RULE_add = 7;
	public static readonly RULE_subtract = 8;
	public static readonly RULE_increment = 9;
	public static readonly RULE_decrement = 10;
	public static readonly RULE_loop = 11;
	public static readonly RULE_break = 12;
	public static readonly RULE_continue = 13;
	public static readonly RULE_ifZero = 14;
	public static readonly RULE_ifNotZero = 15;
	public static readonly RULE_ifPos = 16;
	public static readonly RULE_ifNeg = 17;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "lines", "line", "expression", "action", "move", "copy", "add", 
		"subtract", "increment", "decrement", "loop", "break", "continue", "ifZero", 
		"ifNotZero", "ifPos", "ifNeg",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'add'", "'sub'", "'copy'", "'move'", "'to'", "'from'", "'input'", 
		"'output'", "'loop'", "'break'", "'continue'", "'ifzero'", "'ifnotzero'", 
		"'ifpos'", "'ifneg'", "'incr'", "'decr'", "'{'", "'}'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ADD", "SUB", "COPY", "MOVE", "TO", "FROM", "INPUT", "OUTPUT", 
		"LOOP", "BREAK", "CONTINUE", "IFZERO", "IFNOTZERO", "IFPOS", "IFNEG", 
		"INCR", "DECR", "CURLY_OPEN", "CURLY_CLOSED", "MEMORY_SLOT", "MEMORY_SLOT_NUMBER", 
		"MEMORY_SLOT_NAME", "NEWLINE", "LINE_COMMENT", "UNIDENTIFIED", "WHITESPACE", 
		"ERROR_CHARACTER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ArisParser._LITERAL_NAMES, ArisParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ArisParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Aris.g4"; }

	// @Override
	public get ruleNames(): string[] { return ArisParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ArisParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ArisParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ArisParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 37;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 36;
				this.line();
				}
				}
				this.state = 39;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArisParser.ADD) | (1 << ArisParser.SUB) | (1 << ArisParser.COPY) | (1 << ArisParser.MOVE) | (1 << ArisParser.LOOP) | (1 << ArisParser.BREAK) | (1 << ArisParser.CONTINUE) | (1 << ArisParser.IFZERO) | (1 << ArisParser.IFNOTZERO) | (1 << ArisParser.IFPOS) | (1 << ArisParser.IFNEG) | (1 << ArisParser.INCR) | (1 << ArisParser.DECR))) !== 0));
			this.state = 41;
			this.match(ArisParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lines(): LinesContext {
		let _localctx: LinesContext = new LinesContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ArisParser.RULE_lines);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 46;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ArisParser.ADD) | (1 << ArisParser.SUB) | (1 << ArisParser.COPY) | (1 << ArisParser.MOVE) | (1 << ArisParser.LOOP) | (1 << ArisParser.BREAK) | (1 << ArisParser.CONTINUE) | (1 << ArisParser.IFZERO) | (1 << ArisParser.IFNOTZERO) | (1 << ArisParser.IFPOS) | (1 << ArisParser.IFNEG) | (1 << ArisParser.INCR) | (1 << ArisParser.DECR))) !== 0)) {
				{
				{
				this.state = 43;
				this.line();
				}
				}
				this.state = 48;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public line(): LineContext {
		let _localctx: LineContext = new LineContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ArisParser.RULE_line);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 49;
			this.expression();
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ArisParser.NEWLINE) {
				{
				{
				this.state = 50;
				this.match(ArisParser.NEWLINE);
				}
				}
				this.state = 55;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ArisParser.RULE_expression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 56;
			this.action();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action(): ActionContext {
		let _localctx: ActionContext = new ActionContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ArisParser.RULE_action);
		try {
			this.state = 71;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ArisParser.COPY:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 58;
				this.copy();
				}
				break;
			case ArisParser.MOVE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 59;
				this.move();
				}
				break;
			case ArisParser.ADD:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 60;
				this.add();
				}
				break;
			case ArisParser.SUB:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 61;
				this.subtract();
				}
				break;
			case ArisParser.INCR:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 62;
				this.increment();
				}
				break;
			case ArisParser.DECR:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 63;
				this.decrement();
				}
				break;
			case ArisParser.LOOP:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 64;
				this.loop();
				}
				break;
			case ArisParser.BREAK:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 65;
				this.break();
				}
				break;
			case ArisParser.CONTINUE:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 66;
				this.continue();
				}
				break;
			case ArisParser.IFZERO:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 67;
				this.ifZero();
				}
				break;
			case ArisParser.IFNOTZERO:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 68;
				this.ifNotZero();
				}
				break;
			case ArisParser.IFPOS:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 69;
				this.ifPos();
				}
				break;
			case ArisParser.IFNEG:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 70;
				this.ifNeg();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public move(): MoveContext {
		let _localctx: MoveContext = new MoveContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ArisParser.RULE_move);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 73;
			this.match(ArisParser.MOVE);
			this.state = 74;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.INPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 75;
			this.match(ArisParser.TO);
			this.state = 76;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.OUTPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public copy(): CopyContext {
		let _localctx: CopyContext = new CopyContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ArisParser.RULE_copy);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			this.match(ArisParser.COPY);
			this.state = 79;
			this.match(ArisParser.MEMORY_SLOT);
			this.state = 80;
			this.match(ArisParser.TO);
			this.state = 81;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.OUTPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public add(): AddContext {
		let _localctx: AddContext = new AddContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ArisParser.RULE_add);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 83;
			this.match(ArisParser.ADD);
			this.state = 84;
			this.match(ArisParser.MEMORY_SLOT);
			this.state = 85;
			this.match(ArisParser.TO);
			this.state = 86;
			this.match(ArisParser.MEMORY_SLOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subtract(): SubtractContext {
		let _localctx: SubtractContext = new SubtractContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ArisParser.RULE_subtract);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this.match(ArisParser.SUB);
			this.state = 89;
			this.match(ArisParser.MEMORY_SLOT);
			this.state = 90;
			this.match(ArisParser.FROM);
			this.state = 91;
			this.match(ArisParser.MEMORY_SLOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public increment(): IncrementContext {
		let _localctx: IncrementContext = new IncrementContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ArisParser.RULE_increment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 93;
			this.match(ArisParser.INCR);
			this.state = 94;
			this.match(ArisParser.MEMORY_SLOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decrement(): DecrementContext {
		let _localctx: DecrementContext = new DecrementContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ArisParser.RULE_decrement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 96;
			this.match(ArisParser.DECR);
			this.state = 97;
			this.match(ArisParser.MEMORY_SLOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public loop(): LoopContext {
		let _localctx: LoopContext = new LoopContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ArisParser.RULE_loop);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 99;
			this.match(ArisParser.LOOP);
			this.state = 100;
			this.match(ArisParser.CURLY_OPEN);
			this.state = 101;
			this.match(ArisParser.NEWLINE);
			this.state = 102;
			this.lines();
			this.state = 103;
			this.match(ArisParser.CURLY_CLOSED);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public break(): BreakContext {
		let _localctx: BreakContext = new BreakContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ArisParser.RULE_break);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 105;
			this.match(ArisParser.BREAK);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public continue(): ContinueContext {
		let _localctx: ContinueContext = new ContinueContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ArisParser.RULE_continue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 107;
			this.match(ArisParser.CONTINUE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifZero(): IfZeroContext {
		let _localctx: IfZeroContext = new IfZeroContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ArisParser.RULE_ifZero);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 109;
			this.match(ArisParser.IFZERO);
			this.state = 110;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.INPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 111;
			this.match(ArisParser.CURLY_OPEN);
			this.state = 112;
			this.match(ArisParser.NEWLINE);
			this.state = 113;
			this.lines();
			this.state = 114;
			this.match(ArisParser.CURLY_CLOSED);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifNotZero(): IfNotZeroContext {
		let _localctx: IfNotZeroContext = new IfNotZeroContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ArisParser.RULE_ifNotZero);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 116;
			this.match(ArisParser.IFNOTZERO);
			this.state = 117;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.INPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 118;
			this.match(ArisParser.CURLY_OPEN);
			this.state = 119;
			this.match(ArisParser.NEWLINE);
			this.state = 120;
			this.lines();
			this.state = 121;
			this.match(ArisParser.CURLY_CLOSED);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifPos(): IfPosContext {
		let _localctx: IfPosContext = new IfPosContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ArisParser.RULE_ifPos);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 123;
			this.match(ArisParser.IFPOS);
			this.state = 124;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.INPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 125;
			this.match(ArisParser.CURLY_OPEN);
			this.state = 126;
			this.match(ArisParser.NEWLINE);
			this.state = 127;
			this.lines();
			this.state = 128;
			this.match(ArisParser.CURLY_CLOSED);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifNeg(): IfNegContext {
		let _localctx: IfNegContext = new IfNegContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ArisParser.RULE_ifNeg);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 130;
			this.match(ArisParser.IFNEG);
			this.state = 131;
			_la = this._input.LA(1);
			if (!(_la === ArisParser.INPUT || _la === ArisParser.MEMORY_SLOT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 132;
			this.match(ArisParser.CURLY_OPEN);
			this.state = 133;
			this.match(ArisParser.NEWLINE);
			this.state = 134;
			this.lines();
			this.state = 135;
			this.match(ArisParser.CURLY_CLOSED);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1D\x8C\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x03\x02\x06\x02(\n\x02\r\x02\x0E\x02)\x03\x02\x03\x02\x03\x03" +
		"\x07\x03/\n\x03\f\x03\x0E\x032\v\x03\x03\x04\x03\x04\x07\x046\n\x04\f" +
		"\x04\x0E\x049\v\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05" +
		"\x06J\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b" +
		"\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x03\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x02\x02\x02\x14\x02" +
		"\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02" +
		"\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02\x02\x04\x04\x02" +
		"\t\t\x16\x16\x04\x02\n\n\x16\x16\x02\x88\x02\'\x03\x02\x02\x02\x040\x03" +
		"\x02\x02\x02\x063\x03\x02\x02\x02\b:\x03\x02\x02\x02\nI\x03\x02\x02\x02" +
		"\fK\x03\x02\x02\x02\x0EP\x03\x02\x02\x02\x10U\x03\x02\x02\x02\x12Z\x03" +
		"\x02\x02\x02\x14_\x03\x02\x02\x02\x16b\x03\x02\x02\x02\x18e\x03\x02\x02" +
		"\x02\x1Ak\x03\x02\x02\x02\x1Cm\x03\x02\x02\x02\x1Eo\x03\x02\x02\x02 v" +
		"\x03\x02\x02\x02\"}\x03\x02\x02\x02$\x84\x03\x02\x02\x02&(\x05\x06\x04" +
		"\x02\'&\x03\x02\x02\x02()\x03\x02\x02\x02)\'\x03\x02\x02\x02)*\x03\x02" +
		"\x02\x02*+\x03\x02\x02\x02+,\x07\x02\x02\x03,\x03\x03\x02\x02\x02-/\x05" +
		"\x06\x04\x02.-\x03\x02\x02\x02/2\x03\x02\x02\x020.\x03\x02\x02\x0201\x03" +
		"\x02\x02\x021\x05\x03\x02\x02\x0220\x03\x02\x02\x0237\x05\b\x05\x0246" +
		"\x07\x19\x02\x0254\x03\x02\x02\x0269\x03\x02\x02\x0275\x03\x02\x02\x02" +
		"78\x03\x02\x02\x028\x07\x03\x02\x02\x0297\x03\x02\x02\x02:;\x05\n\x06" +
		"\x02;\t\x03\x02\x02\x02<J\x05\x0E\b\x02=J\x05\f\x07\x02>J\x05\x10\t\x02" +
		"?J\x05\x12\n\x02@J\x05\x14\v\x02AJ\x05\x16\f\x02BJ\x05\x18\r\x02CJ\x05" +
		"\x1A\x0E\x02DJ\x05\x1C\x0F\x02EJ\x05\x1E\x10\x02FJ\x05 \x11\x02GJ\x05" +
		"\"\x12\x02HJ\x05$\x13\x02I<\x03\x02\x02\x02I=\x03\x02\x02\x02I>\x03\x02" +
		"\x02\x02I?\x03\x02\x02\x02I@\x03\x02\x02\x02IA\x03\x02\x02\x02IB\x03\x02" +
		"\x02\x02IC\x03\x02\x02\x02ID\x03\x02\x02\x02IE\x03\x02\x02\x02IF\x03\x02" +
		"\x02\x02IG\x03\x02\x02\x02IH\x03\x02\x02\x02J\v\x03\x02\x02\x02KL\x07" +
		"\x06\x02\x02LM\t\x02\x02\x02MN\x07\x07\x02\x02NO\t\x03\x02\x02O\r\x03" +
		"\x02\x02\x02PQ\x07\x05\x02\x02QR\x07\x16\x02\x02RS\x07\x07\x02\x02ST\t" +
		"\x03\x02\x02T\x0F\x03\x02\x02\x02UV\x07\x03\x02\x02VW\x07\x16\x02\x02" +
		"WX\x07\x07\x02\x02XY\x07\x16\x02\x02Y\x11\x03\x02\x02\x02Z[\x07\x04\x02" +
		"\x02[\\\x07\x16\x02\x02\\]\x07\b\x02\x02]^\x07\x16\x02\x02^\x13\x03\x02" +
		"\x02\x02_`\x07\x12\x02\x02`a\x07\x16\x02\x02a\x15\x03\x02\x02\x02bc\x07" +
		"\x13\x02\x02cd\x07\x16\x02\x02d\x17\x03\x02\x02\x02ef\x07\v\x02\x02fg" +
		"\x07\x14\x02\x02gh\x07\x19\x02\x02hi\x05\x04\x03\x02ij\x07\x15\x02\x02" +
		"j\x19\x03\x02\x02\x02kl\x07\f\x02\x02l\x1B\x03\x02\x02\x02mn\x07\r\x02" +
		"\x02n\x1D\x03\x02\x02\x02op\x07\x0E\x02\x02pq\t\x02\x02\x02qr\x07\x14" +
		"\x02\x02rs\x07\x19\x02\x02st\x05\x04\x03\x02tu\x07\x15\x02\x02u\x1F\x03" +
		"\x02\x02\x02vw\x07\x0F\x02\x02wx\t\x02\x02\x02xy\x07\x14\x02\x02yz\x07" +
		"\x19\x02\x02z{\x05\x04\x03\x02{|\x07\x15\x02\x02|!\x03\x02\x02\x02}~\x07" +
		"\x10\x02\x02~\x7F\t\x02\x02\x02\x7F\x80\x07\x14\x02\x02\x80\x81\x07\x19" +
		"\x02\x02\x81\x82\x05\x04\x03\x02\x82\x83\x07\x15\x02\x02\x83#\x03\x02" +
		"\x02\x02\x84\x85\x07\x11\x02\x02\x85\x86\t\x02\x02\x02\x86\x87\x07\x14" +
		"\x02\x02\x87\x88\x07\x19\x02\x02\x88\x89\x05\x04\x03\x02\x89\x8A\x07\x15" +
		"\x02\x02\x8A%\x03\x02\x02\x02\x06)07I";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ArisParser.__ATN) {
			ArisParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ArisParser._serializedATN));
		}

		return ArisParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ArisParser.EOF, 0); }
	public line(): LineContext[];
	public line(i: number): LineContext;
	public line(i?: number): LineContext | LineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LineContext);
		} else {
			return this.getRuleContext(i, LineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_program; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LinesContext extends ParserRuleContext {
	public line(): LineContext[];
	public line(i: number): LineContext;
	public line(i?: number): LineContext | LineContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LineContext);
		} else {
			return this.getRuleContext(i, LineContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_lines; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterLines) {
			listener.enterLines(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitLines) {
			listener.exitLines(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitLines) {
			return visitor.visitLines(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LineContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArisParser.NEWLINE);
		} else {
			return this.getToken(ArisParser.NEWLINE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_line; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterLine) {
			listener.enterLine(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitLine) {
			listener.exitLine(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitLine) {
			return visitor.visitLine(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public action(): ActionContext {
		return this.getRuleContext(0, ActionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_expression; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionContext extends ParserRuleContext {
	public copy(): CopyContext | undefined {
		return this.tryGetRuleContext(0, CopyContext);
	}
	public move(): MoveContext | undefined {
		return this.tryGetRuleContext(0, MoveContext);
	}
	public add(): AddContext | undefined {
		return this.tryGetRuleContext(0, AddContext);
	}
	public subtract(): SubtractContext | undefined {
		return this.tryGetRuleContext(0, SubtractContext);
	}
	public increment(): IncrementContext | undefined {
		return this.tryGetRuleContext(0, IncrementContext);
	}
	public decrement(): DecrementContext | undefined {
		return this.tryGetRuleContext(0, DecrementContext);
	}
	public loop(): LoopContext | undefined {
		return this.tryGetRuleContext(0, LoopContext);
	}
	public break(): BreakContext | undefined {
		return this.tryGetRuleContext(0, BreakContext);
	}
	public continue(): ContinueContext | undefined {
		return this.tryGetRuleContext(0, ContinueContext);
	}
	public ifZero(): IfZeroContext | undefined {
		return this.tryGetRuleContext(0, IfZeroContext);
	}
	public ifNotZero(): IfNotZeroContext | undefined {
		return this.tryGetRuleContext(0, IfNotZeroContext);
	}
	public ifPos(): IfPosContext | undefined {
		return this.tryGetRuleContext(0, IfPosContext);
	}
	public ifNeg(): IfNegContext | undefined {
		return this.tryGetRuleContext(0, IfNegContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_action; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterAction) {
			listener.enterAction(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitAction) {
			listener.exitAction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitAction) {
			return visitor.visitAction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MoveContext extends ParserRuleContext {
	public MOVE(): TerminalNode { return this.getToken(ArisParser.MOVE, 0); }
	public TO(): TerminalNode { return this.getToken(ArisParser.TO, 0); }
	public MEMORY_SLOT(): TerminalNode[];
	public MEMORY_SLOT(i: number): TerminalNode;
	public MEMORY_SLOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArisParser.MEMORY_SLOT);
		} else {
			return this.getToken(ArisParser.MEMORY_SLOT, i);
		}
	}
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.INPUT, 0); }
	public OUTPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.OUTPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_move; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterMove) {
			listener.enterMove(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitMove) {
			listener.exitMove(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitMove) {
			return visitor.visitMove(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CopyContext extends ParserRuleContext {
	public COPY(): TerminalNode { return this.getToken(ArisParser.COPY, 0); }
	public MEMORY_SLOT(): TerminalNode[];
	public MEMORY_SLOT(i: number): TerminalNode;
	public MEMORY_SLOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArisParser.MEMORY_SLOT);
		} else {
			return this.getToken(ArisParser.MEMORY_SLOT, i);
		}
	}
	public TO(): TerminalNode { return this.getToken(ArisParser.TO, 0); }
	public OUTPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.OUTPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_copy; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterCopy) {
			listener.enterCopy(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitCopy) {
			listener.exitCopy(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitCopy) {
			return visitor.visitCopy(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AddContext extends ParserRuleContext {
	public ADD(): TerminalNode { return this.getToken(ArisParser.ADD, 0); }
	public MEMORY_SLOT(): TerminalNode[];
	public MEMORY_SLOT(i: number): TerminalNode;
	public MEMORY_SLOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArisParser.MEMORY_SLOT);
		} else {
			return this.getToken(ArisParser.MEMORY_SLOT, i);
		}
	}
	public TO(): TerminalNode { return this.getToken(ArisParser.TO, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_add; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterAdd) {
			listener.enterAdd(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitAdd) {
			listener.exitAdd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitAdd) {
			return visitor.visitAdd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubtractContext extends ParserRuleContext {
	public SUB(): TerminalNode { return this.getToken(ArisParser.SUB, 0); }
	public MEMORY_SLOT(): TerminalNode[];
	public MEMORY_SLOT(i: number): TerminalNode;
	public MEMORY_SLOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ArisParser.MEMORY_SLOT);
		} else {
			return this.getToken(ArisParser.MEMORY_SLOT, i);
		}
	}
	public FROM(): TerminalNode { return this.getToken(ArisParser.FROM, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_subtract; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterSubtract) {
			listener.enterSubtract(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitSubtract) {
			listener.exitSubtract(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitSubtract) {
			return visitor.visitSubtract(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncrementContext extends ParserRuleContext {
	public INCR(): TerminalNode { return this.getToken(ArisParser.INCR, 0); }
	public MEMORY_SLOT(): TerminalNode { return this.getToken(ArisParser.MEMORY_SLOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_increment; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterIncrement) {
			listener.enterIncrement(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitIncrement) {
			listener.exitIncrement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitIncrement) {
			return visitor.visitIncrement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecrementContext extends ParserRuleContext {
	public DECR(): TerminalNode { return this.getToken(ArisParser.DECR, 0); }
	public MEMORY_SLOT(): TerminalNode { return this.getToken(ArisParser.MEMORY_SLOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_decrement; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterDecrement) {
			listener.enterDecrement(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitDecrement) {
			listener.exitDecrement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitDecrement) {
			return visitor.visitDecrement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LoopContext extends ParserRuleContext {
	public LOOP(): TerminalNode { return this.getToken(ArisParser.LOOP, 0); }
	public CURLY_OPEN(): TerminalNode { return this.getToken(ArisParser.CURLY_OPEN, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(ArisParser.NEWLINE, 0); }
	public lines(): LinesContext {
		return this.getRuleContext(0, LinesContext);
	}
	public CURLY_CLOSED(): TerminalNode { return this.getToken(ArisParser.CURLY_CLOSED, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_loop; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterLoop) {
			listener.enterLoop(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitLoop) {
			listener.exitLoop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitLoop) {
			return visitor.visitLoop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakContext extends ParserRuleContext {
	public BREAK(): TerminalNode { return this.getToken(ArisParser.BREAK, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_break; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterBreak) {
			listener.enterBreak(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitBreak) {
			listener.exitBreak(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitBreak) {
			return visitor.visitBreak(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueContext extends ParserRuleContext {
	public CONTINUE(): TerminalNode { return this.getToken(ArisParser.CONTINUE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_continue; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterContinue) {
			listener.enterContinue(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitContinue) {
			listener.exitContinue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitContinue) {
			return visitor.visitContinue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfZeroContext extends ParserRuleContext {
	public IFZERO(): TerminalNode { return this.getToken(ArisParser.IFZERO, 0); }
	public CURLY_OPEN(): TerminalNode { return this.getToken(ArisParser.CURLY_OPEN, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(ArisParser.NEWLINE, 0); }
	public lines(): LinesContext {
		return this.getRuleContext(0, LinesContext);
	}
	public CURLY_CLOSED(): TerminalNode { return this.getToken(ArisParser.CURLY_CLOSED, 0); }
	public MEMORY_SLOT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.MEMORY_SLOT, 0); }
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.INPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_ifZero; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterIfZero) {
			listener.enterIfZero(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitIfZero) {
			listener.exitIfZero(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitIfZero) {
			return visitor.visitIfZero(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfNotZeroContext extends ParserRuleContext {
	public IFNOTZERO(): TerminalNode { return this.getToken(ArisParser.IFNOTZERO, 0); }
	public CURLY_OPEN(): TerminalNode { return this.getToken(ArisParser.CURLY_OPEN, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(ArisParser.NEWLINE, 0); }
	public lines(): LinesContext {
		return this.getRuleContext(0, LinesContext);
	}
	public CURLY_CLOSED(): TerminalNode { return this.getToken(ArisParser.CURLY_CLOSED, 0); }
	public MEMORY_SLOT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.MEMORY_SLOT, 0); }
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.INPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_ifNotZero; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterIfNotZero) {
			listener.enterIfNotZero(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitIfNotZero) {
			listener.exitIfNotZero(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitIfNotZero) {
			return visitor.visitIfNotZero(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfPosContext extends ParserRuleContext {
	public IFPOS(): TerminalNode { return this.getToken(ArisParser.IFPOS, 0); }
	public CURLY_OPEN(): TerminalNode { return this.getToken(ArisParser.CURLY_OPEN, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(ArisParser.NEWLINE, 0); }
	public lines(): LinesContext {
		return this.getRuleContext(0, LinesContext);
	}
	public CURLY_CLOSED(): TerminalNode { return this.getToken(ArisParser.CURLY_CLOSED, 0); }
	public MEMORY_SLOT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.MEMORY_SLOT, 0); }
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.INPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_ifPos; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterIfPos) {
			listener.enterIfPos(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitIfPos) {
			listener.exitIfPos(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitIfPos) {
			return visitor.visitIfPos(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfNegContext extends ParserRuleContext {
	public IFNEG(): TerminalNode { return this.getToken(ArisParser.IFNEG, 0); }
	public CURLY_OPEN(): TerminalNode { return this.getToken(ArisParser.CURLY_OPEN, 0); }
	public NEWLINE(): TerminalNode { return this.getToken(ArisParser.NEWLINE, 0); }
	public lines(): LinesContext {
		return this.getRuleContext(0, LinesContext);
	}
	public CURLY_CLOSED(): TerminalNode { return this.getToken(ArisParser.CURLY_CLOSED, 0); }
	public MEMORY_SLOT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.MEMORY_SLOT, 0); }
	public INPUT(): TerminalNode | undefined { return this.tryGetToken(ArisParser.INPUT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ArisParser.RULE_ifNeg; }
	// @Override
	public enterRule(listener: ArisListener): void {
		if (listener.enterIfNeg) {
			listener.enterIfNeg(this);
		}
	}
	// @Override
	public exitRule(listener: ArisListener): void {
		if (listener.exitIfNeg) {
			listener.exitIfNeg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ArisVisitor<Result>): Result {
		if (visitor.visitIfNeg) {
			return visitor.visitIfNeg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


