import {Component, OnInit} from '@angular/core';
import {Level, Stage} from "code-processing";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelFinder} from "levels";

@Component({
  selector: 'app-level-screen',
  templateUrl: './level-screen.component.html',
  styleUrls: ['./level-screen.component.css']
})
export class LevelScreenComponent implements OnInit {
  level: Level;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private levelFinder: LevelFinder) {
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
  }
}
