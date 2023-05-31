import {NgModule} from '@angular/core';
import {MonacoVariablesFactory} from "./config/global";
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {monacoEditorConfig} from "./config/monacoEditorConfig";
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [CodeEditorComponent],
  imports: [
    MonacoEditorModule.forRoot(monacoEditorConfig),
    FormsModule,
  ],
  exports: [CodeEditorComponent],
  providers: [MonacoVariablesFactory]
})
export class CodeEditorModule {
}
