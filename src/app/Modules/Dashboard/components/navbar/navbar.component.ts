import { Component, Input, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {
  @Input() active!: boolean;

  routes: any = {
    user: 0,
    role: 1,
    unit: 2,
    file: 3,
    directory: 4,
    pending: 5
  }

  constructor( private permissions: PermissionService) {
    for(let page of Object.keys(this.routes) ){
      this.routes[page] = this.canRead(page);
    }
  }

  ngOnInit(): void {
    this.active = false;
  }

  canRead(route: string){
    return this.permissions.canRead(route);
  }


}
