export function loadBracketConfiguration(monaco: any, languageName: string) {
  const bracketConfiguration = {
    "surroundingPairs": [{"open": "{", "close": "}"}],
    "autoClosingPairs": [{"open": "{", "close": "}"}],
    "brackets": [["{", "}"]]
  }

  monaco.languages.setLanguageConfiguration(languageName, bracketConfiguration)
}
