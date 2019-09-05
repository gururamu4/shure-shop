import { HomeService } from "./../../services/home.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/products";
import { product } from "src/app/models/product";
import { Store, select } from "@ngrx/store";
import * as productActions from "src/app/store/products.actions";
import * as fromProduct from "src/app/store/products.reducer";

@Component({
  selector: "products-show",
  templateUrl: "./products-show.component.html",
  styleUrls: ["./products-show.component.css"]
})
export class ProductsShowComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private homeService: HomeService,
    private store:Store<product>
  ) {}
  product: any = {};
  productList: product[];
  endProduct: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.product = params;
    });
    this.store.dispatch(new productActions.LoadProduct(this.product.id));
   let products$ = this.store.pipe(select(fromProduct.getProducts));
    products$.subscribe(res=>this.productList=res);
    //console.log(this.productList);
    for (let prod of this.productList) {
      if (prod.id === this.product.id) {
        this.endProduct = prod;
      }
    }
    console.log(this.endProduct);
  }

  plus(pId): void {
    this.homeService.plus(pId);
  }
  minus(productId: string): void {
    this.homeService.minus(productId);
  }
  getQuantity(): number {
    return this.homeService.getQuantity();
  }
  getQuantityProduct(pId): number {
    return this.homeService.getQuantityProduct(pId);
  }
}
