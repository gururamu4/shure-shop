import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store'
import { User } from '../models/user'
import * as userActions from '../store/user.action'
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm;
  constructor(private router: Router,
    private service: RegisterService, private fb: FormBuilder,
    private store: Store<User>
  ) {
    this.registrationForm = fb.group({
      email: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14),
        //  Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
      ]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      url: ['', Validators.required],
      age: ['', Validators.required]
    })
  }
  private get username(): string {
    return this.registrationForm.get('username');
  }
  private get url(): string {
    return this.registrationForm.get('url');
  }
  private get password(): string {
    return this.registrationForm.get('password');
  }
  private get password1(): string {
    return this.registrationForm.get('password1');
  }
  private get age(): number {
    return this.registrationForm.get('age')
  }
  get email(): string {
    return this.registrationForm.get('email')
  }
  // uniqueness=false;
  // uniqueUsername(name){
  //   let userList=JSON.parse(localStorage.getItem('userList')||'[]');
  //   for(let user of userList){
  //     if(user.username===name.value){
  //       this.uniqueness=!this.uniqueness;
  //     }
  //   }
  //   console.log(this.uniqueness)
  // }
  ngOnInit() {
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
    console.log(newUser)
    this.store.dispatch(new userActions.AddUser(newUser));

    this.router.navigate(['/login']);

  }


}
