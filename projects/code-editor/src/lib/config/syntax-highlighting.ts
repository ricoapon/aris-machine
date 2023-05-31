export function loadSyntaxHighlighting(monaco: any, languageName: string, themeName: string) {
  monaco.languages.setMonarchTokensProvider(languageName, {
    tokenizer: {
      root: [
        [/(add|sub|copy|move|incr|decr)/, 'function'],
        [/(input|output)/, 'input-output'],
        [/(\d+)/, 'memory-slot'],
        [/loop/, 'loop'],
        [/(break|continue)/, 'break-continue'],
        [/(ifzero|ifnotzero|ifpos|ifneg)/, 'if-statement'],
        [/[{}]/, 'bracket'],
      ]
    }
  });

  // Common colors we use in our theme.
  const black = '#000000'
  const white = '#FFFFFF'
  const blue = '#00AAE0'
  const red = '#C5366C'
  const green = '#57A773'
  // const purple = '#A600E0';
  // const green = '#3AE000';


  monaco.editor.defineTheme(themeName, {
    base: 'vs-dark',
    inherit: true,
    colors: {
      "editor.foreground": white,
      "editor.background": black,
      "editorCursor.foreground": "#c0c0c0",
      // We cannot hide the highlighting of the line, so we make it the same color as the background.
      "editor.lineHighlightBackground": black,
      "editorLineNumber.foreground": white,
      // We do not want to highlight the line number of the line, so we make it the same color as normal line numbers.
      "editorLineNumber.activeForeground": white,
      "editor.selectionBackground": "#404040",
      "editor.inactiveSelectionBackground": black,
    },
    rules: [
      {token: 'function', foreground: green}, // I can experiment with "fontStyle: 'bold'" and other stuff to spice it up.
      {token: 'input-output', foreground: red},
      {token: 'memory-slot', foreground: red},
      {token: 'loop', foreground: blue},
      {token: 'break-continue', foreground: red},
      {token: 'if-statement', foreground: blue},
      {token: 'bracket', foreground: blue},
    ]
  });
}
