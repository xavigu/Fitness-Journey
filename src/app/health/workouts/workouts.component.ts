import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';
import { WorkoutsService } from '../shared/services/workouts/workouts.service';

@Component({
  selector: 'workouts',
  styleUrls: ['workouts.component.scss'],
  template: `
    <div class="workouts">
      <div class="workouts__title">
        <h1>
          <img src="/assets/workout.svg">
          Your workouts
        </h1>
        <a 
          class="btn__add"
          [routerLink]="['../workouts/new']">
          <img src="/assets/add-white.svg">
          New workout
        </a>  
      </div>
      <div *ngIf="workouts$ | async as workouts; else loading">
        <div class="message" *ngIf="!workouts.length">
          <img src="/assets/face.svg">
          No workouts, add a new workout to start
        </div>
        <list-item
          *ngFor="let workout of workouts"
          [item]="workout"
          (remove)="removeWorkout($event)">
        </list-item>  
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/loading.svg">
          Fetching workouts...
        </div>
      </ng-template>
    </div>  
  `,
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  workouts$!: Observable<any[]>;
  subscription!: Subscription;

  constructor( 
    private workoutsService: WorkoutsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.workouts$ = this.store.select('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  removeWorkout(event: any){
    this.workoutsService.removeWorkout(event.key);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
