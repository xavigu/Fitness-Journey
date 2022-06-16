import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';
import { Meal, MealsService } from '../shared/services/meals/meals.service';
import { ScheduleItem, ScheduleService } from '../shared/services/schedule/schedule.service';
import { Workout, WorkoutsService } from '../shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()">
      </schedule-assign>
    </div>  
  `,
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$!: Observable<Date>;
  schedule$!: Observable<ScheduleItem[]>;
  selected$!: Observable<any>;
  list$!: Observable<Meal[] | Workout[]>;
  
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void { 
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions= [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      // side effect observable to create or update a section
      this.scheduleService.items$.subscribe(),
      // get meals and workouts to see a list to assign in the selected day
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any){
    console.log('change section:', event);
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }
  
  closeAssign() {
    this.open = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
