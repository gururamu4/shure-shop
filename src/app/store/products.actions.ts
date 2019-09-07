import { Action } from "@ngrx/store";

import { Update } from "@ngrx/entity";

import { product } from "../models/product";

export enum ProductActions {
  LOAD_PRODUCTS = "[Products] Load PRODUCTS",
  LOAD_PRODUCTS_SUCCESS = "[Products] Load PRODUCTS Success",
  LOAD_PRODUCTS_FAIL = "[Products] Load PRODUCTS Fail",
  LOAD_PRODUCT = "[Product] Load PRODUCT",
  LOAD_PRODUCT_SUCCESS = "[Product] Load PRODUCT Success",
  LOAD_PRODUCT_FAIL = "[Product] Load PRODUCT Fail",
  DELETE_PRODUCTS = "[Produtcs] Delete Products",
  DELETE_PRODUCTS_SUCCESS = "[Produtcs]Success Delete Products",
  DELETE_PRODUCTS_FAIL = "[Produtcs]FAIL Delete Products",
  ADD_PRODUCT = "[Product] Add",
  ADD_PRODUCT_SUCCESS = "[Product] Add Success",
  ADD_PRODUCT_FAIL = "[Product] Add Failed",
  UPDATE_PRODUCT = "[Product] update ",
  UPDATE_PRODUCT_SUCCESS = "[Product] update success",
  UPDATE_PRODUCT_FAIL = "[Product] update failed",
}

export class LoadProducts implements Action {
  readonly type = ProductActions.LOAD_PRODUCTS;
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActions.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: product[]) { }
}

export class LoadProductsFail implements Action {
  readonly type = ProductActions.LOAD_PRODUCTS_FAIL;

  constructor(public payload: string) { }
}
export class LoadProduct {
  readonly type = ProductActions.LOAD_PRODUCT;
  constructor(public payload: string) { }
}
export class LoadProductSuccess {
  readonly type = ProductActions.LOAD_PRODUCT_SUCCESS;
  constructor(public payload: product) { }
}
export class LoadProductFail {
  readonly type = ProductActions.LOAD_PRODUCT_FAIL;
  constructor(public payload: string) { }
}
export class AddProduct {
  readonly type = ProductActions.ADD_PRODUCT;
  constructor(public payload: product) { }
}
export class AddProductSuccess {
  readonly type = ProductActions.ADD_PRODUCT_SUCCESS;
  constructor(public payload: product) { }
}
export class AddProductFailure {
  readonly type = ProductActions.ADD_PRODUCT_FAIL;
  constructor(public payload: string) { }
}

export class DeleteProduct implements Action {
  readonly type = ProductActions.DELETE_PRODUCTS;
  constructor(public payload: string) { }
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductActions.DELETE_PRODUCTS_SUCCESS;
  constructor(public payload: string) { }
}

export class DeleteProductFail implements Action {
  readonly type = ProductActions.DELETE_PRODUCTS_FAIL;
  constructor(public payload: string) { }
}

export class UpdateProduct implements Action {
  readonly type = ProductActions.UPDATE_PRODUCT;

  constructor(public payload: product) { }
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActions.UPDATE_PRODUCT_SUCCESS;

  constructor(public payload: Update<product>) { }
}

export class UpdateProductFail implements Action {
  readonly type = ProductActions.UPDATE_PRODUCT_FAIL;

  constructor(public payload: string) { }
}
export type Action =
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail
  | AddProduct
  | AddProductSuccess
  | AddProductFailure
  | LoadProduct
  | LoadProductSuccess
  | LoadProductFail
  | UpdateProduct
  | UpdateProductFail
  | UpdateProductSuccess;;
