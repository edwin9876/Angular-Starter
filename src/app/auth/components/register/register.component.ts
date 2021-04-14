import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.isUserLogin();
  }

  registerForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
  });

  onSubmit() {
    console.log('Your form data : ', this.registerForm.value);
    this._api
      .postTypeRequest('user/register', this.registerForm.value)
      .subscribe(
        (res: any) => {
          if (res.status) {
            console.log(res);
            this._auth.setDataInLocalStorage(
              'userData',
              JSON.stringify(res.data)
            );
            this._auth.setDataInLocalStorage('token', res.token);
            this._router.navigate(['login']);
          } else {
            console.log(res);
            alert(res.msg);
          }
        },
        (err) => {
          this.errorMessage = err['error'].message;
        }
      );
  }
  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
