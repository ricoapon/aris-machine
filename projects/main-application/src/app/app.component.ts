import {Component} from '@angular/core';
import {ScenarioEventsBuilder} from "code-editor";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'main-application';

  builder(): ScenarioEventsBuilder {
    return new ScenarioEventsBuilder()
  }
}
