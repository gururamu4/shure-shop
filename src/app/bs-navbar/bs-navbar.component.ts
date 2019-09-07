import { HomeService } from "./../services/home.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";

import { Store, select } from '@ngrx/store';
import * as fromUser from './../store/user.reducer'
import { User } from '../models/user';
import * as userActions from '../store/user.action';

@Component({
  selector: "navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  private message: number;
  private currentUser: User;

  private search = new BehaviorSubject<string>('');
  public currentSearch = this.search.asObservable();//accessible from home component
  constructor(
    private router: Router,
    private homeService: HomeService,
    private store: Store<User>
  ) { }
  private searchTerm(searchTerm): Observable<string> {
    this.search.next(searchTerm);
    if (searchTerm != null && searchTerm != '') {
      this.router.navigate(['home']);
    }
    return this.currentSearch;
  }
  isSearchExpand = false;
  private searchExpand(): boolean {
    this.isSearchExpand = !this.isSearchExpand;
    return this.isSearchExpand;
  }
  userList;
  currentUserStore$: Observable<User>; currentUserStoreimg;
  ngOnInit() {
    this.currentUserStore$ = this.store.pipe(select(fromUser.getUser))
    this.getq();
    this.homeService.currentCount.subscribe(
      message => (this.message = message)
    );
  }
  otherTheme: boolean = false;
  changeTheme(): boolean {
    this.otherTheme = !this.otherTheme;
    localStorage.setItem("otherTheme", JSON.stringify(this.otherTheme));
    return this.otherTheme;
  }
  getq(): number {
    return this.homeService.getQuantity();
  }

  logout(): void {
    localStorage.removeItem('currentUser')
    this.store.dispatch(new userActions.LoadUserSuccess(null))
    this.currentUserStore$ = this.store.pipe(select(fromUser.getUser))
    this.router.navigate(["/"]);
  }
}
