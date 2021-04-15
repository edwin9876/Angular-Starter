import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage?: string;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder
  ) {}

  registerForm = this.fb.group({
    username: [''],
    password: [''],
  });

  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit() {
    console.log('Your form data : ', this.registerForm.value);
    this._api.postTypeRequest('user/login', this.registerForm.value).subscribe(
      (res: any) => {
        if (res.status) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            'userData',
            JSON.stringify(res.data)
          );
          this._auth.setDataInLocalStorage('token', res.token);
          this._router.navigate(['']);
        } else {
        }
      },
      (err) => {
        this.errorMessage = err['error'].message;
      }
    );
  }
  isUserLogin() {
    console.log(this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
  logout() {
    this._auth.clearStorage();
    this._router.navigate(['']);
  }
}
