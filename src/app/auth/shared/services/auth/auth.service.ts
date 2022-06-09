import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, pipe, tap } from 'rxjs';
import { Store } from 'src/store';

export interface User {
  email: string | null,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {

  auth$ = this.afAuth.authState.pipe(tap(
    next => {
      // if the user is not logged
      if(!next) {
        this.store.set('user', null);
        localStorage.setItem('userId', '');
        return;
      }
      
      // if the user is logged
      const user: User = {
        email: next?.email,
        uid: next?.uid,
        authenticated: true
      }
      this.store.set('user', user);
      localStorage.setItem('userId', user.uid);
    }
  ))

  constructor(
    private store: Store,
    private afAuth: AngularFireAuth
  ){}


  // // get current user logged
  get user(){
    return this.afAuth.currentUser;
  }

  // to access to authState property in other components
  get authState(){
    return this.afAuth.authState;
  }

  createUser(email: string, password: string){
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(){
    return this.afAuth.signOut();
  }
}