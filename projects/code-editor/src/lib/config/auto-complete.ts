import {editor, IRange, languages, Position} from "monaco-editor";
import HoverProvider = languages.HoverProvider;
import CompletionItemProvider = languages.CompletionItemProvider;
import ITextModel = editor.ITextModel;

export function createRange(model: ITextModel, position: Position): IRange {
  const currentWord = model.getWordAtPosition(position);
  let startColumn, endColumn;
  if (currentWord == undefined) {
    // The position starts at 1 weirdly enough.
    startColumn = 1;
    endColumn = 1;
  } else {
    startColumn = currentWord.startColumn
    endColumn = currentWord.endColumn
  }
  return {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: startColumn,
    endColumn: endColumn,
  }
}

export function loadAutoComplete(monaco: any, languageName: string) {
  const completionItemProvider: CompletionItemProvider = {
    provideCompletionItems: (model: ITextModel, position: Position) => {
      // The range must be given, as the typescript definition indicates this.
      // However, it works fine without. Documentation even says it defaults to the word at the position.
      // To have compilation checks, we will just fill in the range anyway.
      const range = createRange(model, position)

      return {suggestions: createSuggestions(monaco, range)};
    }
  }
  monaco.languages.registerCompletionItemProvider(languageName, completionItemProvider);

  const hoverProvider: HoverProvider = {
    provideHover: (model: ITextModel, position: Position) => {
      const currentWord = model.getWordAtPosition(position);
      if (currentWord == null) {
        return {contents: []};
      }
      const content = createHoverDocumentation(currentWord.word, monaco);
      if (content == undefined) {
        return {contents: []};
      }

      const range = createRange(model, position)
      return {
        range,
        contents: [content]
      }
    }
  }
  monaco.languages.registerHoverProvider(languageName, hoverProvider)
}

export type DictionaryItem = {
  /* The word that must match the word on screen to show this. */
  label: string
  /* A long text providing documentation on the item. */
  documentation: string
  /* The content of the suggestion, if this can be a suggestion. */
  suggestion?: DictionaryItemSuggestion
}

export type DictionaryItemSuggestion = {
  kind: any
  insertText: string
  insertTextRules?: any
}

function createSuggestions(monaco: any, range: any): languages.CompletionItem[] {
  return createDictionary(monaco)
    .filter(item => item.suggestion != undefined)
    .map(item => {
        return {
          label: item.label,
          kind: item.suggestion!.kind,
          insertText: item.suggestion!.insertText,
          insertTextRules: item.suggestion!.insertTextRules,
          documentation: {
            value: item.documentation,
            isTrusted: true
          },
          range
        }
      }
    )
}

function createHoverDocumentation(word: string, monaco: any): {value: string, isTrusted: boolean} | undefined {
  const result = createDictionary(monaco)
    .filter(item => item.label == word)
    .map(item => {
        return {
          value: item.documentation,
          isTrusted: true
        }
      }
    );
  if (result.length > 1) {
    throw new Error('Every label should be unique, but we found multiple results for a single word ("' + word + '"). Fix the dictionary.')
  }
  if (result.length == 0) {
    return undefined;
  }
  return result[0];
}

function createDictionary(monaco: any): DictionaryItem[] {
  return [
    {
      label: "move",
      documentation: "#### move [memory-slot | input] to [memory-slot | output]\n---\n" +
        "Moves the value from one place to another.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'move $1 to $2',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,      }
    },
    {
      label: "copy",
      documentation: "#### copy [memory-slot] to [memory-slot | output]\n---\n" +
        "Copies the value of a memory slot to another place.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'copy $1 to $2',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,      }
    },
    {
      label: "add",
      documentation: "#### add [memory-slot] to [memory-slot]\n---\n" +
        "Adds the value of one memory slot to another.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'add $1 to $2',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,      }
    },
    {
      label: "sub",
      documentation: "#### sub [memory-slot] from [memory-slot]\n---\n" +
        "Subtract the value of one memory slot from another.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'sub $1 from $2',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,      }
    },
    {
      label: 'incr',
      documentation: "#### incr [memory-slot]\n---\n" +
        "Increments the value of a memory slot by one.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'incr $1',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'decr',
      documentation: "#### decr [memory-slot]\n---\n" +
        "Decrements the value of a memory slot by one.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'decr $1',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'loop',
      documentation: "#### loop { [code block] }\n---\n" +
        "Repeats the nested code block until the `break` command is used. An example:\n```aris\nloop {\n  move input to 0\n}\n```\n",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'loop {\n  $0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'break',
      documentation: "#### break\n---\n" +
        "Stops the execution of the current loop you are in.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: 'break',
      }
    },
    {
      label: 'continue',
      documentation: "#### continue\n---\n" +
        "Return to the beginning of the code block of the loop",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: 'continue',
      }
    },
    {
      label: 'ifzero',
      documentation: "#### ifzero [memory-block | input] { [code block] }\n---\n" +
        "Executes the code block if the value of the specified memory block or input equals 0.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'ifzero $1 {\n  $0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'ifnotzero',
      documentation: "#### ifnotzero [memory-block | input] { [code block] }\n---\n" +
        "Executes the code block if the value of the specified memory block or input is not equal to 0.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'ifnotzero $1 {\n  $0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'ifpos',
      documentation: "#### ifpos [memory-block | input] { [code block] }\n---\n" +
        "Executes the code block if the value of the specified memory block or input is positive.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'ifpos $1 {\n  $0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'ifneg',
      documentation: "#### ifneg [memory-block | input] { [code block] }\n---\n" +
        "Executes the code block if the value of the specified memory block or input is negative.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'ifneg $1 {\n  $0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      }
    },
    {
      label: 'input',
      documentation: "#### input\n---\n" +
        "Represents the list that contains all the memory blocks that are the input for the level.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: 'input',
      }
    },
    {
      label: 'output',
      documentation: "#### output\n---\n" +
        "Represents the list that contains all the memory blocks that are the output of the level.",
      suggestion: {
        kind: monaco.languages.CompletionItemKind.Text,
        insertText: 'output',
      }
    },
  ]
}
