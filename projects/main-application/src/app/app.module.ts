import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LevelSelectionComponent } from './navigation/level-selection/level-selection.component';
import { HomeComponent } from './navigation/home/home.component';
import { DocsComponent } from './navigation/docs/docs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LevelSelectionComponent,
    HomeComponent,
    DocsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
