import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HomeService } from '../services/home.service';
import { HomeComponent } from '../home/home.component';
import { BsNavbarComponent } from '../bs-navbar/bs-navbar.component';
import {  fade1 } from '../animations/animate';
import { Router } from '@angular/router';
import {Store,select} from "@ngrx/store";
import * as fromCart from "../store/cart.reducer";
import * as cartActions from '../store/cart.action';
import { cart } from '../models/cart';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  animations:[fade1]
})
export class CheckOutComponent implements OnInit {

  constructor( private router:Router, private _formBuilder:FormBuilder,private service:HomeService,private store:Store<cart> ) { }
private firstFormGroup: FormGroup;
private secondFormGroup: FormGroup;
private totalQuantity:number;
private delieveryCharges:number=99;

private  cart

currentUser=JSON.parse(localStorage.getItem('currentUser')||null)
  private get totalPrice():number{
    let price=0;
    for(let item of this.cart){
      if(item.userId==this.currentUser){
      price=price+(item.quantity*item.price);
    }
  }
    return price;
  }
  ngOnInit() {
    this.store.pipe(select(fromCart.getCarts)).subscribe(res=>this.cart=res)
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      phone:['',Validators.required],
      city:['',Validators.required],
      pincode:['',Validators.required],
      landmark:[''],
      star:['']
    });
    this.totalQuantity=this.service.getQuantity()
  }
  clicked=false;
  placeOrder():boolean{
    this.clicked=true;
    setTimeout(()=>{
      this.router.navigate(['payment'])
    },2000)
    return this.clicked;
  }

}
