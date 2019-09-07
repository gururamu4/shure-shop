import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as userAction from './store/user.action';
import * as orderAction from './store/order.action';
import * as cartActions from './store/cart.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [BsNavbarComponent]
})
export class AppComponent implements OnInit {
  constructor(private service: BsNavbarComponent, private store: Store<any>) {

  }
  ngOnInit() {
    let currentUser = null;
    currentUser = JSON.parse(localStorage.getItem('currentUser') || null);
    if (currentUser != null) {
      this.store.dispatch(new userAction.LoadUser(currentUser));

    }
    this.store.dispatch(new orderAction.LoadOrders())
    this.store.dispatch(new cartActions.LoadCarts());

  }

  get otherTheme() {
    return of(JSON.parse(localStorage.getItem('otherTheme')));
  }

}

