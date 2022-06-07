import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';
import { AuthService, User } from './auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template:  `
  <div>
    <!-- <h1>{{ user$ | async | json }}</h1> -->
    <app-header
      [user]="user$ | async"
      (logout)="onLogout()">
    </app-header>
    <app-nav
     *ngIf="(user$ | async)?.authenticated"></app-nav>
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
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // auth$ only gives data when you are subscribed
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select<User>('user');
  }

  async onLogout(){
    await this.authService.logoutUser();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
