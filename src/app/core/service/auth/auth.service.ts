import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,private router: Router) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  public tokenGetter(): string{
    return localStorage.getItem('token') || "";
  }

  public tokenSetter(data: any){
    localStorage.setItem("token", ( ({ token }) => token)(data));
  }

  public deserilizeToken(token: string): any{
    return decode(token);
  }

  public getID(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["id"];
  }

  public getName(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["name"];
  }

  public getTitle(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["title"];
  }

  public getPermission(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["permission"];
  }

  public getUnitID(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["unit_id"];
  }

  public getUnitName(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["unit_name"];
  }

  public getUnitType(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["unit_type"];
  }

  public getUnitDIR(){
    let token = this.tokenGetter();
    return this.deserilizeToken(token)["dir_id"];
  }

  public logout() {
    localStorage.removeItem("token");
    this.routeTologin();
  }

  public routeTologin(){
    this.router.navigate(["/login"]);
    window.location.reload();
  }
}
