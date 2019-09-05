import {User} from '.././models/user'
import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of, observable } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { userService } from "../services/user.service";
import * as userActions from "../store/user.action";

@Injectable()
export class userEffect {
  constructor(
    private actions$: Actions,
    private userService: userService
  ) {}

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUsers>(
      userActions.userActions.LOAD_USERS
    ),
    mergeMap((action: userActions.LoadUsers) =>
      this.userService.getUsers().pipe(
        map(
          (User: User[]) =>
            new userActions.LoadUsersSuccess(User)
        ),
        catchError(err => of(new userActions.LoadUserFail(err)))
      )
    )
  );


  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType<userActions.LoadUser>(
      userActions.userActions.LOAD_USER
    ),
    mergeMap((action: userActions.LoadUser) =>
      this.userService.getUserById(action.payload).pipe(
        map(
          (User: User) =>
            new userActions.LoadUserSuccess(User)
        ),
        catchError(err => of(new userActions.LoadUserFail(err)))
      )
    )
  );


  @Effect()
  addUser$:Observable<Action>=this.actions$.pipe(
    ofType<userActions.AddUser>(userActions.userActions.ADD_USER),
    map((action:userActions.AddUser)=>action.payload),
    mergeMap((User:User)=>this.userService.createUser(User)),
    map((newUser:User)=>
    new userActions.AddUserSuccess(newUser)
    )
  )

}
