import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MealsComponent } from './meals.component';
import { SharedModule } from '../shared/shared.module';
import { MealComponent } from './meal/meal.component';

export const ROUTES: Routes = [
  { path: '', component: MealsComponent},
  { path: 'new', component: MealComponent},
]

@NgModule({
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule 
  ],
  declarations: [
    MealsComponent,
    MealComponent
  ],
  exports: [],
  providers: [],
})
export class MealsModule {}