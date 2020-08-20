import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function priceValidator(val: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let v: number = +control.value;
      if (v >= +val) {
        return { 'gte': true, 'requiredValue': val }
      } 
      return null;
    }
  }