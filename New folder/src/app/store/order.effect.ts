import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of, observable } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import * as orderAction from "../store/order.action";
import { order } from "../models/order";
import { orderService } from "../services/order.service";

@Injectable()
export class orderEffect {
  constructor(
    private actions$: Actions,
    private orderService: orderService
  ) {}

  @Effect()
  loadOrders$: Observable<Action> = this.actions$.pipe(
    ofType<orderAction.LoadOrders>(
        orderAction.OrderAction.LOAD_ORDERS
    ),
    mergeMap((action: orderAction.LoadOrders) =>
      this.orderService.getOrders().pipe(
        map(
          (orders: order[]) =>
            new orderAction.LoadOrdersSuccess(orders)
        ),
        catchError(err => of(new orderAction.LoadOrdersFail(err)))
      )
    )
  );

  @Effect()
  deleteOrder$=this.actions$.pipe(
    ofType<orderAction.DeleteOrder>(
      orderAction.OrderAction.DELETE_ORDER
    ),
    map((action:orderAction.DeleteOrder)=>action.payload),
    mergeMap((id:string)=>
    this.orderService.deleteOrder(id).pipe(
      map(()=>new orderAction.DeleteOrderSuccess(id)),
      catchError(err=>of(new orderAction.DeleteOrderFail(err)))
    )
    )
  );

//   @Effect()
//   loadCustomer$: Observable<Action> = this.actions$.pipe(
//     ofType<orderAction.LoadProduct>(
//       productActions.ProductActions.LOAD_PRODUCT
//     ),
//     mergeMap((action: productActions.LoadProduct) =>
//       this.orderService.getCustomerById(action.payload).pipe(
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
  //   ofType<orderAction.AddProduct>(productActions.ProductActions.ADD_PRODUCT),
  //   map((action:productActions.AddProduct)=>action.payload),
  //   mergeMap((Product:product)=>
  //     this.orderService.createProduct(Product).pipe(
  //       map((newProduct:product)=>
  //         new productActions.AddProductSuccess(newProduct)
  //       ),
  //       catchError(err => of(new productActions.LoadProductFail(err)))
  //     )
  //   )
  // );

  @Effect()
  addOrder$:Observable<Action>=this.actions$.pipe(
    ofType<orderAction.AddOrder>(orderAction.OrderAction.ADD_ORDER),
    map((action:orderAction.AddOrder)=>action.payload),
    mergeMap((order:order)=>this.orderService.createOrder(order)),
    map((neworder:order)=>
    new orderAction.AddOrderSuccess(neworder)
    )
  )
  @Effect()
  updateOrder$: Observable<Action> = this.actions$.pipe(
    ofType<orderAction.UpdateOrder>(
      orderAction.OrderAction.UPDATE_ORDER
    ),
    map((action: orderAction.UpdateOrder) => action.payload),
    mergeMap((order: order) =>
      this.orderService.updateOrder(order).pipe(
        map(
          (UpdateOrder: order) =>
            new orderAction.UpdateOrderSuccess({
              id: UpdateOrder.id,
              changes: UpdateOrder
            })
        ),
        catchError(err => of(new orderAction.UpdateOrderFail(err)))
      )
    )
  );
}
