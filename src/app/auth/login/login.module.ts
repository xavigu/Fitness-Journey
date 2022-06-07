import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './containers/login.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  {path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule 
  ],
  exports: [],
  providers: [],
})
export class LoginModule {}