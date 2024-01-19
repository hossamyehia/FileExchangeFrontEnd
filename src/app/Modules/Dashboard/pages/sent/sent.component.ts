import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  FileService,
  HelperService,
  MsgService,
  UnitService,
} from 'src/app/core';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: [],
})
export class SentComponent implements OnInit {
  dialogOpen: boolean = false;
  list: any = [];
  dir: number = 0;

  dataForm!: FormGroup;

  masterUnits!: any[];
  slaveUnits!: any[];

  units!: any[];

  constructor(
    private fileService: FileService,
    private unitService: UnitService,
    private authService: AuthService,
    private fb: FormBuilder,
    private _helper: HelperService,
    private msgService: MsgService
  ) {}

  ngOnInit(): void {
    this.fileService.getByOwner(this.authService.getID()).subscribe({
      next: (data: any) => {
        this.list = data;
        this.list.slice();
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });

    if (!this.authService.getUnitID()) this.getAllUnits();
    else {
      if (this.authService.getUnitType()) {
        this.getRelatives();
      } else {
        this.getMasterUnit();
      }
    }

    this.dataForm = this.fb.group({
      file: [null, Validators.required],
      directory: [0, Validators.required],
    });

    this.dir = this.authService.getUnitDIR();
  }

  getAllUnits() {
    this.unitService.getAll().subscribe({
      next: (data: any) => {
        this.units = data;
        this.list.slice();
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  getRelatives() {
    this.unitService
      .getRelatives()
      .then((res: any) => {
        this.units = res.Data;
        this.units.slice();
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  /*
  getMasterUnits(){
    this.unitService.getByType(1).subscribe({
      next: (data: any) => {
        this.units = data;
        this.list.slice();
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  getSlaves() {
    this.unitService
      .getSlaves()
      .then((res: any) => {
        this.units = res.Data;
        this.units.slice();
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  */

  getMasterUnit() {
    this.unitService
      .getMaster()
      .then((res: any) => {
        this.units = [res.Data];
        this.units.slice();
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  uploadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    const file = files[0];
    let newData = new FormData();
    newData.append('directory', this.dir.toString());
    newData.append('file', file, file.name.toString());
    newData.append('name', file.name.toString());

    if (file != null) {
      let [name, type] = this._helper.processFile(file.name.toString());
      let [size, sizeUnit] = this._helper.processSize(file.size);
      this.msgService.msgStart('Upload Started', true);
      this.fileService
        .add(newData)
        .then((res: any) => {
          this.msgService.msgStart('Uploaded Successfully', true);
          this.list.push({
            id: res.Data[0]['id'] || 0,
            name,
            type,
            size: size.toFixed(4),
            sizeUnit,
            createdAt: new Date(),
          });
          this.list.slice();
        })
        .catch((err: any) => {
          this.msgService.msgStart(err.Message, false);
        });
    }
  }

  deleteFromList(index: number) {
    this.msgService.msgStart('Deleted Successfully', true);
    this.list.splice(index, 1);
    this.list.slice();
  }
}
