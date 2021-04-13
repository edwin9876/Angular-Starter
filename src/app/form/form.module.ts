import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

@NgModule({
  declarations: [FormComponent, PersonalInfoComponent],
  imports: [CommonModule, FormRoutingModule, ReactiveFormsModule],
})
export class FormModule {}
