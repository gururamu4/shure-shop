import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { select, Store } from "@ngrx/store";
import { cart } from '../models/cart';
import * as fromCart from '../store/cart.reducer'

import * as fromUser from '../store/user.reducer'
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart1;
  displayedColumns: string[] = ['pId', 'quantity', 'price', 'price*quantity'];
  private cart: any;
  private currentUser;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<cart>) {

  };
  sc1;
  ngOnInit() {
    this.store.pipe(select(fromUser.getCurrentUserId)).subscribe(res => this.currentUser = res)
    this.store.pipe(select(fromCart.getCarts)).subscribe(res => (this.cart) = (res.filter(product => product.userId == this.currentUser)));
    this.cart1 = new MatTableDataSource(this.cart)
    this.cart1.paginator = this.paginator;
    this.cart1.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.cart.filter = filterValue.trim().toLowerCase();
  }
}
