import * as cartActions from "./cart.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as fromRoot from "./product.state";
import { cart } from "../models/cart";

export interface CartState extends EntityState<cart> {
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  carts: CartState;
}

export const cartAdapter: EntityAdapter<cart> = createEntityAdapter<
  cart
>();

export const defaulatCart: CartState = {
  ids: [],
  entities: {},
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = cartAdapter.getInitialState(defaulatCart);

export function cartReducer(
  state = initialState,
  action: cartActions.Action
): CartState {
  switch (action.type) {
    case cartActions.CartActions.LOAD_CARTS_SUCCESS: {
      //console.log(action.payload)
      return cartAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case cartActions.CartActions.LOAD_CARTS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case cartActions.CartActions.ADD_CART_SUCCESS: {
      return cartAdapter.addOne(action.payload, state);
    }
    case cartActions.CartActions.ADD_CART_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case cartActions.CartActions.UPDATE_CART_SUCCESS: {
      return cartAdapter.updateOne(action.payload, state);
    }
    case cartActions.CartActions.UPDATE_CART_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case cartActions.CartActions.DELETE_CART_SUCCESS: {
      return cartAdapter.removeOne(action.payload, state);
    }
    case cartActions.CartActions.DELETE_CART_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

const getCartFeatureState = createFeatureSelector<CartState>(
  "carts"
);

export const getCarts = createSelector(
  getCartFeatureState,
  cartAdapter.getSelectors().selectAll
);

export const getCartsLoading = createSelector(
  getCartFeatureState,
  (state: CartState) => state.loading
);

export const getCartsLoaded = createSelector(
  getCartFeatureState,
  (state: CartState) => state.loaded
);

export const getError = createSelector(
  getCartFeatureState,
  (state: CartState) => state.error
);

