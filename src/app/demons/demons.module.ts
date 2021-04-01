import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemonsRoutingModule } from './demons-routing.module';
import { DemonsComponent } from './demons.component';


@NgModule({
  declarations: [DemonsComponent],
  imports: [
    CommonModule,
    DemonsRoutingModule
  ]
})
export class DemonsModule { }
