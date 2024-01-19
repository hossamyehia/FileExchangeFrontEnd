import { Component } from '@angular/core';
import { MsgService, UserService } from 'src/app/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [],
})
export class UsersComponent {
  headers: any = {
    id: '#',
    name: 'الأسم',
    unit_name: 'الوحدة',
    username: 'أسم المستخدم',
    password: 'كلمة السر',
    role: 'نوع الحساب',
  };

  data: Array<any> = [];
  displayData: Array<any> = [];

  forEdit!: any;
  formType: boolean = true;

  constructor(private userAPI: UserService, private msgService: MsgService) {
    this.loadData();
  }

  loadData() {
    this.userAPI.getAll().subscribe({
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
    this.userAPI.getById(id).subscribe({
      next: (results: any) => {
        this.forEdit = results;
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  delete(id: number) {
    this.userAPI
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
