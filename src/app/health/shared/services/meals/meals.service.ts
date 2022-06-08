import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  // get meals from an user and set in the store
  meals$: Observable<any> = this.db.list(`meals/${this.uid}`).valueChanges().pipe(tap(next => this.store.set('meals', next)));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ){}

  get uid(){
    let uid!: any;
    this.authService.user.then(user => {
      uid = user?.uid;
    })
    return uid;
  }

}