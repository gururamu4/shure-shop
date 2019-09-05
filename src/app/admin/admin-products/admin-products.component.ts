import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/products";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Http } from "@angular/http";
import { Store, select } from '@ngrx/store';
import { product } from "../../models/product";
import * as productActions from "../../store/products.actions"
import * as fromProduct from '../../store/products.reducer'
import { Observable } from 'rxjs';


@Component({
  selector: "admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit {
  constructor(private router: Router, private store: Store<any>,private snackBar:MatSnackBar) {}
  private productList;
  products$;private dataSource
  ngOnInit() {
    this.store.dispatch(new productActions.LoadProducts());
    this.productList= this.store.pipe(select(fromProduct.getProducts));
    this.productList.subscribe(res=>{
      console.log(res)
    })
     this.dataSource= this.productList;
  }
  private displayedColumns: string[] = ["id", "name", "price", "editorials"];

  private edit(productId): void {
   
    this.store.dispatch(new productActions.LoadProduct(productId));
    this.router.navigate(['admin/products',productId])
  }
  private addP(): void {
    this.router.navigate(["admin/products/new"]);
  }
  private delete(productId): void {
    
    this.store.dispatch(new productActions.DeleteProduct(productId))
  }
}
