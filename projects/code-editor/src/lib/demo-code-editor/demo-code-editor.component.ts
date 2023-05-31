import {Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core';
import {concatMap, delay, of, Subscription} from "rxjs";
import {MonacoVariables, MonacoVariablesFactory} from "../config/global";
import {ScenarioEvent} from "./scenario-events-builder";

@Component({
  selector: 'demo-code-editor',
  templateUrl: './demo-code-editor.component.html',
  styleUrls: ['./demo-code-editor.component.css']
})
export class DemoCodeEditorComponent implements OnDestroy {
  @Input() scenarioEvents: ScenarioEvent[]
  @Input() heightInNrOfLines: number

  readonly monacoVariables: MonacoVariables;
  readonly options: any;

  @ViewChild('editor') editor: ElementRef;
  @ViewChild('container') container: ElementRef;
  content = ''
  currentSubscription: Subscription;

  constructor(private monacoVariablesFactory: MonacoVariablesFactory) {
    this.monacoVariables = monacoVariablesFactory.get();
    this.monacoVariables.observableMonacoFinishedInitializing().subscribe(() => this.play())
    this.options = this.monacoVariables.createMonacoEditorOptions();
  }

  private clearSubscription() {
    if (this.currentSubscription != undefined) {
      this.currentSubscription.unsubscribe()
    }
  }

  play() {
    // We execute this method after the page is loaded. However, we don't really know when
    // the page is loaded, so we just use setTimeout. It could be that the user navigated
    // away from the page in this short period. If this is the case, just do nothing.
    if (this.container == undefined || this.container.nativeElement == undefined ||
      this.container!.nativeElement!.querySelector('textarea') == null) {
      return
    }

    // If we disable the text area, there is no way for the user to disturb the actions.
    // Since it is deeply nested in the container, we search it like this.
    this.container!.nativeElement!.querySelector('textarea').disabled = true

    this.clearSubscription()

    const actualEditor = this.monacoVariables.getMonacoEditor(this.options)
    // You cannot clear the content of the editor using "this.content = ''". I don't know why.
    // This does work and this.content is updated to the correct value.
    actualEditor.getModel().setValue('')

    // We add another event at the end of the list that calls this method again.
    // This way, it loops forever.
    const scenarioEvents = this.scenarioEvents.concat({event: () => this.play(), delayBeforeInMs: 2000})

    this.currentSubscription = of(...scenarioEvents)
      .pipe(concatMap(scenarioEvent => of(scenarioEvent).pipe(delay(scenarioEvent.delayBeforeInMs))))
      .subscribe((scenarioEvent: ScenarioEvent) => {
        scenarioEvent.event.call(this, actualEditor)
      });
  }

  ngOnDestroy(): void {
    this.clearSubscription()
  }

  determineHeight(): string {
    if (this.heightInNrOfLines == undefined) {
      // Use some kind of default value in case the input is missing.
      return "200px";
    }
    return (this.heightInNrOfLines * 20) + "px";
  }

}
