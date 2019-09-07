import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from "@angular/material";
import { Router } from "@angular/router";

import { Store, select } from '@ngrx/store';
import * as fromOrders from '../../store/order.reducer'
import * as fromUsers from '../../store/user.reducer'
import { cart } from "src/app/models/cart";


@Component({
  selector: "my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  // use access specifiers
  displayedColumns: string[] = [
    "pId",
    "quantity",
    "price",
    "totalPrice",
    "delieveryDate",
    "date",
    "status",
    "editorials"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private cart = [];
  cart1;
  private currentDate;
  constructor(private route: Router, private store: Store<cart>) {
  }

  ngOnInit() {
    let currentUser //=JSON.parse(localStorage.getItem('currentUser')||null);
    this.store.pipe(select(fromUsers.getCurrentUserId)).subscribe(res => currentUser = res)
    this.store.pipe(select(fromOrders.getOrders)).subscribe(res => this.cart1 = new MatTableDataSource(res.filter(product => product.userId == currentUser)))
    this.cart1.paginator = this.paginator;

    this.cart1.sort = this.sort;
    this.currentDate = new Date().toJSON();
  }

  getDelieveryStatus(date) {
    return this.currentDate > date ? "Delieverd" : "InProgress"
  }
  private cancelOrder(id, date): void {
    this.route.navigate(["/my/orders", id, date]);
  }
}
