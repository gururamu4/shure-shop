import * as userActions from "./user.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import { User } from "../models/user";
import * as fromRoot from "./product.state";

export interface UserState extends EntityState<User> {
  selectedUser: User;
  selectedUserId: number;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  users: UserState;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<
  User
>();

export const defaultUser: UserState = {
  ids: [],
  entities: {},
  selectedUser: null,
  selectedUserId: null,
  loading: false,
  loaded: false,
  error: ""
};

export const initialState = userAdapter.getInitialState(defaultUser);

export function userReducer(
  state = initialState,
  action: userActions.Action
): UserState {
  switch (action.type) {
    case userActions.userActions.LOAD_USERS_SUCCESS: {

      return userAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case userActions.userActions.LOAD_USERS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    case userActions.userActions.LOAD_USER_SUCCESS: {

      if (action.payload != null) {
        return userAdapter.addOne(action.payload, {
          ...state,
          selectedUser: action.payload,
          selectedUserId: action.payload.id
        })
      }
      else {
        return initialState;
      }
    }


    case userActions.userActions.LOAD_USERS_FAIL: {
      return {
        ...state,
        error: action.payload
      }
    }
    case userActions.userActions.ADD_USER_SUCCESS: {
      return userAdapter.addOne(action.payload, state);
    }
    case userActions.userActions.ADD_USER_FAIL: {
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

const getUserFeatureState = createFeatureSelector<UserState>(
  "userList"
);

export const getUsers = createSelector(
  getUserFeatureState,
  userAdapter.getSelectors().selectAll
);

export const getUsersLoading = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loading
);
export const getUser = createSelector(
  getUserFeatureState,
  (state: UserState) => state.selectedUser

);
export const getCurrentUserId = createSelector(
  getUserFeatureState,
  (state: UserState) => state.selectedUserId
);

export const getUsersLoaded = createSelector(
  getUserFeatureState,
  (state: UserState) => state.loaded
);

export const getError = createSelector(
  getUserFeatureState,
  (state: UserState) => state.error
);

