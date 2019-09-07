import { AbstractControl, ValidationErrors } from '@angular/forms';
export function cannotContainSpace(control: AbstractControl) {
      if ((control.value as string).indexOf(' ') >= 0) {
            return { cannotContainSpace: true };
      }

      return null;
}
export function asyncUnique(control: AbstractControl) {
      let userList = JSON.parse(localStorage.getItem('userList') || '[]');

      for (let user of userList) {
            if (user.username !== control.value) {
                  return { asyncUnique: true }
            }

            return null;

      }


}
export function passwordCheck(control: AbstractControl) {

      let userList = JSON.parse(localStorage.getItem('userList') || '[]');
      if (!asyncUnique) {
            for (let user of userList) {
                  if (user.password !== control.value) {
                        {
                              console.log('ee')
                              return { passwordCheck: true }
                        }
                  }
                  return null;

            }
      }

}

