import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MealsComponent } from './meals.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent},
]

@NgModule({
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES) 
  ],
  declarations: [
    MealsComponent
  ],
  exports: [],
  providers: [],
})
export class MealsModule {}