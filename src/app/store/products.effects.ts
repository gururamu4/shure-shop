import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of, observable } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { Productservice } from "../services/product.service";
import * as productActions from "../store/products.actions";
import { product } from "../../app/models/product";

@Injectable()
export class productEffect {
  constructor(
    private actions$: Actions,
    private productService: Productservice
  ) {}

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadProducts>(
      productActions.ProductActions.LOAD_PRODUCTS
    ),
    mergeMap((action: productActions.LoadProducts) =>
      this.productService.getProducts().pipe(
        map(
          (products: product[]) =>
            new productActions.LoadProductsSuccess(products)
        ),
        catchError(err => of(new productActions.LoadProductsFail(err)))
      )
    )
  );

  @Effect()
  deleteProduct$=this.actions$.pipe(
    ofType<productActions.DeleteProduct>(
      productActions.ProductActions.DELETE_PRODUCTS
    ),
    map((action:productActions.DeleteProduct)=>action.payload),
    mergeMap((id:string)=>
    this.productService.deleteCustomer(id).pipe(
      map(()=>new productActions.DeleteProductSuccess(id)),
      catchError(err=>of(new productActions.DeleteProductFail(err)))
    )
    )
  );

  @Effect()
  loadCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.LoadProduct>(
      productActions.ProductActions.LOAD_PRODUCT
    ),
    mergeMap((action: productActions.LoadProduct) =>
      this.productService.getCustomerById(action.payload).pipe(
        map(
          (product: product) =>
            new productActions.LoadProductSuccess(product)
        ),
        catchError(err => of(new productActions.LoadProductFail(err)))
      )
    )
  );
  // @Effect()
  // addProdct$:Observable<Action>=this.actions$.pipe(
  //   ofType<productActions.AddProduct>(productActions.ProductActions.ADD_PRODUCT),
  //   map((action:productActions.AddProduct)=>action.payload),
  //   mergeMap((Product:product)=>
  //     this.productService.createProduct(Product).pipe(
  //       map((newProduct:product)=>
  //         new productActions.AddProductSuccess(newProduct)
  //       ),
  //       catchError(err => of(new productActions.LoadProductFail(err)))
  //     )
  //   )
  // );

  @Effect()
  addProduct$:Observable<Action>=this.actions$.pipe(
    ofType<productActions.AddProduct>(productActions.ProductActions.ADD_PRODUCT),
    map((action:productActions.AddProduct)=>action.payload),
    mergeMap((product:product)=>this.productService.createProduct(product)),
    map((newProduct:product)=>
    new productActions.AddProductSuccess(newProduct)
    )
  )
  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType<productActions.UpdateProduct>(
      productActions.ProductActions.UPDATE_PRODUCT
    ),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: product) =>
      this.productService.updateCustomer(product).pipe(
        map(
          (updateCustomer: product) =>
            new productActions.UpdateProductSuccess({
              id: updateCustomer.id,
              changes: updateCustomer
            })
        ),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );
}
