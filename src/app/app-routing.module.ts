import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
  path: 'login',
  loadChildren: () => import('./Modules/Login/login.module').then(m => m.LoginModule)
 },
 {
  path: 'dashboard',
  loadChildren: () => import('./Modules/Dashboard/dashboard.module').then(m => m.DashboardModule),
  canLoad: [AuthGuard]
 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
