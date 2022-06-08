import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: 'meals', loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule) },
  { path: 'workouts', loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule) }
]

@NgModule({
  declarations: [

  ],
  imports: [ 
    CommonModule,
    RouterModule.forChild(ROUTES) 
  ],
  exports: [],
  providers: [],
})
export class HealthModule {}