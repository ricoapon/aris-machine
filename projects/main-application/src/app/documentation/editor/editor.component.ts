import { Component } from '@angular/core';
import {ScenarioEventsBuilder} from "code-editor";
import {ScenarioEvent} from "../../../../../code-editor/src/lib/demo-code-editor/scenario-events-builder";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css', '../shared.css']
})
export class EditorComponent {
  scenarioBuilder(): ScenarioEventsBuilder {
    return new ScenarioEventsBuilder()
  }

  scenario1(): ScenarioEvent[] {
    return this.scenarioBuilder().typeText('loo').openSuggestions().acceptSuggestion().build()
  }
}
