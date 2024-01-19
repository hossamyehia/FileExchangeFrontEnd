import { Component } from '@angular/core';
import { AuthService, FileService, MsgService, PendingService, PermissionService } from 'src/app/core';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: [],
})
export class ReceivedComponent {
  dialogOpen: boolean = false;
  pendingList: any = [];
  sharedList: any = [];

  pending!: boolean;

  constructor(
    private fileService: FileService,
    private pendingService: PendingService,
    private permissions: PermissionService,
    private msgService: MsgService
  ) {}

  ngOnInit(): void {
    this.pendingService.getForUnit().subscribe({
      next: (data: any) => {
        this.pendingList = data;
        this.pendingList.slice();
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });

    this.fileService.getSharedWith().subscribe({
      next: (data: any) => {
        this.sharedList = data;
        this.sharedList.slice();
      },
      error: (err: any) => {
        this.msgService.msgStart(err.Message, false);
      },
    });

    this.pending = this.permissions.canRead("pending");
  }

  uploadFile(event: Event) {
    const files = (event.target as HTMLInputElement).files || [];
    const file = files[0];
    let newData = new FormData();
    newData.append('directory', '0');
    newData.append('file', file, file.name.toString());
    newData.append('name', file.name.toString());

    if (file != null) {
      this.msgService.msgStart('Upload Started', true);
      this.fileService
        .add(newData)
        .then((res: any) => {
          this.msgService.msgStart('Uploaded Successfully', true);
        })
        .catch((err: any) => {
          this.msgService.msgStart(err.Message, false);
        });
    }
  }

}
