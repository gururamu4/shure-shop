import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { User } from '../models/user';
import * as userActions from '../store/user.action';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm;
  constructor(private router: Router,
    private service: RegisterService, private fb: FormBuilder,
    private store: Store<User>
  ) {
    this.registrationForm = fb.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password1: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      url: ['']
    })
  }
  get username() {
    return this.registrationForm.get('username');
  }
  get url() {
    return this.registrationForm.get('url');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get password1() {
    return this.registrationForm.get('password1');
  }
  get email() {
    return this.registrationForm.get('email')
  }
  RegisterNewUser() {
    let newUser = {
      id: Math.floor(Math.random() * 1000000),
      email: this.registrationForm.get('email').value,
      imgUrl: this.registrationForm.get('url').value,
      username: this.registrationForm.get('username').value,
      password: this.registrationForm.get('password').value,
      isAdmin: false
    }
    if (!newUser.imgUrl) {
      newUser.imgUrl = 'https://cdn1.vectorstock.com/i/1000x1000/82/55/anonymous-user-circle-icon-vector-18958255.jpg';
    }
    this.store.dispatch(new userActions.AddUser(newUser));

    this.router.navigate(['/login']);
  }
}
