import {Level, Stage} from "code-processing";
import {LEVELS} from "./levels";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class LevelFinder {
  getLevel(stage: Stage, id: number): Level {
    // @ts-ignore
    return LEVELS.get(stage)[id - 1]
  }

  getLevels(stage: Stage): Level[] {
    // @ts-ignore
    return LEVELS.get(stage)
  }
}
