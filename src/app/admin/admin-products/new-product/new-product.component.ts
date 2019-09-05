import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import * as ProductsActions from "./../../../store/products.actions";
import { Observable } from "rxjs";
import { AppState } from "../../../store/app.state";
import { Product } from "../../../models/products";

@Component({
  selector: "new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.css"]
})
export class NewProductComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}
  ngOnInit() {}
  currentProduct: Observable<Product[]>;
  newProduct: Product;
  // productList:Product[]=JSON.parse(localStorage.getItem('productList')||'[]');
  add(addProduct: Product): void {
    this.newProduct = {
      productId: addProduct.productId,
      productName: addProduct.productName,
      price: addProduct.price,
      imgSrc: addProduct.imgSrc,
      isLiked: false,
      totalLikes: 100,
      category: addProduct.category,
      createdDate:new Date()
    };
    let productList: Product[] = JSON.parse(
      localStorage.getItem("productList") || "[]"
    );
    this.store.dispatch(
      new ProductsActions.AddProduct({
        id:addProduct.productId,
        productId: addProduct.productId,
        productName: addProduct.productName,
        price: addProduct.price,
        imgSrc: addProduct.imgSrc,
        isLiked: false,
        totalLikes: 100,
        category: addProduct.category,
        createdDate:new Date()
      })
    );
    this.currentProduct = this.store.select("products");
    //  this.productList.push(this.newProduct);
    //  localStorage.setItem('productList',JSON.stringify(this.productList));

    this.router.navigate(["/"]);
  }
}
