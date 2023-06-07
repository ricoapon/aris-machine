import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MonacoVariables, MonacoVariablesFactory} from "../config/global";
import {IRange} from "monaco-editor";
import {CompilationError, MachineEditor} from "code-processing";

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements MachineEditor, OnInit {
  @Output() onContentChangeEmitter: EventEmitter<string> = new EventEmitter<string>()
  // Triggers when a hotkey is pressed. Passes the content of the editor as value.
  @Output() onExecuteEmitter: EventEmitter<string> = new EventEmitter<string>()
  @Input() initialContent: string

  readonly monacoVariables: MonacoVariables;
  readonly options: any;
  content = '';

  constructor(private monacoVariablesFactory: MonacoVariablesFactory) {
    this.monacoVariables = monacoVariablesFactory.get()
    this.options = this.monacoVariables.createMonacoEditorOptions();

    this.monacoVariables.observableMonacoFinishedInitializing().subscribe(() => {
      this.monacoVariables.getMonacoEditor(this.options).addCommand(this.monacoVariables.KeyMod().CtrlCmd | this.monacoVariables.KeyCode().Enter, () => {
        this.execute()
      })
    })
  }

  ngOnInit(): void {
    this.content = this.initialContent
  }

  execute() {
    this.onExecuteEmitter.emit(this.content)
  }

  caretDecoration: any = undefined

  addCaret(lineNumber: number) {
    this.removeCaret()

    const monaco = this.monacoVariables.getMonacoEditor(this.options)
    const range: IRange = {
      startLineNumber: lineNumber,
      endLineNumber: lineNumber,
      startColumn: 1,
      endColumn: 1,
    }
    this.caretDecoration = monaco.createDecorationsCollection([
      {
        range: range,
        options: {
          linesDecorationsClassName: "caretGlyph"
        }
      },
    ]);
  }

  removeCaret() {
    if (this.caretDecoration != undefined) {
      this.caretDecoration.clear()
    }
  }

  onContentChange(input: string) {
    this.onContentChangeEmitter.emit(input)
    this.removeCompilationErrors()
  }

  compilationErrorDecorations: any[] = []

  showCompilationErrors(compilationErrors: CompilationError[]): void {
    for (let compilationError of compilationErrors) {
      const monaco = this.monacoVariables.getMonacoEditor(this.options)
      const range: IRange = {
        startLineNumber: compilationError.lineNr,
        endLineNumber: compilationError.lineNr,
        // Column index starts at 1, but char index starts at 0.
        startColumn: compilationError.fromCharIndex + 1,
        endColumn: compilationError.toCharIndex + 1,
      }

      this.compilationErrorDecorations.push(monaco.createDecorationsCollection([
        {
          range: range,
          options: {
            className: "syntax-error",
            hoverMessage: {value: '**ERROR**: ' + compilationError.message},
          }
        },
      ]))
    }
  }

  removeCompilationErrors(): void {
    this.compilationErrorDecorations.forEach(c => c.clear())
  }
}
