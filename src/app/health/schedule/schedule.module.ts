import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ScheduleComponent } from './schedule.component';

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent},
]

@NgModule({
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES) 
  ],
  declarations: [
    ScheduleComponent
  ],
  exports: [],
  providers: [],
})
export class ScheduleModule {}