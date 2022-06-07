import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Store } from 'src/store';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

// routes
export const ROUTES: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  providers: [
    Store
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB5K8sSGoXWjBKajoe8PRYQuSRNWTgz_pc",
//   authDomain: "fitness-journey-fb563.firebaseapp.com",
//   databaseURL: "https://fitness-journey-fb563-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "fitness-journey-fb563",
//   storageBucket: "fitness-journey-fb563.appspot.com",
//   messagingSenderId: "726242041843",
//   appId: "1:726242041843:web:6e642ac68144472c943c86"
// };
