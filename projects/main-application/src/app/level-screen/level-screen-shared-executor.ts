import {Injectable} from "@angular/core";
import {Level, MachineEditor, MachineGUI, MachineGuiExecutor, MachineState, Parser} from "code-processing";

@Injectable({
  providedIn: 'root',
})
export class LevelScreenSharedExecutor {
  private readonly parser = new Parser()
  private machineGuiExecutor: MachineGuiExecutor | undefined = undefined
  private determineCode: () => string
  private level: Level
  private machineGUI: MachineGUI
  private machineEditor: MachineEditor

  setDetermineCode(determineCode: () => string) {
    this.determineCode = determineCode
  }

  setLevel(level: Level) {
    this.level = level
  }

  initialize(machineGUI: MachineGUI, machineEditor: MachineEditor) {
    this.machineGUI = machineGUI
    this.machineEditor = machineEditor
  }

  play() {
    if (this.machineGuiExecutor == undefined || this.machineGuiExecutor.getState() == MachineState.FINISHED) {
      const code = this.determineCode()
      this.machineGuiExecutor = this.parser.parse(this.level, code).initialize(this.machineGUI, this.machineEditor)
    }

    if (this.machineGuiExecutor.getState() == MachineState.INITIALIED || this.machineGuiExecutor.getState() == MachineState.READY) {
      this.machineGuiExecutor.play()
    }
  }

  playSingleStep() {
    if (this.machineGuiExecutor == undefined || this.machineGuiExecutor.getState() == MachineState.FINISHED) {
      const code = this.determineCode()
      this.machineGuiExecutor = this.parser.parse(this.level, code).initialize(this.machineGUI, this.machineEditor)
    }

    this.machineGuiExecutor.playSingleStep()
  }

  getMachineGuiExecutor(): MachineGuiExecutor | undefined {
    return this.machineGuiExecutor
  }

  stopAndClear() {
    this.machineGuiExecutor?.stopAndClear()
    this.machineGuiExecutor = undefined
  }
}
