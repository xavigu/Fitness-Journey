import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [ 
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthFormComponent
  ],
  providers: []
})
export class SharedModule {
  // static property to use in auth.module
  static forRoot(): ModuleWithProviders<SharedModule> {
    // to dont duplicate services we use this method and use in the module that need it the service (auth.module)
    return {
      ngModule: SharedModule,
      providers: [
        AuthService
      ]
    }
  }

}