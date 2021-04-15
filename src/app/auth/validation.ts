import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const firstPw = control.get('password');
  const reEnterPw = control.get('rePassword');

  console.log(firstPw!.value, reEnterPw!.value);
  return firstPw && reEnterPw && firstPw.value === reEnterPw.value
    ? null
    : { passwordNotMatch: true };
};
