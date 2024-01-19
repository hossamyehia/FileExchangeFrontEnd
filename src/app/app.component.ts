import { Component, OnInit } from '@angular/core';
import { MsgService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  title = 'منظومة تبادل الملفات';

  msg = {
    msgType: undefined,
    msgShow: false,
    msgContent: undefined,
  };

  constructor(private msgService: MsgService) {}

  ngOnInit(): void {
    this.msgService.msg.subscribe({
      next: (value) => {
        this.msg = value;
      },
    });
  }

  msgDone() {
    this.msgService.msgDone();
  }
}
