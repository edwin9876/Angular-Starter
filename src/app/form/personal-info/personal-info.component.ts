import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormData } from '../form.interface';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() submitValue = new EventEmitter<FormData>();
  ngOnInit(): void {}

  personalInfo = this.fb.group({
    name: [''],
    stats: this.fb.group({
      power: [''],
      speed: [''],
      luck: [''],
      IQ: [''],
    }),
    weapons: this.fb.array([this.fb.control('')]),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitValue.emit(this.personalInfo.value);
  }

  get weapons() {
    return this.personalInfo.get('weapons') as FormArray;
  }

  addWeapon() {
    this.weapons.push(this.fb.control(''));
  }
  removeWeapon(index: number) {
    this.weapons.removeAt(index);
  }
}
