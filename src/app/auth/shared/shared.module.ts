import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
  providers: [],
})
export class SharedModule {}