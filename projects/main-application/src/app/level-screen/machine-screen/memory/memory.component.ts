import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent {
  @Input() memorySlots: (number | undefined)[] = [];
  @Input() nrOfGridColumns: number = 4;
}
