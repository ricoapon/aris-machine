import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Level, MachineGUI, Stage} from "code-processing";
import {LevelScreenSharedExecutor} from "../level-screen-shared-executor";
import {StorageService} from "storage";
import {LevelFinder} from "levels";

@Component({
  selector: 'app-machine-screen',
  templateUrl: './machine-screen.component.html',
  styleUrls: ['./machine-screen.component.css']
})
export class MachineScreenComponent implements MachineGUI {
  input: number[];
  output: number[];
  memorySlots: (number | undefined)[];
  @ViewChild('finishedDialog') finishedDialog: ElementRef<HTMLDialogElement>

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private levelScreenSharedExecutor: LevelScreenSharedExecutor,
              private storageService: StorageService,
              private router: Router,
              private levelFinder: LevelFinder) {
    // Add some values so the HTML stuff doesn't break.
    this.input = []
    this.output = []
    this.memorySlots = []
  }

  rangeToN(n: number): number[] {
    return Array(n).fill(0).map((x, i) => i);
  }

  determineNrOfGridColumns(): number {
    const length = this.memorySlots.length
    if (length <= 5) {
      return length;
    }

    return Math.ceil(length / 2);
  }

  detectChanges(): void {
    this.changeDetectorRef.detectChanges()
  }

  initialize(level: Level): void {
    // Clone the array to make sure no changes from the outside affect this class.
    this.input = [...level.input]
    this.output = [];
    this.memorySlots = [];
    for (let i = 0; i < level.nrOfMemorySlots; i++) {
      this.memorySlots.push(undefined)
    }
  }

  isLastLevel(): boolean {
    const currentLevelId = this.levelScreenSharedExecutor.level.id
    return this.levelFinder.getLevels(Stage.MAIN).length <= currentLevelId
  }

  dialogBack() {
    this.levelScreenSharedExecutor.stopAndClear()
    this.finishedDialog.nativeElement.close()
  }

  dialogNext() {
    const currentLevelId = this.levelScreenSharedExecutor.level.id
    const nextLevel: number = 1 + currentLevelId

    // If we navigate normally, we don't re-initialise the entire level. If we refresh the page, it does.
    // To mimic this, we use a trick to reload the level page.
    // See https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router.
    // We are not actually reloading the page, so we have to reset the executor though.
    this.levelScreenSharedExecutor.stopAndClear()
    this.router.navigateByUrl('/', {skipLocationChange: true})
      .then(() => this.router.navigate(['/levels/' + nextLevel]));
  }

  handleAddOutput(value: number): void {
    // To make sure the output is shown in the correct order, we need to add at the start instead of at the end.
    this.output.unshift(value)
  }

  handleError(message: string): void {
    alert(message)
    // There should only be one error in total. Clearing ensures that you can click play again.
    this.levelScreenSharedExecutor.stopAndClear()
  }

  handleFinished(): void {
    this.storageService.completeLevel(this.levelScreenSharedExecutor.level.stage, this.levelScreenSharedExecutor.level.id)
    this.finishedDialog.nativeElement.showModal()
  }

  handleSetMemory(index: number, value: number | undefined): void {
    this.memorySlots[index] = value
  }

  handleShiftInput(): void {
    this.input.shift()
  }
}
