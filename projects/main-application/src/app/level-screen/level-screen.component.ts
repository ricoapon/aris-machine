import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Level, Stage} from "code-processing";
import {ActivatedRoute, Router} from "@angular/router";
import {LevelFinder} from "levels";
import {StorageService} from "storage";
import {LevelScreenSharedExecutor} from "./level-screen-shared-executor";
import {CodeEditorComponent} from "code-editor";
import {MachineScreenComponent} from "./machine-screen/machine-screen.component";

@Component({
  selector: 'app-level-screen',
  templateUrl: './level-screen.component.html',
  styleUrls: ['./level-screen.component.css']
})
export class LevelScreenComponent implements OnInit, AfterViewInit {
  level: Level
  content: string
  updateContentTimeout: NodeJS.Timeout | undefined = undefined
  @ViewChild('machineScreen') machineScreenComponent: MachineScreenComponent;
  @ViewChild('codeEditor') codeEditorComponent: CodeEditorComponent;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private levelFinder: LevelFinder,
              private storageService: StorageService,
              private levelScreenSharedExecutor: LevelScreenSharedExecutor) {
    this.levelScreenSharedExecutor.setDetermineCode(() => this.content)
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
        this.levelScreenSharedExecutor.level = this.level

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

  ngAfterViewInit(): void {
    this.machineScreenComponent.initialize(this.level)
    this.machineScreenComponent.detectChanges()
    this.levelScreenSharedExecutor.initialize(this.machineScreenComponent, this.codeEditorComponent)
  }

  updateContent(content: string) {
    this.content = content

    // We want to execute two things when content changes:
    // 1. Validate the content and show compile errors.
    // 2. Store the content in the storage.
    // We don't want to show errors directly after the user types something, since they are still busy typing.
    // We also don't want to spam the storage with new values on every keyboard press.
    // We execute both if no changes have been made for a second.
    if (this.updateContentTimeout != undefined) {
      clearInterval(this.updateContentTimeout)
    }

    this.updateContentTimeout = setTimeout(() => {
      this.levelScreenSharedExecutor.validate()
      this.storageService.setCode(this.level.stage, this.level.id, content)
    }, 1000)
  }

  execute() {
    this.levelScreenSharedExecutor.play()
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    // If we press back in the browser, we don't re-initialise the entire level. If we refresh the page, it does.
    // To mimic this, we use a trick to reload the level page.
    // See https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router.
    // We are not actually reloading the page, so we have to reset the executor though.
    // We do some additional magic to ensure that we direct to the right page.
    // @ts-ignore
    const match = new RegExp(/.*levels\/(\d+)$/g).exec(event.currentTarget.location.href)
    if (match != null) {
      const levelId = match[1]
      // We are indeed going back to another level screen. So we need to execute the trick.
      this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(() => this.router.navigate(['/levels/' + levelId]))
    }
  }
}
