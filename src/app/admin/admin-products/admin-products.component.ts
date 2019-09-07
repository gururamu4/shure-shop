import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Store, select } from '@ngrx/store';
import * as productActions from "../../store/products.actions"
import * as fromProduct from '../../store/products.reducer'


@Component({
  selector: "admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit {
  constructor(private router: Router, private store: Store<any>, private snackBar: MatSnackBar) { }
  productList;
  products$; dataSource
  ngOnInit() {
    this.store.dispatch(new productActions.LoadProducts());
    this.productList = this.store.pipe(select(fromProduct.getProducts));
    this.dataSource = this.productList;
  }
  displayedColumns: string[] = ["id", "name", "price", "editorials"];

  private edit(productId): void {
    this.store.dispatch(new productActions.LoadProduct(productId));
    this.router.navigate(['admin/products', productId])
  }
  addP(): void {
    this.router.navigate(["admin/products/new"]);
  }
  private delete(productId): void {
    this.store.dispatch(new productActions.DeleteProduct(productId))
  }
}
