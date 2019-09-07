import { Component, OnInit } from '@angular/core';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as userAction from './store/user.action';
import * as productActions from "./store/products.actions";
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
    this.store.dispatch(new productActions.LoadProducts());

  }

  get otherTheme() {
    return of(JSON.parse(localStorage.getItem('otherTheme')));
  }

}

