import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Store } from 'src/store';

@Injectable()
export class ScheduleService {

  //behaviour subject is initialized with a value
  private date$ = new BehaviorSubject(new Date());

  // schedule is notified always the date subject emit and store the date
  schedule$: Observable<any[]> = this.date$.pipe(tap((next: any) => this.store.set('date', next)));

  constructor(
    private store: Store
  ){}

  updateDate(date: Date){
    this.date$.next(date);
  }
}