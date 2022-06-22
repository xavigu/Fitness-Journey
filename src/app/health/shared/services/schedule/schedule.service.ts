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
  $key?: string
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

  constructor(
    private store: Store,
    private db: AngularFireDatabase
  ){}

  // latest update from a particular section
  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([ items, section ]: any[]) => {
      //TODO Check why section dont return the $key, show in video
      console.log('items: ', items);
      console.log('section: ', section);

      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };
      // if we have an id we use the correspondent section.data if not we create a new one with defaults values
      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };
      console.log('items id: ', id);
      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }

    })
  )

  selected$ = this.section$.pipe(tap((next: any) => this.store.set('selected', next)))

  // observable of list of meals or workouts
  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  )

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

  updateDate(date: Date){
    this.date$.next(date);
  }

  selectSection(event: any){
    console.log('section selected:', event);
    this.section$.next(event);
  }

  private createSection(payload: ScheduleItem){
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem){
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  // itemList observable emit the new items to update firebase database
  updateItems(items: string[]){
    console.log('update meals/workout items:', items);
    this.itemList$.next(items)
  }

  private getSchedule(startAt: number, endAt: number){
    // get schedule orderby timestamp with and start and end value
    return this.db.list(`schedule/${this.uid}`, ref => ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)).valueChanges();
  }
}