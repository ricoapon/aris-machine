import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";
import {LevelSelectionComponent} from "./navigation/level-selection/level-selection.component";
import {HomeComponent} from "./navigation/home/home.component";
import {DocsComponent} from "./navigation/docs/docs.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {LanguageComponent} from "./documentation/language/language.component";
import {EditorComponent} from "./documentation/editor/editor.component";
import {LevelScreenComponent} from "./level-screen/level-screen.component";

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'levels', component: LevelSelectionComponent},
      {path: 'docs', component: DocsComponent},
    ],
  },
  {
    path: 'docs',
    component: DocumentationComponent,
    children: [
      {path: 'language', component: LanguageComponent},
      {path: 'editor', component: EditorComponent},
    ],
  },
  {path: 'levels/:id', component: LevelScreenComponent},
  {path: '**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
