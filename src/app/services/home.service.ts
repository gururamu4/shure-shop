import { Injectable, OnInit } from '@angular/core';
import { Store, select } from "@ngrx/store";
import { Observable } from 'rxjs';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as cartActions from "./../store/cart.action"
import * as fromCart from './../store/cart.reducer'

import * as fromProduct from './../store/products.reducer'

import * as fromUser from '../store/user.reducer'
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnInit {

  count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentCount: Observable<number> = this.count.asObservable();

  constructor(private store: Store<any>) {

  }
  ngOnInit() {
  }
  products$; list;
  private counts: number = 0;

  public categoryFilter(category) {
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.products$.subscribe(res => this.list = res);

    let p = this.store.select(fromProduct.getProducts);
    p.subscribe(res => this.list = res)
    this.list = this.list.filter(product => product.category === category)
    return this.list;
  }

  getQuantity(): number {
    let shoppingCart;

    this.carts$ = this.store.pipe(select(fromCart.getCarts));
    this.carts$.subscribe(res => shoppingCart = res)
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || null);
    let q: number = 0;
    if (shoppingCart.length != 0) {
      for (let cartQuantity of shoppingCart) {
        if (currentUser == cartQuantity.userId) {
          q = q + cartQuantity.quantity;
        }
      }
    }
    if (q > 0) {
      return q;
    }
    else {
      return 0;
    }
  }
  carts$;
  getQuantityProduct(pId): number {
    let q: number = 0;
    let shoppingCart;
    this.carts$ = this.store.pipe(select(fromCart.getCarts));
    this.carts$.subscribe(res => shoppingCart = res)
    let currentUser// = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.store.pipe(select(fromUser.getCurrentUserId)).subscribe(res => currentUser = res)
    if (shoppingCart.length != 0) {
      for (let cartQuantity of shoppingCart) {
        if (currentUser == cartQuantity.userId && pId == cartQuantity.pId) {
          q = cartQuantity.quantity;
        }
      }
    }
    return q;
  }

  minus(id): boolean {


    this.count.next(this.counts--);

    let shoppingCart;
    this.carts$ = this.store.pipe(select(fromCart.getCarts));
    this.carts$.subscribe(res => shoppingCart = res)
    let currentUser// = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.store.pipe(select(fromUser.getCurrentUserId)).subscribe(res => currentUser = res)
    var carts = null;
    for (let cart of shoppingCart) {
      if (cart.pId == id && cart.userId == currentUser) {
        cart.quantity = cart.quantity - 1;
        if (cart.quantity == 0) {
          this.store.dispatch(new cartActions.DeleteCart(cart.id))
        }
        this.store.dispatch(new cartActions.UpdateCart(cart))
        return true;
      }

    }
    if (carts != null)
      this.store.dispatch(new cartActions.UpdateCart(carts))

  }




  plus(product: product): boolean {
    this.count.next(this.counts++);
    let shoppingCart;
    this.carts$ = this.store.pipe(select(fromCart.getCarts));
    this.carts$.subscribe(res => shoppingCart = res)
    let currentUser// = JSON.parse(localStorage.getItem('currentUser') || '[]');
    this.store.pipe(select(fromUser.getCurrentUserId)).subscribe(res => currentUser = res)
    var carts = null;
    for (let cart of shoppingCart) {
      if (cart.pId == product.id && cart.userId == currentUser) {
        cart.quantity = cart.quantity + 1;
        this.store.dispatch(new cartActions.UpdateCart(cart))
        return true;
      }
    }

    for (let cart of shoppingCart) {
      if (cart.pId != product.id && cart.userId == currentUser) {
        carts = {
          userId: currentUser,
          pId: product.id,
          quantity: 1,
          imgSrc: product.imgSrc,
          price: product.price
        }
        this.store.dispatch(new cartActions.AddCart(carts))
        return true;

      }
    }

    for (let cart of shoppingCart) {
      if (cart.userId !== currentUser) {
        carts = {
          userId: currentUser,
          pId: product.id,
          quantity: 1,
          imgSrc: product.imgSrc,
          price: product.price
        }

        this.store.dispatch(new cartActions.AddCart(carts))
        return true;

      }
    }
    if (carts != null)
      this.store.dispatch(new cartActions.AddCart(carts))


    if (shoppingCart.length == 0) {
      carts = {

        userId: currentUser,
        pId: product.id,
        quantity: 1,
        imgSrc: product.imgSrc,
        price: product.price
      }
      this.store.dispatch(new cartActions.AddCart(carts))
    }
  }
}
