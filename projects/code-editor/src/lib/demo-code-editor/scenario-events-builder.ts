export type ScenarioEvent = {
  event: (editor: any) => void
  delayBeforeInMs: number
}

export class ScenarioEventsBuilder {
  private readonly events: ScenarioEvent[] = []

  private createAndAddScenarioEvent(event: (editor: any) => void, delayAfterInMs: number = 800) {
    this.events.push({
      event, delayBeforeInMs: delayAfterInMs
    })
  }

  typeText(text: string): ScenarioEventsBuilder {
    text.split('').forEach(c => this.createAndAddScenarioEvent(
      (editor) => editor.trigger('editor', 'type', {text: c}), 200
    ))

    return this
  }

  nextSnippetPlaceholder(): ScenarioEventsBuilder {
    this.createAndAddScenarioEvent((editor) => editor.trigger('editor', 'jumpToNextSnippetPlaceholder'))
    return this;
  }

  openSuggestions(): ScenarioEventsBuilder {
    this.createAndAddScenarioEvent((editor) => editor.trigger('editor', 'editor.action.triggerSuggest'))
    return this;
  }

  nextSuggestion(): ScenarioEventsBuilder {
    this.createAndAddScenarioEvent((editor) => editor.trigger('', 'selectNextSuggestion'))
    return this;
  }

  acceptSuggestion(): ScenarioEventsBuilder {
    this.createAndAddScenarioEvent((editor) => editor.trigger('', 'acceptSelectedSuggestionOnEnter'))
    return this;
  }

  showHover(): ScenarioEventsBuilder {
    this.createAndAddScenarioEvent((editor) => editor.trigger('', 'editor.action.showHover'))
    return this;
  }

  hideHover(): ScenarioEventsBuilder {
    // There is no function to hide the hover, so we do work around this with a sneaky trick.
    this.createAndAddScenarioEvent((editor) => {
      editor.trigger('keyboard', 'undo')
      editor.trigger('', 'editor.action.showHover')
      editor.trigger('keyboard', 'redo')
    })
    return this;
  }

  wait(delayInMs: number): ScenarioEventsBuilder {
    this.createAndAddScenarioEvent(() => {}, delayInMs)
    return this
  }

  build(): ScenarioEvent[] {
    return this.events;
  }
}
