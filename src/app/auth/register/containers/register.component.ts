import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'register',
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink="/auth/login">Already have an account?</a>
        <button type="submit">
          Create account
        </button>
      </auth-form>
    </div>
  `,

})
export class RegisterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  registerUser(event: FormGroup){
    console.log('register: ', event.value);
  }
}
