import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-form',
  styleUrls: ['./auth-form.component.scss'],
  template: `
    <div class="auth-form">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <ng-content select="h1"></ng-content>

        <label>
          <input 
            type="email"
            placeholder="Email address"
            formControlName="email">
        </label>

        <label>
          <input 
            type="password"
            placeholder="Password"
            formControlName="password">
        </label>

        <div class="error" *ngIf="emailFormatInvalid">
          Invalid email format
        </div>

        <div class="error"  *ngIf="passwordInvalid">
          Password required
        </div>

        <ng-content select=".error"></ng-content>

        <div class="auth-form__action">
          <ng-content select="button"></ng-content>
        </div>

        <div class="auth-form__toggle">
          <ng-content select="a"></ng-content>
        </div>
      </form>
    </div>
  `
})
export class AuthFormComponent implements OnInit {

  @Output() submitted = new EventEmitter<FormGroup>();

  form = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void { }

  onSubmit(){
   if (this.form.valid){
    this.submitted.emit(this.form);
   }
  }

  get passwordInvalid(){
    const control = this.form.get('password');
    return control?.hasError('required') && control.touched;
  }

  get emailFormatInvalid(){
    const control = this.form.get('email');
    return control?.hasError('email') && control.touched;
  }
}
