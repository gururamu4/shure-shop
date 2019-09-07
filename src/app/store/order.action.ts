
import { Action } from "@ngrx/store";

export enum OrderAction {
  LOAD_ORDERS = "[ORDERS] Load ORDERS",
  LOAD_ORDERS_SUCCESS = "[ORDERS] Load ORDERS Success",
  LOAD_ORDERS_FAIL = "[ORDERS] Load ORDERS Fail",
  UPDATE_ORDER = "[ORDER] update ",
  UPDATE_ORDER_SUCCESS = "[ORDER] update success",
  UPDATE_ORDER_FAIL = "[ORDER] update failed",
  ADD_ORDER = "[ORDER] Add ",
  ADD_ORDER_SUCCESS = "[ORDER] Add success",
  ADD_ORDER_FAIL = "[ORDER] Add failed",
  DELETE_ORDER = "[ORDER] Delete ORDER",
  DELETE_ORDER_SUCCESS = "[ORDER]Success Delete ORDER",
  DELETE_ORDER_FAIL = "[ORDER]FAIL Delete ORDER",

}

export class LoadOrders implements Action {
  readonly type = OrderAction.LOAD_ORDERS;
}

export class LoadOrdersSuccess implements Action {
  readonly type = OrderAction.LOAD_ORDERS_SUCCESS;

  constructor(public payload) { }
}

export class LoadOrdersFail implements Action {
  readonly type = OrderAction.LOAD_ORDERS_FAIL;

  constructor(public payload: string) { }
}
export class UpdateOrder implements Action {
  readonly type = OrderAction.UPDATE_ORDER;

  constructor(public payload) { }
}

export class UpdateOrderSuccess implements Action {
  readonly type = OrderAction.UPDATE_ORDER_SUCCESS;

  constructor(public payload) { }
}

export class UpdateOrderFail implements Action {
  readonly type = OrderAction.UPDATE_ORDER_FAIL;

  constructor(public payload: string) { }
}
export class AddOrder {
  readonly type = OrderAction.ADD_ORDER;
  constructor(public payload) { }
}
export class AddOrderSuccess {
  readonly type = OrderAction.ADD_ORDER_SUCCESS;
  constructor(public payload) { }
}
export class AddOrderFail {
  readonly type = OrderAction.ADD_ORDER_FAIL;
  constructor(public payload: string) { }
}
export class DeleteOrder implements Action {
  readonly type = OrderAction.DELETE_ORDER;
  constructor(public payload: string) { }
}

export class DeleteOrderSuccess implements Action {
  readonly type = OrderAction.DELETE_ORDER_SUCCESS;
  constructor(public payload: string) { }
}

export class DeleteOrderFail implements Action {
  readonly type = OrderAction.DELETE_ORDER_FAIL;
  constructor(public payload: string) { }
}
export type Action =
  LoadOrders
  | LoadOrdersFail
  | LoadOrdersSuccess
  | UpdateOrder
  | UpdateOrderFail
  | UpdateOrderSuccess
  | AddOrder
  | AddOrderFail
  | AddOrderSuccess
  | DeleteOrder
  | DeleteOrderFail
  | DeleteOrderSuccess;
