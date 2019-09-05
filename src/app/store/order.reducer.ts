import * as orderAction from "./order.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromRoot from "./product.state";
import { order } from "../models/order";

export interface OrderState extends EntityState<order> {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  orders: OrderState;
}

export const orderAdapter: EntityAdapter<order> = createEntityAdapter<
  order
>();

export const defaulatCart: OrderState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = orderAdapter.getInitialState(defaulatCart);

export function orderReducer(
  state = initialState,
  action: orderAction.Action
): OrderState {
  switch (action.type) {
    case orderAction.OrderAction.LOAD_ORDERS_SUCCESS: {
      //console.log(action.payload)
      return orderAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case orderAction.OrderAction.LOAD_ORDERS_FAIL :{
             return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

   case orderAction.OrderAction.ADD_ORDER_SUCCESS:{
     return orderAdapter.addOne(action.payload,state);
   }
   case orderAction.OrderAction.ADD_ORDER_FAIL:{
     return {
       ...state,
       error:action.payload
     }
   }  
     case orderAction.OrderAction.UPDATE_ORDER_SUCCESS: {
    return orderAdapter.updateOne(action.payload, state);
  }
  case orderAction.OrderAction.UPDATE_ORDER_FAIL: {
    return {
      ...state,
      error: action.payload
    };
  }  
  case orderAction.OrderAction.DELETE_ORDER_SUCCESS:{
    return orderAdapter.removeOne(action.payload,state);
  }
  case orderAction.OrderAction.DELETE_ORDER_FAIL:{
    return {
      ...state,
      error:action.payload
    }
  }

    default: {
      return state;
    }
  }
}

const getCartFeatureState = createFeatureSelector<OrderState>(
  "orders"
);

export const getOrders = createSelector(
  getCartFeatureState,
  orderAdapter.getSelectors().selectAll
);

export const getOrdersLoading = createSelector(
  getCartFeatureState,
  (state: OrderState) => state.loading
);

export const getOrdersLoaded = createSelector(
  getCartFeatureState,
  (state: OrderState) => state.loaded
);

export const getError = createSelector(
  getCartFeatureState,
  (state: OrderState) => state.error
);

