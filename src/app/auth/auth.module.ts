import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { SharedModule } from './shared/shared.module';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyB5K8sSGoXWjBKajoe8PRYQuSRNWTgz_pc",
  authDomain: "fitness-journey-fb563.firebaseapp.com",
  databaseURL: "https://fitness-journey-fb563-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-journey-fb563",
  storageBucket: "fitness-journey-fb563.appspot.com",
  messagingSenderId: "726242041843",
  appId: "1:726242041843:web:6e642ac68144472c943c86"
};

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login'},
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
    ]
  }
];

@NgModule({
  imports: [
     CommonModule,
     RouterModule.forChild(ROUTES),
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireAuthModule,
     AngularFireDatabaseModule,
     SharedModule.forRoot()
   ],
  exports: []
})
export class AuthModule {}