import {Injectable} from "@angular/core";
import {Level, MachineEditor, MachineGUI, MachineGuiExecutor, MachineState, Parser} from "code-processing";

@Injectable({
  providedIn: 'root',
})
export class LevelScreenSharedExecutor {
  private readonly parser = new Parser()
  private machineGuiExecutor: MachineGuiExecutor | undefined = undefined
  private determineCode: () => string
  public level: Level
  private machineGUI: MachineGUI
  private machineEditor: MachineEditor
  private updateDelayInMs: number = 1000

  setDetermineCode(determineCode: () => string) {
    this.determineCode = determineCode
  }

  initialize(machineGUI: MachineGUI, machineEditor: MachineEditor) {
    this.machineGUI = machineGUI
    this.machineEditor = machineEditor
  }

  setUpdateDelayInMs(updateDelayInMs: number) {
    this.updateDelayInMs = updateDelayInMs
    this.machineGuiExecutor?.updateDelayInMs(this.updateDelayInMs)
  }

  validate() {
    const code = this.determineCode()
    const compilationErrors = this.parser.validate(this.level, code)
    this.machineEditor.showCompilationErrors(compilationErrors)
  }

  private compile(): boolean {
    const code = this.determineCode()
    const compilationErrors = this.parser.validate(this.level, code)
    if (compilationErrors.length > 0) {
      this.machineEditor.showCompilationErrors(compilationErrors)
      alert('You cannot start your program, because you have compilation errors! Hover over the yellow highlighted parts to see the error message.')
      return false
    }
    this.machineEditor.removeCompilationErrors()

    this.machineGuiExecutor = this.parser.parse(this.level, code).initialize(this.machineGUI, this.machineEditor)
    this.machineGuiExecutor.updateDelayInMs(this.updateDelayInMs)
    return true
  }

  play() {
    if (this.machineGuiExecutor == undefined || this.machineGuiExecutor.getState() == MachineState.FINISHED) {
      if (!this.compile()) {
        return
      }
    }

    if (this.machineGuiExecutor!.getState() == MachineState.INITIALIED || this.machineGuiExecutor!.getState() == MachineState.READY) {
      this.machineGuiExecutor!.play()
    }
  }

  playSingleStep() {
    if (this.machineGuiExecutor == undefined || this.machineGuiExecutor.getState() == MachineState.FINISHED) {
      if (!this.compile()) {
        return
      }
    }

    this.machineGuiExecutor!.playSingleStep()
  }

  getMachineGuiExecutor(): MachineGuiExecutor | undefined {
    return this.machineGuiExecutor
  }

  stopAndClear() {
    this.machineGuiExecutor?.stopAndClear()
    this.machineGuiExecutor = undefined
  }
}
