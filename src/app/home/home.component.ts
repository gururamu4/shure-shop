import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HomeService } from './../services/home.service'

import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { filter } from 'rxjs/operators';

import * as ProductsActions from "./../store/products.actions";
import { fade, adi } from '../animations/animate';
import { trigger, state, style, transition, animate, useAnimation } from '@angular/animations';
import * as _ from 'lodash';
import { BsNavbarComponent } from '../bs-navbar/bs-navbar.component';
import { Product } from '../models/products';
import { Store, select } from '@ngrx/store';
import { product } from "../models/product"
import * as productActions from "./../store/products.actions"
import * as fromProduct from './../store/products.reducer'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as cartActions from "./../store/cart.action"
import * as fromCart from './../store/cart.reducer'
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    fade,   [
      trigger('buttonTextStateTrigger', [
        state('shown', style({
          opacity: 1
        })),
        state('transitioning', style({
          opacity: 0.3
        })),
        transition('shown => transitioning', animate('600ms ease-out')),
        
        transition('transitioning => shown', useAnimation(adi))
      ])
    ]
  ]
})
export class HomeComponent  implements OnInit {
//private counts=0;
   private count:BehaviorSubject<number>=new BehaviorSubject<number>(0);
private currentCount:Observable<number>=this.count.asObservable();
private prices = [
    {value: [0,100], viewValue: '0 to 100'},
    {value: [100,500], viewValue: '100 to 500'},
    {value: [500,1000], viewValue: '500 to 1000'}
  ];
  private categories=['mic','earphone','speaker']
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;
 private productDescription(pId):boolean{
    if(pId!=null){
    this.router.navigate(['products',pId]);
    return true;
  }
  return false;
  }
private categoryFilter(category){ 
  this.list=this.service.categoryFilter(category)
}
 private dateFilter(){
    this.list=_.orderBy(this.list,function(n){
      return n.createdDate;
    },"desc")
  }
  popularityFilter(){
   this.list=_.orderBy(this.list,function(n){
      return n.totalLikes;
    },"desc")
   return this.list
  }
  priceFilter(min,max){ 
    let p=this.store.select(fromProduct.getProducts);
    p.subscribe(res=>this.list=res)
    console.log(this.list)
    this.list=this.list.filter(product=>product.price>min&&product.price<max)
    
      return this.list;
  }
 
  private pList: Observable<any>;

  constructor(private service: HomeService, private store: Store<any>,
    private router:Router,private navBar:BsNavbarComponent,private http:HttpClient
  ) {
  }
 private dataSource;


private displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
private shoppingCart;
private pTry=[];
private list=[];
private search=null;
products$;
carts$;
 ngOnInit() {
  this.navBar.currentSearch.subscribe(value=>{this.search=value});

this.store.dispatch(new cartActions.LoadCarts());
this.carts$ = this.store.pipe(select(fromCart.getCarts));
 this.store.dispatch(new productActions.LoadProducts());
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.products$.subscribe(res=>this.list=res);
    this.products$.subscribe(res=>this.dataSource=new MatTableDataSource(res));
 
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // var dec=CryptoJS.AES.decrypt(localStorage.getItem('sa').toString(), 'secret key 123');
    // var plaintext = dec.toString(CryptoJS.enc.Utf8);
    // var dec=CryptoJS.AES.decrypt(sessionStorage.getItem('sa').toString(), 'secret key 123');
    // console.log('pt',plaintext)
    var dec=CryptoJS.AES.decrypt(sessionStorage.getItem('currentuser').toString(), 'secret key 123');
    var plaintext = dec.toString(CryptoJS.enc.Utf8);
    console.log('plainT',plaintext)
}

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //product
  private minus(productId: string): void {
     this.count.next(this.getQuantity());
    this.service.minus(productId);
  }

   toggled=true;

private toggle():boolean{
this.toggled=!this.toggled;
return this.toggled;
}
onClick1(x){
  console.log(x)
}
  private plus(product: product):void {
    this.count.next(this.getQuantity());
   
    this.service.plus(product)
  }

 

 public getQuantity():number {
    return this.service.getQuantity();
  }
 private getQuantityProduct(pId):number {
    return this.service.getQuantityProduct(pId);
  }

 private onClick(id:string):void { 
    let productList; 
    this.products$.subscribe(res=>{productList=res})
    for(let product of this.list){
        if(id===product.id ){
          
          if(!product.isLiked){
            product.isLiked=true;
            product.totalLikes++;
            //this.store.dispatch(new ProductsActions.UpdateProduct(product));
            break;
            }
            else{
              product.isLiked=false;
              product.totalLikes--; //this.store.dispatch(new ProductsActions.UpdateProduct(product));
              break;
            }
        }
    }
  }
}