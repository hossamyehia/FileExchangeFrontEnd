import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

enum Display {
  false = "none",
  true = "block"
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [],
})
export class DialogComponent implements AfterViewInit{

  @Input() display: Display = Display.false;
  @Output() close = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['display']) {
      if (changes['display'].currentValue !== changes['display'].previousValue) {
        this.elementRef.nativeElement.style.display = this.display;
      }
    }
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement
      .addEventListener('click', this.closeDialog);
  }

  private closeDialog = (e: any) => {
    if (e.target !== e.currentTarget) return;

    this.close.emit();
    e.target.style.display = this.display;

  }

  closeDialogBtn(){
    this.close.emit();
    this.elementRef.nativeElement.style.display = this.display;
  }
}
