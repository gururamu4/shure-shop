
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";


import * as _ from "lodash";
import {Store,select} from '@ngrx/store';
import * as orderAction from '../../store/order.action'
import * as fromOrders from '../../store/order.reducer'
import * as userAction from '../../store/user.action'
import * as fromUser from '../../store/user.reducer'
import { cart } from "src/app/models/cart";

import "rxjs/add/operator/toPromise";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { order } from "src/app/models/order";
@Component({
  selector: "orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.css"]
})
export class AdminOrdersComponent implements OnInit {
  // use access specifiers
 displayedColumns: string[] = [
    "userId",
    "pId",
    "quantity",
    "price",
    "delieveryDate",
    "date",
    "status",
    "editorials"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 private cart;
   cart1;
  private currentDate;
  constructor(private route: Router,private store:Store<order>) {}

  ngOnInit() {
    //this.store.dispatch(new orderAction.LoadOrders())
    this.store.pipe(select(fromOrders.getOrders)).subscribe(res=>this.cart1=new MatTableDataSource(res));
    //this.cart1=new MatTableDataSource(this.cart)
    this.cart1.paginator = this.paginator;
    this.cart1.sort = this.sort;
    this.currentDate = new Date();
    
  }
  
  applyFilter(filterValue: string) {
    this.cart.filter = filterValue.trim().toLowerCase();

  }
  private cancelOrder(id, date):void {
    if(id &&date){
    this.route.navigate(["/my/orders", id, date]);
  }
  }
}
