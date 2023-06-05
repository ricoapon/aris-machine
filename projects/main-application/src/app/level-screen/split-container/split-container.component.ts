import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {StorageService} from "storage";

@Component({
  selector: 'app-split-container',
  templateUrl: './split-container.component.html',
  styleUrls: ['./split-container.component.css']
})
export class SplitContainerComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild('left') left: ElementRef;
  @ViewChild('right') right: ElementRef;
  isSplitterDragging = false;

  constructor(private storageService: StorageService) {
  }

  ngAfterViewInit(): void {
    const leftContainerWidth = this.storageService.getLeftContainerWidthInPixels();
    if (leftContainerWidth != undefined) {
      this.resize(leftContainerWidth)
    }
  }

  onDragStart(): void {
    this.isSplitterDragging = true;
  }

  onDragEnd(): void {
    // The width has "px" at the end, so we remove this.
    const widthAsString: string = this.left.nativeElement.style.width;
    const width: number = Number(widthAsString.replace('px', ''))
    this.storageService.setLeftContainerWidthInPixels(width);

    this.isSplitterDragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onDrag(event: any) {
    if (!this.isSplitterDragging) {
      return
    }

    this.resize(event.clientX - this.left.nativeElement.offsetLeft)
  }

  private resize(leftContainerWidth: number) {
    const minWidthLeft = 400;
    const minWidthRight = 400;

    // Total width available is the total width minus borders and the splitter element.
    const totalWidth = this.container.nativeElement.offsetWidth - 4 - 4 * 2
    const newWidthLeft = leftContainerWidth;
    const newWidthRight = totalWidth - newWidthLeft;

    if (newWidthLeft < minWidthLeft || newWidthRight < minWidthRight) {
      return
    }

    this.left.nativeElement.style.width = newWidthLeft + 'px'
    this.right.nativeElement.style.width = newWidthRight + 'px'
    this.left.nativeElement.flexGrow = 0
    this.right.nativeElement.flexGrow = 0
  }
}
