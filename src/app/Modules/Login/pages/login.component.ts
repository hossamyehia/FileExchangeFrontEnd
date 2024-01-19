import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, AuthService, MsgService } from 'src/app/core';
import ApiResponse from 'src/app/core/models/api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(private api: ApiService, private auth: AuthService, private router: Router, private msgService: MsgService){}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(){
    this.api.post("user/login", this.loginForm.value)
    .subscribe({
      next: ( res: ApiResponse ) => {
        this.auth.tokenSetter(res["Data"][0]);
        this.msgService.msgStart("Login Success", true);
        this.router.navigate(['/dashboard']);
      },
      error: (err)=> {
        this.msgService.msgStart(err.Message, false);
      }
    })
  }

}
