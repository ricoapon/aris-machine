import {NgModule} from '@angular/core';
import {MonacoVariablesFactory} from "./config/global";
import {CodeEditorComponent} from "./code-editor/code-editor.component";
import {monacoEditorConfig} from "./config/monacoEditorConfig";
import {MonacoEditorModule} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import { DemoCodeEditorComponent } from './demo-code-editor/demo-code-editor.component';

@NgModule({
  declarations: [CodeEditorComponent, DemoCodeEditorComponent],
  imports: [
    MonacoEditorModule.forRoot(monacoEditorConfig),
    FormsModule,
  ],
  exports: [CodeEditorComponent, DemoCodeEditorComponent],
  providers: [MonacoVariablesFactory]
})
export class CodeEditorModule {
}
