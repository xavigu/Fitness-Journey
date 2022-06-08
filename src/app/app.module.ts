import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'src/store';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { AppHeaderComponent } from './header/app-header.component';
import { AppNavComponent } from './nav/app-nav.component';

// route start redirection
export const ROUTES: Routes = [
  { path:'', pathMatch: 'full', redirectTo:'schedule' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppNavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule,
    HealthModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
