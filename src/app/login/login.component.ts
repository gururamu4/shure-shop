import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from "@angular/forms";
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { SignupService } from "./loginService.service";

import { Store, select } from '@ngrx/store';
import * as fromUser from './../store/user.reducer'
import { User } from '../bs-navbar/User';
import * as userActions from '../store/user.action';
import * as CryptoJS from 'crypto-js';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginForm;
  constructor(private router: Router, fb: FormBuilder, private http: Http, private signupService: SignupService, private store: Store<User>) {
    this.loginForm = fb.group({
      username: ['', [Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.minLength(4), Validators.maxLength(15)]]
    })
  }


  userList = [];
  pass = true;
  hide() {
    this.pass = !this.pass;
  }
  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers())
    this.store.pipe(select(fromUser.getUsers)).subscribe(res => this.userList = res)
  }
  get username() {
    return this.loginForm.get('username');
  } get password() {
    return this.loginForm.get('password');
  }
  result = true;
  login() {
    this.result = false;
    for (let userL of this.userList) {
      if (this.loginForm.get('username').value === userL.username) {
        if (this.loginForm.get('password').value === userL.password) {
          this.store.dispatch(new userActions.LoadUser(userL.id))
          localStorage.setItem('currentUser', userL.id)
          localStorage.setItem('currentuser', CryptoJS.AES.encrypt(JSON.stringify(userL.id), 'secret key 123'));
          this.result = true;
          this.router.navigate(['/'])
        }
      }
    }
  }

}
