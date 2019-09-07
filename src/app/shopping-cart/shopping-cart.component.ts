// import { Component, OnInit } from '@angular/core';
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
    console.log(this.cart1)
  }

  applyFilter(filterValue: string) {
    this.cart.filter = filterValue.trim().toLowerCase();

  }
}

















// toDos=[];
// lastUpdated=null;
// constructor(private ngRedux:NgRedux<IAppState>){
// this.ngRedux.subscribe(()=>{
//   var state=ngRedux.getState();
//   this.toDos=state.toDos
//   this.lastUpdated=state.lastUpdated
// })
// }
//  shoppingCart=JSON.parse(localStorage.getItem('shoppingCart'));

//   ngOnInit() {

//   }
//   add(title){
//     if(!title.value) return;
//     this.ngRedux.dispatch({type:'addTo',title:title.value})
//     title.value='';
//   }
//   remove(title){
//     this.ngRedux.dispatch({type:'deleteTo',id:title.id})
//   }
// totalVotes:number=20;
// myVote:number=1;

//   Up(){
//     this.totalVotes++;
//   }
//   Down(){
//     this.totalVotes--;
//   }




