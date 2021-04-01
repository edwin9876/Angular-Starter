import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemonsComponent } from './demons.component';

const routes: Routes = [{ path: '', component: DemonsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemonsRoutingModule { }
