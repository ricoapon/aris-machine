import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-in-out-track',
  templateUrl: './in-out-track.component.html',
  styleUrls: ['./in-out-track.component.css']
})
export class InOutTrackComponent implements AfterViewChecked {
  @Input() isIn: boolean;
  @Input() values: number[] = []
  @ViewChild('line') line: ElementRef;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  maxIndex(): number {
    if (this.line == undefined) {
      return 100;
    }

    return (this.line.nativeElement.offsetWidth / 128) - 1;
    // // Each block and gap is 64 pixels,
    // const nrOfBlocksToShow = (+this.line.style.width) / 128;
    // return nrOfBlocksToShow;
  }

  ngAfterViewChecked(): void {
    // We use two instances of this component in the same screen. For some reason, change detection gives the error
    // "Expression has changed after it was checked". To resolve this, we add this line.
    this.changeDetectorRef.detectChanges()
  }
}
