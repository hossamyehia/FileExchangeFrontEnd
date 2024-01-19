import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  msg = new BehaviorSubject<any>({
    msgType: null,
    msgShow: false,
    msgContent: null,
  });;

  constructor() { }

  msgStart(msg: string, type: boolean) {
    this.msg.next({
      msgType: type,
      msgShow: true,
      msgContent: msg,
    })
  }

  msgDone() {
    this.msg.next({
      msgType: null,
      msgShow: false,
      msgContent: null,
    })
  }

}
