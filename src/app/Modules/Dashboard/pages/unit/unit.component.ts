import { Component } from '@angular/core';
import { MsgService, PermissionService, UnitService } from 'src/app/core';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: [],
})
export class UnitComponent {
  headers: any = {
    id: '#',
    name: 'الأسم',
    dir_id: 'رقم المجلد',
    dir_name: 'أسم المجلد',
    unit_type: "قيادية",
    master_id: 'رقم المجموعة الرئيسية',
    master_name: 'أسم المجموعة الرئيسية'
  };

  data: Array<any> = [];
  displayData: Array<any> = [];

  forEdit!: any;
  formType: boolean = true;

  canWrite!: boolean;
  canEdit!: boolean;

  constructor(private unitAPI: UnitService, private msgService: MsgService, private permService: PermissionService) {
    this.canWrite = this.permService.canWrite("unit");
    this.canEdit = this.permService.canEdit("unit");
    this.loadData();
  }

  loadData() {
    this.unitAPI.getAll().subscribe({
      next: (results) => {
        this.data = results as Array<any>;
        this.displayData = this.data;
        this.displayData = this.displayData.slice();
      },
      error: (err) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  runOperation(opObj: any) {
    if (opObj.operation == 'delete') this.delete(opObj.id);
    else if (opObj.operation == 'edit') {
      this.formType = false;
      this.edit(opObj.id);
    }
  }

  edit(id: number) {
    this.unitAPI.getByID(id).subscribe({
      next: (results: any) => {
        this.forEdit = results;
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  delete(id: number) {
    this.unitAPI
      .remove(id)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  reset() {
    this.formType = true;
  }

}
