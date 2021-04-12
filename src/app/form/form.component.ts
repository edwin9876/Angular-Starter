import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  /** A hero's name can't match the given regular expression */
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      console.log(control);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }
  identityRevealedValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const name = control.get('name');
    const alterEgo = control.get('lastName');

    return name && alterEgo && name.value === alterEgo.value
      ? { identityRevealed: true }
      : null;
  };
  profileForm = this.fb.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          this.forbiddenNameValidator(/bob/i),
        ],
      ],
      lastName: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      aliases: this.fb.array([this.fb.control('')]),
    },
    { validators: this.identityRevealedValidator }
  );
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}
