
import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";

export enum CartActions {
  LOAD_CARTS = "[CARTS] Load CARTS",
  LOAD_CARTS_SUCCESS = "[CARTS] Load CARTS Success",
  LOAD_CARTS_FAIL = "[CARTS] Load CARTS Fail",
  UPDATE_CART="[Cart] update ",
  UPDATE_CART_SUCCESS="[Cart] update success",
  UPDATE_CART_FAIL="[Cart] update failed",
  ADD_CART="[Cart] Add ",
  ADD_CART_SUCCESS="[Cart] Add success",
  ADD_CART_FAIL="[Cart] Add failed",
   DELETE_CART="[Carts] Delete Carts",
  DELETE_CART_SUCCESS="[Carts]Success Delete Carts",
  DELETE_CART_FAIL="[Carts]FAIL Delete Carts",
  
}

export class LoadCarts implements Action {
  readonly type = CartActions.LOAD_CARTS;
}
  
  export class LoadCartsSuccess implements Action {
    readonly type = CartActions.LOAD_CARTS_SUCCESS;
  
    constructor(public payload) {}
  }
  
  export class LoadCartsFail implements Action {
    readonly type = CartActions.LOAD_CARTS_FAIL;
  
    constructor(public payload: string) {}
  }
  export class UpdateCart implements Action {
    readonly type = CartActions.UPDATE_CART;
  
    constructor(public payload) {}
  }
  
  export class UpdateCartSuccess implements Action {
    readonly type = CartActions.UPDATE_CART_SUCCESS;
  
    constructor(public payload) {}
  }
  
  export class UpdateCartFail implements Action {
    readonly type = CartActions.UPDATE_CART_FAIL;
  
    constructor(public payload: string) {}
  }
  export class AddCart{
    readonly type=CartActions.ADD_CART;
    constructor(public payload){}
  }
  export class AddCartSuccess{
    readonly type=CartActions.ADD_CART_SUCCESS;
    constructor(public payload){}
  }
  export class AddCartFail{
    readonly type=CartActions.ADD_CART_FAIL;
    constructor(public payload:string){}
  }
  export class DeleteCart implements Action{
    readonly type=CartActions.DELETE_CART;
    constructor(public payload:string){}
  }
  
  export class DeleteCartSuccess implements Action{
    readonly type=CartActions.DELETE_CART_SUCCESS;
    constructor(public payload:string){}
  }
  
  export class DeleteCartFail implements Action{
    readonly type=CartActions.DELETE_CART_FAIL;
    constructor(public payload:string){}
  }
  export type Action =
    | LoadCarts
    | LoadCartsSuccess
    | LoadCartsFail
    |UpdateCart
    |UpdateCartFail
    |UpdateCartSuccess
    |AddCart
    |AddCartFail
    |AddCartSuccess
    |DeleteCart
    |DeleteCartFail
    |DeleteCartSuccess;
  