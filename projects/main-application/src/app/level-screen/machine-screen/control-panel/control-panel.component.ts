import {Component} from '@angular/core';
import {LevelScreenSharedExecutor} from "../../level-screen-shared-executor";
import {StorageService} from "storage";
import {MachineState} from "code-processing";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  speedUpFactor: number;

  constructor(private levelScreenSharedExecutor: LevelScreenSharedExecutor,
              private storageService: StorageService) {
    this.speedUpFactor = this.storageService.getSpeedUpFactor()
  }

  private determineState(): MachineState {
    if (this.levelScreenSharedExecutor.getMachineGuiExecutor() != undefined) {
      return this.levelScreenSharedExecutor.getMachineGuiExecutor()!.getState()
    }
    return MachineState.INITIALIED
  }

  showStop(): boolean {
    return this.determineState() == MachineState.READY || this.determineState() == MachineState.RUNNING
  }

  showStart(): boolean {
    return this.determineState() != MachineState.RUNNING
  }

  stop() {
    this.levelScreenSharedExecutor.stopAndClear()
  }

  start() {
    this.levelScreenSharedExecutor.play()
  }

  singleStep() {
    this.levelScreenSharedExecutor.playSingleStep()
  }

  updateSpeedupFactor(factor: number) {
    this.speedUpFactor = factor
    this.storageService.setSpeedUpFactor(factor)
    // Start of slider means 1000ms delay and end of slider means 10ms delay.
    this.levelScreenSharedExecutor.getMachineGuiExecutor()?.updateDelayInMs(1000 / factor)
  }
}
