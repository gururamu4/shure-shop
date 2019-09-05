import { AbstractControl } from "@angular/forms";

export function usernameValidators(control:AbstractControl){
    if((control.value as string).indexOf(' ')>=0){
        return {usernameValidators:true};

    }
    return null;
}