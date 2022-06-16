import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, map, Observable, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from 'src/store';
import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

export interface ScheduleItem {
  meals: Meal[] | null,
  workouts: Workout[] | null,
  section: string,
  timestamp: number,
  key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}
@Injectable()
export class ScheduleService {

  uid: any = localStorage.getItem('userId')!;

  //behaviour subject is initialized with a value
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  // latest update from a particular section
  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([ items, section ]: any) => {
      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };
      // if have an id we use the correspondent section.data if not que create a defaults
      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }

    })
  )

  selected$ = this.section$.pipe(tap((next: any) => this.store.set('selected', next)))

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  )

  // TODO see if works
  // schedule is notified always the date subject emit and store the date
  schedule$: Observable<ScheduleItem[]> = this.date$.pipe(
    tap((next: any) => this.store.set('date', next)),
    map((day:any) => {
      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();
      
      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }: any) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      const mapped: ScheduleList = {}

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    }),
    tap((next: any) => this.store.set('schedule', next))
  );

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ){}

  updateDate(date: Date){
    this.date$.next(date);
  }

  selectSection(event: any){
    this.section$.next(event);
  }

  private updateSection(key: string, payload: ScheduleItem){
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private createSection(payload: ScheduleItem){
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  // itemList observable emit the new items to update firebase database
  updateItems(items: string[]){
    this.itemList$.next(items)
  }

  // TODO see if works
  private getSchedule(startAt: number, endAt: number){
    // get schedule orderby timestamp with and start and end value
    return this.db.list(`schedule/${this.uid}`, ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)).valueChanges();
  }
}