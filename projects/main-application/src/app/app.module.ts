import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {LevelSelectionComponent} from './navigation/level-selection/level-selection.component';
import {HomeComponent} from './navigation/home/home.component';
import {DocsComponent} from './navigation/docs/docs.component';
import {DocumentationComponent} from './documentation/documentation.component';
import {LanguageComponent} from './documentation/language/language.component';
import {EditorComponent} from './documentation/editor/editor.component';
import {CodeEditorModule} from "code-editor";
import {LevelScreenComponent} from './level-screen/level-screen.component';
import {MachineScreenComponent} from './level-screen/machine-screen/machine-screen.component';
import {SplitContainerComponent} from './level-screen/split-container/split-container.component';
import {ControlPanelComponent} from './level-screen/machine-screen/control-panel/control-panel.component';
import {InOutTrackComponent} from './level-screen/machine-screen/in-out-track/in-out-track.component';
import {MemoryComponent} from './level-screen/machine-screen/memory/memory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LevelSelectionComponent,
    HomeComponent,
    DocsComponent,
    DocumentationComponent,
    LanguageComponent,
    EditorComponent,
    LevelScreenComponent,
    MachineScreenComponent,
    SplitContainerComponent,
    ControlPanelComponent,
    InOutTrackComponent,
    MemoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodeEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
