import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of, observable } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { cartService } from "../services/cart.services";
import * as cartAction from "../store/cart.action";
import { cart } from "../models/cart";

@Injectable()
export class cartEffect {
  constructor(
    private actions$: Actions,
    private cartService: cartService
  ) {}

  @Effect()
  loadCarts$: Observable<Action> = this.actions$.pipe(
    ofType<cartAction.LoadCarts>(
        cartAction.CartActions.LOAD_CARTS
    ),
    mergeMap((action: cartAction.LoadCarts) =>
      this.cartService.getCarts().pipe(
        map(
          (carts: cart[]) =>
            new cartAction.LoadCartsSuccess(carts)
        ),
        catchError(err => of(new cartAction.LoadCartsFail(err)))
      )
    )
  );

  @Effect()
  deleteCart$=this.actions$.pipe(
    ofType<cartAction.DeleteCart>(
      cartAction.CartActions.DELETE_CART
    ),
    map((action:cartAction.DeleteCart)=>action.payload),
    mergeMap((id:string)=>
    this.cartService.deleteCart(id).pipe(
      map(()=>new cartAction.DeleteCartSuccess(id)),
      catchError(err=>of(new cartAction.DeleteCartFail(err)))
    )
    )
  );

//   @Effect()
//   loadCustomer$: Observable<Action> = this.actions$.pipe(
//     ofType<cartAction.LoadProduct>(
//       productActions.ProductActions.LOAD_PRODUCT
//     ),
//     mergeMap((action: productActions.LoadProduct) =>
//       this.cartService.getCustomerById(action.payload).pipe(
//         map(
//           (product: product) =>
//             new productActions.LoadProductSuccess(product)
//         ),
//         catchError(err => of(new productActions.LoadProductFail(err)))
//       )
//     )
//   );
  // @Effect()
  // addProdct$:Observable<Action>=this.actions$.pipe(
  //   ofType<cartAction.AddProduct>(productActions.ProductActions.ADD_PRODUCT),
  //   map((action:productActions.AddProduct)=>action.payload),
  //   mergeMap((Product:product)=>
  //     this.cartService.createProduct(Product).pipe(
  //       map((newProduct:product)=>
  //         new productActions.AddProductSuccess(newProduct)
  //       ),
  //       catchError(err => of(new productActions.LoadProductFail(err)))
  //     )
  //   )
  // );

  @Effect()
  addcart$:Observable<Action>=this.actions$.pipe(
    ofType<cartAction.AddCart>(cartAction.CartActions.ADD_CART),
    map((action:cartAction.AddCart)=>action.payload),
    mergeMap((cart:cart)=>this.cartService.createCart(cart)),
    map((newcart:cart)=>
    new cartAction.AddCartSuccess(newcart)
    )
  )
  @Effect()
  updateCart$: Observable<Action> = this.actions$.pipe(
    ofType<cartAction.UpdateCart>(
      cartAction.CartActions.UPDATE_CART
    ),
    map((action: cartAction.UpdateCart) => action.payload),
    mergeMap((cart: cart) =>
      this.cartService.updateCart(cart).pipe(
        map(
          (updateCart: cart) =>
            new cartAction.UpdateCartSuccess({
              id: updateCart.id,
              changes: updateCart
            })
        ),
        catchError(err => of(new cartAction.UpdateCartFail(err)))
      )
    )
  );
}
