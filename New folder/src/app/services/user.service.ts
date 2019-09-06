import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { User } from "../../app/models/user";

@Injectable({
  providedIn: "root"
})
export class userService {
  private usersUrl = "https://json-be-shure-shop.herokuapp.com/userList";
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  deleteUser(id){
    return this.http.delete(`${this.usersUrl}/${id}`)
  }
  getUserById(id){
    console.log(this.http.get(`${this.usersUrl}/${id}`));
   return this.http.get(`${this.usersUrl}/${id}`);
    //console.log()
  }
  createUser(user){
    return this.http.post(this.usersUrl,user);
     //console.log()
   }
  
}
