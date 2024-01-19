import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileService, MsgService } from 'src/app/core';
import { PendingService } from 'src/app/core/modules/pending/service/pending.service';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: [],
})
export class ShareFormComponent implements OnInit {
  @Input() file_id!: number;
  @Input() units!: any[];
  /*
  @Input() masterUnits!: any[];
  @Input() slaveUnits!: any[];
  */
  myForm!: FormGroup;

  selectedUnits: any[] = [];
  currentSelected: any[] = [];

  constructor(
    private fileService: FileService,
    private pendingService: PendingService,
    private _fb: FormBuilder,
    private msgService: MsgService
  ) {}

  ngOnInit() {
    this.loadData();

    this.myForm = this._fb.group({
      file_id: [this.file_id],
      unselected: this._fb.array([]),
      selected: this._fb.array([]),
    });
  }

  loadData() {
    this.fileService.getSeenBy(this.file_id).subscribe({
      next: (data: any) => {
        this.selectedUnits = data;
        this.currentSelected = [...this.selectedUnits];
        this.currentSelected.slice();
      },
      error: (err) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  onCheckChange(event: any) {
    const selectedUnitsControlers: FormArray = this.myForm.get(
      'selected'
    ) as FormArray;
    const unselectedUnitsControlers: FormArray = this.myForm.get(
      'unselected'
    ) as FormArray;

    let selectedIndex = this.selectedUnits.indexOf(
      parseInt(event.target.value)
    );
    let currentIndex = this.currentSelected.indexOf(
      parseInt(event.target.value)
    );

    if (event.target.checked) {
      if (selectedIndex === -1) {
        selectedUnitsControlers.push(
          new FormControl(parseInt(event.target.value))
        );
      } else {
        let i: number = 0;

        unselectedUnitsControlers.controls.forEach((ctrl: any) => {
          if (ctrl.value == parseInt(event.target.value)) {
            unselectedUnitsControlers.removeAt(i);
            return;
          }
          i++;
        });
      }
      this.currentSelected.push(parseInt(event.target.value));
    } else {
      if (selectedIndex === -1) {
        let i: number = 0;

        selectedUnitsControlers.controls.forEach((ctrl: any) => {
          if (ctrl.value == parseInt(event.target.value)) {
            selectedUnitsControlers.removeAt(i);
            return;
          }
          i++;
        });
      } else {
        unselectedUnitsControlers.push(
          new FormControl(parseInt(event.target.value))
        );
      }

      this.currentSelected.splice(currentIndex, 1);
    }
  }

  submit() {
    if (
      (this.myForm.get('selected') as FormArray).length ||
      (this.myForm.get('unselected') as FormArray).length
    ){
      this.pendingService
      .add(this.myForm.value)
      .then((res: any) => {
        this.selectedUnits = this.currentSelected;
        this.resetForm();
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
    }else{
      this.msgService.msgStart("There is no update", false);
    }

  }

  resetForm() {
    (this.myForm.get('selected') as FormArray).clear();
    (this.myForm.get('unselected') as FormArray).clear();
  }
}
