import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsgService, RoleService, UnitService, UserService } from 'src/app/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: [],
})
export class UserFormComponent {
  @Input() data!: any;
  @Input() formType!: boolean;
  @Output() newVal: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  dataForm!: FormGroup;

  options!: any;
  unit_list!: any;

  constructor(
    private fb: FormBuilder,
    private userAPI: UserService,
    private roleAPI: RoleService,
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
      username: [null, Validators.required],
      password: [null, Validators.required],
      role: [null, Validators.required],
      unit_id: [null, Validators.required],
    });

    this.loadData();
  }

  loadData() {
    this.roleAPI.getAll().subscribe({
      next: (results) => {
        this.options = results as Array<any>;
      },
      error: (err) => {
        this.msgService.msgStart(err.Message, false);
      },
    });

    this.unitAPI.getAll().subscribe({
      next: (results) => {
        this.unit_list = results as Array<any>;
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
    this.userAPI
      .add(this.dataForm.value)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  edit() {
    this.userAPI
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
