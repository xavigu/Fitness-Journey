
import { BehaviorSubject, distinctUntilChanged, Observable, pluck } from 'rxjs';
import { User } from './app/auth/shared/services/auth/auth.service';

export interface State {
  user: User,
  meals: any[],
  [key: string]: any
}

const state: State = {
  user: {
    email: '',
    uid: '',
    authenticated: false
  },
  meals: []
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
