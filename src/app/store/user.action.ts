import { Action } from "@ngrx/store";


import { User } from "../models/user";

export enum userActions {
  LOAD_USERS = "[USERS] Load USERS",
  LOAD_USERS_SUCCESS = "[USERS] Load USERS Success",
  LOAD_USERS_FAIL = "[USERS] Load USERS Fail",
  LOAD_USER = "[USER] Load USER",
  LOAD_USER_SUCCESS = "[USER] Load USER Success",
  LOAD_USER_FAIL = "[USER] Load USER Fail",
  ADD_USER = "[Product] Add",
  ADD_USER_SUCCESS = "[Product] Add Success",
  ADD_USER_FAIL = "[Product] Add Failed"
}

export class LoadUsers implements Action {
  readonly type = userActions.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
  readonly type = userActions.LOAD_USERS_SUCCESS;

  constructor(public payload: User[]) { }
}

export class LoadUsersFail implements Action {
  readonly type = userActions.LOAD_USERS_FAIL;

  constructor(public payload: string) { }
}
export class LoadUser {
  readonly type = userActions.LOAD_USER;
  constructor(public payload: string) { }
}
export class LoadUserSuccess {
  readonly type = userActions.LOAD_USER_SUCCESS;
  constructor(public payload: User) { }
}
export class LoadUserFail {
  readonly type = userActions.LOAD_USER_FAIL;
  constructor(public payload: string) { }
}
export class AddUser {
  readonly type = userActions.ADD_USER;
  constructor(public payload: User) { }
}
export class AddUserSuccess {
  readonly type = userActions.ADD_USER_SUCCESS;
  constructor(public payload: User) { }
}
export class AddUserFailure {
  readonly type = userActions.ADD_USER_FAIL;
  constructor(public payload: string) { }
}


export type Action =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | AddUser
  | AddUserSuccess
  | AddUserFailure
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail;
