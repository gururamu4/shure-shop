import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,FormBuilder,Validators, AbstractControl } from "@angular/forms";
import {cannotContainSpace,asyncUnique, passwordCheck} from './username.validators'
import { Http, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { SignupService } from "./loginService.service";
import { usernameValidator } from "./httpValidator";


import { Store,select } from '@ngrx/store';
import * as productAction from "../store/products.actions";
 import * as fromUser from './../store/user.reducer'
import { User } from '../bs-navbar/User';
import * as userActions  from '../store/user.action';
import * as CryptoJS from 'crypto-js';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
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
  constructor(private router: Router,fb:FormBuilder,private http: Http,private signupService:SignupService,private store:Store<User>) {
    this.loginForm=fb.group({
      username:['',[Validators.minLength(5),Validators.maxLength(15)]
                    
                  ],
      password:['',[Validators.required]]
    })
  }
  
  
  userList=[];
  private pass=true;
  private hide(){
    this.pass=!this.pass;
}
  ngOnInit() {
    this.store.dispatch(new userActions.LoadUsers())
    this.store.pipe(select(fromUser.getUsers)).subscribe(res=>this.userList=res)
  }
  get username(){
    return this.loginForm.get('username');
   } get password(){
    return this.loginForm.get('password');
  }
 private login():boolean{
   var password = "testpassword";
   let result=false;
    for(let userL of this.userList) {
      if(this.loginForm.get('username').value===userL.username ){
        if(this.loginForm.get('password').value===userL.password){
          // let payload={subject:userL.id}
          // jwt.sign(payload,'secretkey');
    this.store.dispatch(new userActions.LoadUser(userL.id))
    sessionStorage.setItem('currentUser',userL.id)
        sessionStorage.setItem('currentuser',CryptoJS.AES.encrypt(JSON.stringify(userL.id), 'secret key 123'));
         result=true;

//localStorage.setItem('ss',(SHA256(userL.id)));
//localStorage.setItem('sa',CryptoJS.AES.encrypt(JSON.stringify(userL.id), 'secret key 123'));
//console.log(ciphertext)
    // var dec=CryptoJS.AES.decrypt(localStorage.getItem('sa').toString(), 'secret key 123');
    // var plaintext = dec.toString(CryptoJS.enc.Utf8);
    // console.log('se',plaintext)
    // sessionStorage.setItem('dec',plaintext)
        
          // try {
          // } catch (e) {
          //   console.log(e);
          // }
        
      
      
          // try {
          //   const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
          //   if (bytes.toString()) {
          //     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          //   }
          //   return data;
          // } catch (e) {
          //   console.log(e);
          // }
        
         //this.router.navigate(['/']);
       // window.location.reload();
        }
      }
    }
    return result;
  }
  // private login1(){
  //   let username=(this.loginForm.get('username').value);let password=this.loginForm.get('password').value;
  //   this.store.dispatch(new productAction.LoginUser({username,password}));
  //   this.store.select('users').subscribe(response=>{
  //     if(response.user===true){
  //        this.router.navigate(['/']);
  //      }
  //     console.log(response)
  //   })
  //  this.store
  // }

}
