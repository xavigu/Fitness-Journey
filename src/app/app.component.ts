import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';
import { AuthService, User } from './auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template:  `
  <div>
    <h1>{{ user$ | async | json }}</h1>
    <div class="wrapper">
      <router-outlet></router-outlet>
    </div>  
  </div>
`
})
export class AppComponent implements OnInit, OnDestroy {

  user$!: Observable<User>;
  subscription!: Subscription;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
