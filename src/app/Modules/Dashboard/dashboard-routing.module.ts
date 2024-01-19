import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';
import { SentComponent } from './pages/sent/sent.component';
import { ReceivedComponent } from './pages/received/received.component';
import { UnitComponent } from './pages/unit/unit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'user',
        component: UsersComponent,
      },
      {
        path: 'role',
        component: RolesComponent,
      },
      {
        path: 'unit',
        component: UnitComponent,
      },
      {
        path: 'files/sent',
        component: SentComponent,
      },
      {
        path: 'files/recieved',
        component: ReceivedComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
