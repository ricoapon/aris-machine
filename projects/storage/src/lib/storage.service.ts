import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {Stage} from "code-processing";

type CookieStorage = {
  speedUpFactor: number,
  leftContainerWidthInPixels: number | undefined,
  code: {
    [stage: number]: {
      [key: number]: string
    }
  }
  completedLevels: {
    [stage: number]: number[]
  }
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly EXPIRES_IN_DAYS = 365
  readonly COOKIE_NAME = 'aris-machine-cookie'
  private readonly storage: CookieStorage

  constructor(private cookieService: CookieService) {
    if (this.cookieService.check(this.COOKIE_NAME)) {
      this.storage = JSON.parse(this.cookieService.get(this.COOKIE_NAME))
    } else {
      this.storage = {
        speedUpFactor: 1,
        leftContainerWidthInPixels: undefined,
        code: {},
        completedLevels: {},
      }
      this.storage.code[Stage.MAIN] = {}
      this.storage.completedLevels[Stage.MAIN] = []
    }
  }

  private save() {
    this.cookieService.set(this.COOKIE_NAME, JSON.stringify(this.storage), this.EXPIRES_IN_DAYS, '/')
  }

  getLeftContainerWidthInPixels(): number | undefined {
    return this.storage.leftContainerWidthInPixels
  }

  setLeftContainerWidthInPixels(value: number | undefined) {
    this.storage.leftContainerWidthInPixels = value
    this.save()
  }

  getCode(stage: Stage, levelId: number): string {
    if (this.storage.code[stage][levelId] == undefined) {
      return ''
    }

    return this.storage.code[stage][levelId]
  }

  setCode(stage: Stage, levelId: number, code: string) {
    this.storage.code[stage][levelId] = code
    this.save()
  }

  getSpeedUpFactor(): number {
    return this.storage.speedUpFactor
  }

  setSpeedUpFactor(value: number): void {
    this.storage.speedUpFactor = value
    this.save()
  }

  isLevelCompleted(stage: Stage, levelId: number): boolean {
    return this.storage.completedLevels[stage].indexOf(levelId) > -1
  }

  completeLevel(stage: Stage, levelId: number): void {
    if (!this.isLevelCompleted(stage, levelId)) {
      this.storage.completedLevels[stage].push(levelId)
      this.save()
    }
  }
}
