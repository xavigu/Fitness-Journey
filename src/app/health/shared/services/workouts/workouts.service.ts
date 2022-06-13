import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { filter, map, Observable, of } from 'rxjs';
import { Store } from 'src/store';

export interface Workout {
  name: string,
  type: string, // endurance or strength
  strength: any,
  endurance: any,
  timestamp: number,
  key: string,
  $exists: () => boolean
}

@Injectable()
export class WorkoutsService {
  
  userId: any = localStorage.getItem('userId')!;
  
  workoutsRef$!: AngularFireList<any>;
  workouts$: Observable<any[]>;
  
  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    ){
      // get workouts from an specific user
      this.workoutsRef$ = this.db.list(`workouts/${this.userId}`);
      // create an observable getting the key of each workout and introduce in the workout data
      this.workouts$ = this.workoutsRef$.snapshotChanges().pipe(
        map((changes: any) => 
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
      // store the workouts with the key into the global store
      this.workouts$.subscribe(workouts => {
        console.log('workouts updated: ', workouts)
        this.store.set('workouts', workouts)
      });
    }

  getWorkout(key: string){
    if (!key) return of({});
    return this.store.select('workouts')
      .pipe(
        filter(Boolean),
        map((workouts: any) => workouts.find((workout: any) => workout.key === key))
      );
  }

  addWorkout(workout: Workout){
    return this.db.list(`workouts/${this.userId}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout){
    return this.db.object(`workouts/${this.userId}/${key}`).update(workout);
  }

  removeWorkout(key: string){
    console.log('key: ', key);
    return this.db.list(`workouts/${this.userId}`).remove(key);
  }
}