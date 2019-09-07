import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, map } from 'rxjs/operators'
@Injectable()
export class SignupService {
  private url = "http://localhost:3004/userList"
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(this.url).pipe(
      map(users => {
        const newUsers = [];
        for (let user of users) {
          const username = user.username;
          newUsers.push({ username: username })
        }
        return newUsers;
      }),
      tap(users => console.log(users))
    )
  }
  getUserByUsername(username: string) {

    return this.http.get<any[]>(this.url, {
      params: new HttpParams().set('username', username)
    })
  }
  getUserByPassword(password: string) {

    return this.http.get<any[]>(this.url, {
      params: new HttpParams().set('password', password)
    })
  }
  loginUser(user) {
    let result = false;
    return this.http.get<any[]>(this.url).pipe(
      map(users => {
        for (let user1 of users) {
          if (user1.username == user.username && user1.password == user.password) {
            result = true;
            return result;
          }
        }
        return result;
      }),
    )
  }
}