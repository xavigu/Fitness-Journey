import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Workout, WorkoutsService } from '../../shared/services/workouts/workouts.service';

@Component({
  selector: 'workout',
  styleUrls: ['./workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/assets/workout.svg">
          <span *ngIf="workout$ | async as workout; else loading;">
            {{ workout?.name ? 'Edit': 'Create' }} workout
          </span>
          <ng-template #loading>
            Loading...
          </ng-template>  
        </h1>  
      </div>
      <div *ngIf="workout$ | async as workout; else fetching">
        <workout-form
          [workout]="workout"
          (workoutCreated)="addWorkout($event)"
          (workoutUpdated)="updateWorkout($event)"
          (workoutRemoved)="removeWorkout($event)">
        </workout-form>
      </div>  
      <ng-template #fetching>
        <div class="message">
          <img src="/assets/loading.svg">
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$!: Observable<any>;
  subscription!: Subscription;

  constructor(
    private workoutService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void { 
    this.subscription = this.workoutService.workouts$.subscribe(); 
    // use switchMap to cancel a previous subscription and subscribe to a new one.
    // if you use map rxjs operator you cant subscribe in the getWorkout observable
    this.workout$ = this.route.params.pipe(switchMap((param: any) => this.workoutService.getWorkout(param.id)));
  }

  async addWorkout(event: Workout){
    await this.workoutService.addWorkout(event)
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout){
    const key = this.route.snapshot.params['id'];
    await this.workoutService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout){
    const key = this.route.snapshot.params['id'];
    await this.workoutService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts(){
    this.router.navigate(['workouts'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
