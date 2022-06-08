import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutsComponent } from './workouts.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent},
]

@NgModule({
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES) 
  ],
  declarations: [
    WorkoutsComponent
  ],
  exports: [],
  providers: [],
})
export class WorkoutsModule {}