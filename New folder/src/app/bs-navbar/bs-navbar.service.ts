import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class NavBarService {
  users = new Subject();
  hello = localStorage.getItem("currentUser");
  set user(hello) {
    this.users.next(hello);
    localStorage.setItem("theItem", hello);
  }

  get user() {
    return localStorage.getItem("theItem");
  }
}
