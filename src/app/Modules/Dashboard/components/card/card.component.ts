import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
import { FileService, MsgService, PendingService } from 'src/app/core';

enum Display {
  false = 'none',
  true = 'block',
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [],
})
export class CardComponent {
  @Input() type: string = 'file';
  @Input() data!: any;
  @Input() index!: number;
  @Output() deleteEvent = new EventEmitter<number>();

  @Input() units!: any[];
  myForm!: FormGroup;

  dialogDisplay: Display = Display.false;

  constructor(
    private fileService: FileService,
    private pendingService: PendingService,
    private msgService: MsgService
  ) {}

  getFile() {
    this.msgService.msgStart('Getting File', true);
    this.fileService.download(this.data.id as number).subscribe({
      next: (data: Blob) => {
        this.msgService.msgStart('Starting Download', true);
        let downloadURL = window.URL.createObjectURL(data);
        saveAs(
          downloadURL,
          this.data.name + '.' + this.data.type || 'download'
        );
      },
      error: (err) => {
        this.msgService.msgStart(err.Message, false);
      },
    });
  }

  pressShare() {
    this.dialogDisplay = Display.true;
  }

  deleteFile() {
    this.fileService
      .remove(this.data.id)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
        this.deleteEvent.emit(this.index);
        /*setTimeout(()=>{window.location.reload()},500);*/
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  acceptFile() {
    this.pendingService
      .accept(this.data.id)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  refuseFile() {
    this.pendingService
      .refuse(this.data.id)
      .then((res: any) => {
        this.msgService.msgStart(res.Message, true);
      })
      .catch((err) => {
        this.msgService.msgStart(err.Message, false);
      });
  }

  closeDialog() {
    this.dialogDisplay = Display.false;
  }
}
