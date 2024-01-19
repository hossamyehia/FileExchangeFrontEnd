import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsgService, UnitService } from 'src/app/core';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: [],
})
export class UnitFormComponent {
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  dataForm!: FormGroup;

  masterUnits: any[] = [];
  masterPrimeKey = 1;

  constructor(
    private fb: FormBuilder,
    private unitAPI: UnitService,
    private msgService: MsgService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (changes['data'].currentValue !== changes['data'].previousValue) {
        this.dataForm?.patchValue(this.data);
      }
    }
  }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      master: [false, Validators.required],
      master_id: [null, Validators.required],
    });
    this.unitAPI.getByType(this.masterPrimeKey).subscribe({
      next: (data: any) => {
        this.masterUnits = data;
        this.masterUnits.slice();
      },
      error: (err) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  onSubmit() {
    if (!this.formType) {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    this.unitAPI
      .add(this.dataForm.value)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  edit() {
    this.unitAPI
      .edit(this.data.id, this.dataForm.value)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  reset() {
    if (!this.formType) {
      this.cancel.emit();
      this.dataForm.reset();
    }
  }
}
