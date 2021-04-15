import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { AuthService } from './../../../services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidator } from '../../validation';
import { tap } from 'rxjs/operators';

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

  registerForm = this.fb.group(
    {
      userName: [''],
      email: ['', [Validators.email, Validators.required]],
      password: [''],
      rePassword: [''],
    },
    { validators: passwordValidator }
  );

  onSubmit() {
    this._api
      .postTypeRequest('user/register', this.registerForm.value)
      .subscribe((res: any) => {
        console.log(res);
        //   if (res.status) {
        //     console.log(res);
        //     this._auth.setDataInLocalStorage(
        //       'userData',
        //       JSON.stringify(res.data)
        //     );
        //     this._auth.setDataInLocalStorage('token', res.token);
        //     this._router.navigate(['login']);
        //   } else {
        //     console.log(res);
        //     alert(res.msg);
        //   }
        // },
        // (err) => {
        //   this.errorMessage = err['error'].message;
      });
  }
  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  setDefaultForm() {
    this.registerForm.patchValue({
      userName: 'ee',
      email: 'e@e.com',
      password: '1',
      rePassword: '1',
    });

    this._api.getTypeRequest('user').subscribe((res) => console.log(res));
  }
  promptErrors() {
    Object.values(this.registerForm.controls).forEach(
      (control: AbstractControl) => {
        control.markAsTouched();
      }
    );
    this.registerForm.patchValue({
      userName: 'ee',
      email: 'ee.com',
      password: '1',
      rePassword: '2',
    });
  }

  get userName() {
    return this.registerForm.get('userName')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
}
