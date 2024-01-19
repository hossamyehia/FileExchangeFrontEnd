import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: []
})
export class DashboardHeaderComponent implements OnInit {
  userInfo!: any;
  @Input() active!:boolean;
  @Output() statusChange = new EventEmitter();

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.active = false;
    this.userInfo = this.auth.deserilizeToken(this.auth.tokenGetter());
  }

  toggleNavBar(contoller: any){
    contoller.classList.toggle("active");
    this.active = !this.active;
    this.statusChange.emit(this.active)
  }

  logout(){
    this.auth.logout();
  }
}
