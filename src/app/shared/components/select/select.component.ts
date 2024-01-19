import { Component, EventEmitter, Input, NgZone, OnInit, Output, TemplateRef, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { createPopper } from '@popperjs/core';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: []
})
export class SelectComponent implements OnInit {
  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() options: any = [];
  @Input() model: any;
  @Output() selectChange = new EventEmitter();
  @Output() closed = new EventEmitter();

  originalOptions!: any;
  searchControl = new FormControl();
  view: any;
  popperRef: any;
  isOpen!: boolean;

  constructor(private vcr: ViewContainerRef, private zone: NgZone) {}

  get label() {
    return this.model ? this.model[this.labelKey] : 'Select...';
  }

  ngOnInit() {
    this.originalOptions = [...this.options];
    if (this.model !== undefined) {
      this.model = this.options.find(
        (currentOption: any) => currentOption[this.idKey] === this.model
      );
    }

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(term => this.search(term));
  }

  search(value: string) {
    this.options = this.originalOptions.filter(
      (option: any) => option[this.labelKey].includes(value)
    );
  }

  open(dropdownTpl: TemplateRef<any>, origin: HTMLElement) {
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    const dropdown = this.view.rootNodes[0];

    document.body.appendChild(dropdown);
    dropdown.style.width = `${origin.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = createPopper(origin, dropdown);
    });

    this.isOpen = true;
  }

  select(option: any) {
    this.model = option;
    this.selectChange.emit(option[this.idKey]);
  }

  isActive(option: any) {
    if (!this.model) {
      return false;
    }

    return option[this.idKey] === this.model[this.idKey];
  }

  close() {
    this.closed.emit();
    this.popperRef.destroy();
    this.view.destroy();
    this.searchControl.patchValue('');
    this.view = null;
    this.popperRef = null;
  }

}
