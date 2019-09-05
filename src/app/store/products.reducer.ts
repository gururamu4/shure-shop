import * as productActions from "./products.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { product } from "../models/product";
import * as fromRoot from "./product.state";

export interface ProductState extends EntityState<product> {
  selectedProductId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  products: ProductState;
}

export const productsAdapter: EntityAdapter<product> = createEntityAdapter<
  product
>();

export const defaultProduct: ProductState = {
  ids: [],
  entities: {},
  selectedProductId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = productsAdapter.getInitialState(defaultProduct);

export function productReducer(
  state = initialState,
  action: productActions.Action
): ProductState {
  switch (action.type) {
    case productActions.ProductActions.LOAD_PRODUCTS_SUCCESS: {
     
      return productsAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case productActions.ProductActions.LOAD_PRODUCTS_FAIL :{
             return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

  case productActions.ProductActions.DELETE_PRODUCTS_SUCCESS:{
    return productsAdapter.removeOne(action.payload,state);
  }
  case productActions.ProductActions.DELETE_PRODUCTS_FAIL:{
    return {
      ...state,
      error:action.payload
    }
  }
   case productActions.ProductActions.LOAD_PRODUCT_SUCCESS:{
    return productsAdapter.addOne(action.payload,{
      ...state,
      selectedProductId:action.payload.id
    })
   }
   case productActions.ProductActions.LOAD_PRODUCTS_FAIL:{
    return {
       ...state,
       error:action.payload
     }
   }
   case productActions.ProductActions.ADD_PRODUCT_SUCCESS:{
     return productsAdapter.addOne(action.payload,state);
   }
   case productActions.ProductActions.ADD_PRODUCT_FAIL:{
     return {
       ...state,
       error:action.payload
     }
   }  
     case productActions.ProductActions.UPDATE_PRODUCT_SUCCESS: {
    return productsAdapter.updateOne(action.payload, state);
  }
  case productActions.ProductActions.UPDATE_PRODUCT_FAIL: {
    return {
      ...state,
      error: action.payload
    };
  }

    default: {
      return state;
    }
  }
}

const getProductFeatureState = createFeatureSelector<ProductState>(
  "productList"
);

export const getProducts = createSelector(
  getProductFeatureState,
  productsAdapter.getSelectors().selectAll
);

export const getProductsLoading = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.loading
);

export const getProductsLoaded = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.loaded
);

export const getError = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.error
);


export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state: ProductState) => state.selectedProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  state => state.entities[state.selectedProductId]
);