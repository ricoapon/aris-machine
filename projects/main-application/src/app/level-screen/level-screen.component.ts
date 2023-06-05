import {Component, OnInit} from '@angular/core';
import {Level, Stage} from "code-processing";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelFinder} from "levels";
import {StorageService} from "storage";

@Component({
  selector: 'app-level-screen',
  templateUrl: './level-screen.component.html',
  styleUrls: ['./level-screen.component.css']
})
export class LevelScreenComponent implements OnInit {
  level: Level
  content: string
  updateCookieTimeout: NodeJS.Timeout | undefined = undefined

  constructor(private route: ActivatedRoute,
              private router: Router,
              private levelFinder: LevelFinder,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const levelId = paramMap.get('id')
      try {
        if (levelId == null) {
          // noinspection ExceptionCaughtLocallyJS
          throw Error('No valid level')
        }

        this.level = this.levelFinder.getLevel(Stage.MAIN, +levelId)

        if (this.level == undefined) {
          // noinspection ExceptionCaughtLocallyJS
          throw new Error("Level " + levelId + " is undefined")
        }
      } catch (e) {
        this.router.navigate(['/'])
      }
    })

    this.content = this.storageService.getCode(this.level.stage, this.level.id)
  }

  updateContent(content: string) {
    this.content = content

    // We don't want to spam the storage with new values on every keyboard press.
    // We only save if no changes have been made for one second.
    if (this.updateCookieTimeout != undefined) {
      clearInterval(this.updateCookieTimeout)
    }
    this.updateCookieTimeout = setTimeout(() => this.storageService.setCode(this.level.stage, this.level.id, content), 1000)
  }
}
