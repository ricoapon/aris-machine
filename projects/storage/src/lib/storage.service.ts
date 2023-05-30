import {Injectable} from "@angular/core";
import {CookieService} from "ngx-cookie-service";

type CookieStorage = {
  speedUpFactor: number,
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
      }
    }
  }

  private save() {
    this.cookieService.set(this.COOKIE_NAME, JSON.stringify(this.storage), this.EXPIRES_IN_DAYS)
  }

  getSpeedUpFactor(): number {
    return this.storage.speedUpFactor
  }

  setSpeedUpFactor(value: number): void {
    this.storage.speedUpFactor = value
    this.save()
  }
}
