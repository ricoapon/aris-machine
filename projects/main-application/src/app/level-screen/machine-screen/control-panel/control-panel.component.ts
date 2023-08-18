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
    this.levelScreenSharedExecutor.setUpdateDelayInMs(1000 / this.speedUpFactor)
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
    this.levelScreenSharedExecutor.setUpdateDelayInMs(1000 / factor)
  }

  nextSpeedUpFactor() {
    if (this.speedUpFactor == 1) {
      this.speedUpFactor = 4
    } else if (this.speedUpFactor == 4) {
      this.speedUpFactor = 16
    } else if (this.speedUpFactor == 16) {
      this.speedUpFactor = 32
    } else if (this.speedUpFactor == 32) {
      this.speedUpFactor = 1
    }

    this.storageService.setSpeedUpFactor(this.speedUpFactor)
    // Start of slider means 1000ms delay and end of slider means 10ms delay.
    this.levelScreenSharedExecutor.setUpdateDelayInMs(1000 / this.speedUpFactor)
  }
}
