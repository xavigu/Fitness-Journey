import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule.forChild(ROUTES) 
  ],
  exports: [],
  providers: [],
})
export class LoginModule {}