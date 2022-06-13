import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { WorkoutsComponent } from './workouts.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';

export const ROUTES: Routes = [
  { path: '', component: WorkoutsComponent},
  { path: 'new', component: WorkoutComponent},
  { path: ':id', component: WorkoutComponent},
]

@NgModule({
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule 
  ],
  declarations: [
    WorkoutsComponent,
    WorkoutComponent,
    WorkoutFormComponent
  ],
  exports: [],
  providers: [],
})
export class WorkoutsModule {}