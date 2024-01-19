import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../components/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  active!: boolean;

  constructor(){
    this.active = false;
  }

  toggleNavBar(active: boolean){
    this.active = active;
  }

}
