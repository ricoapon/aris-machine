import {NgxMonacoEditorConfig} from "ngx-monaco-editor-v2";
import {loadAutoComplete} from "./auto-complete";
import {loadSyntaxHighlighting} from "./syntax-highlighting";
import {MonacoVariables} from "./global";
import {loadBracketConfiguration} from "./bracket-configuration";

declare let monaco: any;
export const MONACO_ARIS_LANGUAGE_NAME = 'aris'
export const MONACO_ARIS_THEME_NAME = 'aris-theme'

export function myMonacoLoad() {
  monaco.languages.register({id: MONACO_ARIS_LANGUAGE_NAME});
  loadAutoComplete(monaco, MONACO_ARIS_LANGUAGE_NAME)
  loadSyntaxHighlighting(monaco, MONACO_ARIS_LANGUAGE_NAME, MONACO_ARIS_THEME_NAME)
  loadBracketConfiguration(monaco, MONACO_ARIS_LANGUAGE_NAME)
  MonacoVariables.setGlobalMonacoVariable(monaco);
}

export const monacoEditorConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: myMonacoLoad,
};
