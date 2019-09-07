import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade1 } from 'src/app/animations/animate';

import * as cartActions from '../../store/cart.action';
import * as fromCart from "../../store/cart.reducer";
import * as orderAction from '../../store/order.action';
import * as fromOrder from "../../store/order.reducer";
import { Store, select } from "@ngrx/store";
import { cart } from 'src/app/models/cart';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  animations: [fade1]
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router, private store: Store<cart>) { }

  ngOnInit() {
  }
  clicked = false;
  placeOrder(): boolean {
    let cart;
    this.store.pipe(select(fromCart.getCarts)).subscribe(res => cart = res);
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || null);
    for (let product of cart) {
      if (product.userId == currentUser) {
        product.date = new Date();
        product.delieveryDate = new Date(new Date().getTime() + (4 * (1000 * 60 * 60 * 24)));
        this.store.dispatch(new orderAction.AddOrder(product))
        this.store.dispatch(new cartActions.DeleteCart(product.id))
      }
    }
    setTimeout(() => {
      this.router.navigate(['my/orders'])
    }, 2000)
    return this.clicked;
  }
}
