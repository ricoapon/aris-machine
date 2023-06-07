import {Component} from '@angular/core';
import {LevelFinder} from "levels";
import {Stage} from "code-processing";
import {StorageService} from "storage";

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.css', '../shared.css']
})
export class LevelSelectionComponent {
  readonly nrOfLevels: number

  constructor(levelFinder: LevelFinder, private storageService: StorageService) {
    this.nrOfLevels = levelFinder.getLevels(Stage.MAIN).length
  }

  levels(): number[] {
    const result = []
    for (let i = 1; i <= this.nrOfLevels; i++) {
      result.push(i)
    }
    return result
  }

  isCompleted(i: number): string {
    if (this.storageService.isLevelCompleted(Stage.MAIN, i)) {
      return 'completed'
    }
    return ''
  }
}
