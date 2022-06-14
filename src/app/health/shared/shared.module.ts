import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';

import { MealsService } from './services/meals/meals.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import { WorkoutsService } from './services/workouts/workouts.service';
import { JoinPipe } from './pipes/join.pipe';
import { WorkoutPipe } from './pipes/workout.pipe';

@NgModule({
  declarations: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ],
  imports: [ 
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule 
  ],
  exports: [
    ListItemComponent,
    JoinPipe,
    WorkoutPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService
      ]
    }
  }
}