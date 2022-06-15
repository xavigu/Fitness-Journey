
import { BehaviorSubject, distinctUntilChanged, Observable, pluck } from 'rxjs';
import { User } from './app/auth/shared/services/auth/auth.service';
import { ScheduleItem } from './app/health/shared/services/schedule/schedule.service';
import { Workout } from './app/health/shared/services/workouts/workouts.service';

export interface State {
  user: User,
  date: Date,
  meals: any[],
  workouts: Workout[],
  schedule: ScheduleItem[],
  [key: string]: any
}

const state: State = {
  user: {
    email: '',
    uid: '',
    authenticated: false
  },
  date: new Date(),
  meals: [],
  workouts: [],
  schedule: []
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
