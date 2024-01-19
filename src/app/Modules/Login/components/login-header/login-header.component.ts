import { Component } from '@angular/core';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: []
})
export class LoginHeaderComponent {

  rotate(elem: any){
    elem.classList.toggle('rotated');
  }
}
