import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { filter, map, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { Store } from 'src/store';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {
  
  userId: any = localStorage.getItem('userId')!;
  
  mealsRef$!: AngularFireList<any>;
  meals$: Observable<any[]>;
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
    ){
      // get meals from an specific user
      this.mealsRef$ = this.db.list(`meals/${this.userId}`);
      // create an observable getting the key of each meal and introduce in the meal data
      this.meals$ = this.mealsRef$.snapshotChanges().pipe(
        map((changes: any) => 
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
      // store the meals with the key into the global store
      this.meals$.subscribe(meals => {
        console.log('meals updated: ', meals)
        this.store.set('meals', meals)
      });
    }

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

  getMeal(key: string){
    console.log('getMeal param id', key)
    if (!key) return of({});
    return this.store.select('meals')
      .pipe(
        filter(Boolean),
        map((meals: any) => meals.find((meal: any) => meal.key === key))
      );
  }

  addMeal(meal: Meal){
    return this.db.list(`meals/${this.userId}`).push(meal);
  }

  updateMeal(key: string, meal: Meal){
    return this.db.object(`meals/${this.userId}/${key}`).update(meal);
  }

  removeMeal(key: string){
    console.log('key: ', key);
    return this.db.list(`meals/${this.userId}`).remove(key);
  }
}