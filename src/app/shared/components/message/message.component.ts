import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: []
})
export class MessageComponent {

  @Input() type?: boolean;
  @Input() show: boolean = false;
  @Input() msg?: string;
  @Output() done = new EventEmitter();

  constructor(){}

  ngOnChanges(changes: SimpleChanges){
    if(changes["show"]){
      if(changes["show"].currentValue){
        setTimeout(this.reset, 3000)
      }
    }
  }

  private reset = ()=>{
    this.type = undefined;
    this.show = false;
    this.msg = undefined;
    this.done.emit();
  }

}
