import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";
import {LevelSelectionComponent} from "./navigation/level-selection/level-selection.component";
import {HomeComponent} from "./navigation/home/home.component";
import {DocsComponent} from "./navigation/docs/docs.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
