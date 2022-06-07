import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './containers/register.component';
import { SharedModule } from '../shared/shared.module';

export const ROUTES: Routes = [
  {path: '', component: RegisterComponent }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [ 
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule 
  ],
  exports: [],
  providers: [],
})
export class RegisterModule {}