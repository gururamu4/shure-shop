import { productEffect } from './../../../store/products.effects';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/products';


import { FormControl,FormGroup,FormBuilder,Validators, AbstractControl } from "@angular/forms";
import * as productActions from "../../../store/products.actions"
import { Store, select } from "@ngrx/store";
import *  as ProductAction from "../../../store/products.actions";
import {AppState} from '../../../store/app.state';
import { Observable } from 'rxjs';
import { product } from 'src/app/models/product';

import * as fromProduct from '../../../store/products.reducer'

@Component({
  selector: 'selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit {
  // give Proper names
  // add types for arguments and functions
 routeId:any;
 index:number;
 id:string;
 newProduct;
 product;
selectedProductForm;
 currentProduct=null;
  constructor(private route: ActivatedRoute,private fb:FormBuilder,private router:Router,private store:Store<AppState>) { 
    this.selectedProductForm=fb.group({
     name:['',Validators.required],
     id:['',Validators.required],
      price:['',Validators.required],
      imgSrc:['',Validators.required],
    })
  }

  ngOnInit() {
    this.route.params.subscribe( params => (this.routeId=params));
    this.id=this.routeId.id;   
    const p:Observable<product>=this.store.pipe(select(fromProduct.getCurrentProduct));
    //p.subscribe(res=>this.product=res)
    p.subscribe(currentProduct => {
      if (currentProduct) {
        this.selectedProductForm.patchValue({
          name: currentProduct.productName,
          id: currentProduct.id,
          price: currentProduct.price,
          imgSrc: currentProduct.imgSrc
        });
      }
    })
  }
 change():void{
   let cp;
  this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(res=>cp=res);
  
    this.store.dispatch(new ProductAction.UpdateProduct({
      id:this.selectedProductForm.get('id').value,
      productId: this.selectedProductForm.get('id').value,
      productName: this.selectedProductForm.get('name').value,
      price:this.selectedProductForm.get('price').value,
      imgSrc: this.selectedProductForm.get('imgSrc').value,
      isLiked: cp.isLiked,
      totalLikes: cp.totalLikes,
      category: cp.category,
      createdDate:new Date()
    }
      ));
  //localStorage.setItem('productList',JSON.stringify(this.productList));
    this.router.navigate(['/']);
}
}
