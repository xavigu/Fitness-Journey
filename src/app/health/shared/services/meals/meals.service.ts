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
  
  userId: any = localStorage.getItem('userId')!;
  
  // get meals from an user and set in the store
  meals$: Observable<any> = this.db.list(`meals/${this.userId}`).valueChanges().pipe(tap(next => this.store.set('meals', next)));
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
    ){}

  // get uid(){
  //   return this.authService.userId;
  // }

  // getUserId(){
  //   let uid!: any;
  //   this.authService.user.then(user => {
  //     console.log('user:', user)
  //     uid = user?.uid;
  //   })
  //   console.log('uid:', uid)
  //   return uid;
  // }

  addMeal(meal: Meal){
    return this.db.list(`meals/${this.userId}`).push(meal);
  }

}