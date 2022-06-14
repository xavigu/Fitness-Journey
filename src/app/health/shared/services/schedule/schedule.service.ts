import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Store } from 'src/store';

@Injectable()
export class ScheduleService {

  //behaviour subject is initialized with a value
  private date$ = new BehaviorSubject(new Date());

  // schedule is notified always a date changes
  schedule$: Observable<any[]> = this.date$.pipe(tap((next: any) => this.store.set('date', next)));

  constructor(
    private store: Store
  ){}
}