import { Injectable } from "@angular/core";
import { Store,select } from '@ngrx/store';
 import * as fromUser from './../store/user.reducer'
import { User } from '../bs-navbar/User';
import * as userActions  from '../store/user.action';

@Injectable()

export class AdminAuthService{
currentUser=null;login
constructor(private store:Store<User>){
    this.store.pipe(select(fromUser.getUser)).subscribe(res=>this.currentUser=res); 
}
    
}