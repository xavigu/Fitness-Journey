import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">
          Login
        </button>
      </auth-form>
    </div>
  `,

})
export class LoginComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  loginUser(event: FormGroup){
    console.log('login: ', event.value);
  }
}
