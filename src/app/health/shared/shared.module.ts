import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterModule } from '@angular/router';

import { MealsService } from './services/meals/meals.service';

@NgModule({
  declarations: [],
  imports: [ 
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule 
  ],
  exports: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    }
  }
}