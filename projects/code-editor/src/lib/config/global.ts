import {MONACO_ARIS_LANGUAGE_NAME, MONACO_ARIS_THEME_NAME} from "./monacoEditorConfig";
import {delay, Observable, ReplaySubject} from "rxjs";

// We want a different instance of MonacoVariables for each component. Angular will always inject the same instance
// every time. To work around this, we inject a (singular instance) factory which creates these instances.
export class MonacoVariablesFactory {
  public get(): MonacoVariables {
    return new MonacoVariables();
  }
}

/**
 * Monaco uses a global variable on which we can execute functions. To use this in a somewhat clean way, we use this
 * class as an abstraction around that global variable. The "monaco" variable mentioned in the docs or online resources
 * is equivalent to the GLOBAL_MONACO variable.
 *
 * Every instance of this class represents a new editor on screen. A unique identifier is used to keep track of the
 * instance and the corresponding editor.
 */
export class MonacoVariables {
  static readonly MONACO_EDITOR_OPTIONS = {
    theme: MONACO_ARIS_THEME_NAME,
    language: MONACO_ARIS_LANGUAGE_NAME,
    scrollBeyondLastLine: false,
    minimap: {enabled: false},
    fontFamily: "Consolas, monospace",
    fontSize: "16px",
    overviewRulerLanes: 0,
    lineNumbersMinChars: 3, // Undocumented, see https://github.com/Microsoft/vscode/issues/30795#issuecomment-410998882.
    find: { addExtraSpaceOnTop: false },
    automaticLayout: true,
    tabSize: 2, // Undocumented, see https://stackoverflow.com/a/75020810/7038554.

    // I am not sure whether we should enable or disable this. I had issues with hover/suggestion boxes that would not show
    // properly when hovering at the top of the editor. Though now it seems fixed.
    // We also need it false specifically for the demo overview screen, because scrolling should keep the hover/suggestion
    // boxes inside the editor. If we set this to true, it will stay fixed on the screen.
    // fixedOverflowWidgets: true,
  };

  private static GLOBAL_MONACO: any = null;
  private static readonly monacoEditorReplaySubject: ReplaySubject<void> = new ReplaySubject<void>(1)
  private static readonly MONACO_EDITOR_VARIABLE_SET: Observable<void> = MonacoVariables.monacoEditorReplaySubject.pipe(delay(500))

  static setGlobalMonacoVariable(monaco: any) {
    MonacoVariables.GLOBAL_MONACO = monaco;
    MonacoVariables.monacoEditorReplaySubject.next();

    // The default keybinding for showing hover is "CTRL + K CTRL + I" (first one, then the other). I find this very
    // inconvenient. So I changed this to "CTRL + Q". Doing it this way also shows the "CTRL + Q" in the F1 menu!
    monaco.editor.addKeybindingRule({
      keybinding: MonacoVariables.GLOBAL_MONACO.KeyMod.CtrlCmd | MonacoVariables.GLOBAL_MONACO.KeyCode.KeyQ,
      command: "editor.action.showHover",
    })
  }

  // The MonacoVariables class is instantiated for each component. We give it an identifier, so every instance has some
  // unique value that it can use.
  static instanceIdentifierCounter = 0;
  readonly instanceIdentifier: number;

  constructor() {
    this.instanceIdentifier = MonacoVariables.instanceIdentifierCounter++;
  }

  /**
   * The observable will always emit an event on subscription whenever the variable is loaded.
   */
  public observableMonacoFinishedInitializing() {
    return MonacoVariables.MONACO_EDITOR_VARIABLE_SET;
  }

  /**
   * Creates standardized options that can be used for initializing a Monaco editor.
   */
  public createMonacoEditorOptions() {
    // It is difficult to get the right editor if we have multiple on screen, since they are all part of a long list.
    // To make sure we can get the right editor, we add a non-existing option that we can use to identify the editor.
    // We can just use something simple as an incrementing number.
    return {
      ...MonacoVariables.MONACO_EDITOR_OPTIONS,
      ...{
        instanceIdentifier: this.instanceIdentifier,
      }
    }
  }

  /**
   * Get the actual editor object that can be used for executing commands.
   * @param options The options created using {@link createMonacoEditorOptions}
   */
  public getMonacoEditor(options: any) {
    // Find the correct one based on the unique value we have set in createMonacoEditorOptions().
    return MonacoVariables.GLOBAL_MONACO.editor.getEditors()
      .find((editor: any) =>
        editor.getRawOptions().instanceIdentifier === options.instanceIdentifier)
  }

  // These two methods can be used to get specific keyboard keys for binding commands.
  public KeyMod() {
    return MonacoVariables.GLOBAL_MONACO.KeyMod;
  }

  public KeyCode() {
    return MonacoVariables.GLOBAL_MONACO.KeyCode;
  }
}
