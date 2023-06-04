import {MachineGuiExecutor} from "./machine-gui-executor";
import {Level} from "../level";
import {MachineEditor, MachineGUI} from "../public-abstractions";
import {MachineResult} from "./machine";

// Intermediate class that ensures initialization is done in the proper way. This can now be done at any point in time.
// Maybe a bit overkill, but whatever.
export class MachineGuiExecutorCreator {
  constructor(private level: Level, private machineResult: MachineResult) {}

  initialize(machineGUI: MachineGUI, machineEditor: MachineEditor): MachineGuiExecutor {
    const executor = new MachineGuiExecutor(machineGUI, machineEditor, this.level, this.machineResult)
    machineGUI.initialize(this.level)
    machineGUI.detectChanges()
    return executor
  }
}
