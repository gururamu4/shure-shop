import { Directive } from "@angular/core";
import { AsyncValidator,AsyncValidatorFn,AbstractControl,ValidationErrors,NG_ASYNC_VALIDATORS } from "@angular/forms";
import {Observable} from 'rxjs'
import { SignupService } from "./loginService.service";
import {map } from 'rxjs/operators';

// export function usernameValidator(userService:SignupService):AsyncValidatorFn{
//   return (c:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>=>{
//     return userService.getUserByUsername(c.value).pipe(
//     map(users=>{
//       return users && users.length>0 ? {'uniqueUsername':true}:null;
//     })
//     );
//   }
// }
export function usernameValidator(userService:SignupService):AsyncValidatorFn{
  return (c:AbstractControl):Promise<ValidationErrors|null>|Observable<ValidationErrors|null>=>{
    return userService.getUserByUsername(c.value).pipe(
    map(users=>{
      return users && users.length>0 ? null:{'uniqueUsername':true};
    })
    );
  }
}

@Directive({
  selector:'[uniqueUsername]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:usernameValidatorDirective,multi:true}]

})

export class usernameValidatorDirective implements AsyncValidator{
  constructor(private userService:SignupService){}

  validate(c:AbstractControl){
    return this.userService.getUserByUsername(c.value).pipe(
      map(users=>{
        console.log(users)
        return users && users.length>0?{'uniqueUsername':true}:null;
      })
    )
  }
}