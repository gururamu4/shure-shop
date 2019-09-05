import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  Sort
} from "@angular/material";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { User } from "src/app/bs-navbar/User";

import {Store,select} from '@ngrx/store';
import * as orderAction from '../../store/order.action'
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
 private  displayedColumns: string[] = [
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
 private cart=[];
private cart1;
private currentDate;
  constructor(private route: Router,private store:Store<cart>) {
  }

  ngOnInit() {
     let currentUser //=JSON.parse(sessionStorage.getItem('currentUser')||null);
    this.store.pipe(select(fromUsers.getCurrentUserId)).subscribe(res=>currentUser=res)
    this.store.pipe(select(fromOrders.getOrders)).subscribe(res=>this.cart1=new MatTableDataSource(res.filter(product=>product.userId==currentUser)))
   // this.cart1=new MatTableDataSource(this.cart)
    this.cart1.paginator = this.paginator;
   
    this.cart1.sort = this.sort;
    // for(let order of sc1){
    //   if(order.userId==currentUser){
    //     this.cart.push(order)    
    //    }
    // }
    this.currentDate = new Date();
  }
  // applyFilter(filterValue: string) {
  //   this.cart.filter = filterValue.trim().toLowerCase();

  //   if (this.cart.paginator) {
  //     this.cart.paginator.firstPage();
  //   }
  // }

 private cancelOrder(id, date):void {
    this.route.navigate(["/my/orders", id, date]);
  }
}
