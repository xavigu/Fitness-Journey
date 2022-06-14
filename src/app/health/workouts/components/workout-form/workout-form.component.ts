import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workout-form.component.scss'],
  template: `
    <div class="workout-form">
      <form [formGroup]="form">
        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input
              type="text"
              placeholder="e.g. Bench Press"
              formControlName="name">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
          <label>
            <h3>Type</h3>
            <workout-type 
              formControlName="type">
            </workout-type>
          </label>
        </div>

        <div class="workout-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createWorkout()"
              [disabled]="invalid">
              Create workout  
            </button>  
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateWorkout()"
              [disabled]="invalid">
              Update workout  
            </button>  

            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>  
          </div>

          <div class="workout-form__delete" *ngIf="exists">      
            <div *ngIf="toggled">
              <p>Delete workout?</p>
              <button class="confirm" type="button" (click)="removeWorkout()">
                Yes
              </button>  
              <button class="cancel" type="button" (click)="toggle()">
                No
              </button>  
            </div>
      
            <button class="button button--delete" type="button" (click)="toggle()">
              Delete
            </button>  
          </div>
          
        </div>

      </form>
    </div>
  `
})
export class WorkoutFormComponent implements OnInit, OnChanges {

  toggled = false;
  exists = false;

  @Input() workout: any;
  @Output() workoutCreated = new EventEmitter<any>();
  @Output() workoutUpdated = new EventEmitter<any>();
  @Output() workoutRemoved = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength'
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.workout && this.workout.name){
    //   //exists workout
    //   this.exists = true
    //   this.emptyIngredients();

    //   const value = this.workout;
    //   this.form.patchValue(value);

    //   // update de ingredients form array
    //   this.updateIngredients(value);
    // }
  }

  // emptyIngredients(){
  //   while (this.ingredients.controls.length){
  //     this.ingredients.removeAt(0);
  //   }
  // }

  // updateIngredients(value: any){
  //   if (value.ingredients){
  //     for (const ingredient of value.ingredients) {
  //       this.ingredients.push(new FormControl(ingredient));
  //     }
  //   }
  // }

  get required(){
    return(
      this.form.get('name')?.hasError('required') && 
      this.form.get('name')?.touched
    );
  }

  get invalid(){
    return(
      this.form.get('name')?.hasError('required')
    );
  }

  // get ingredients(){
  //   return this.form.get('ingredients') as FormArray;
  // }

  // addIngredient(){
  //   //access to get ingredients()
  //   this.ingredients.push(new FormControl(''));
  // }

  // removeIngredient(index: number){
  //   //access to get ingredients()
  //   this.ingredients.removeAt(index);
  // }
  
  createWorkout(){
    if (this.form.valid) {
      this.workoutCreated.emit(this.form.value);
    }
  }

  updateWorkout(){
    if (this.form.valid) {
      this.workoutUpdated.emit(this.form.value);
    }
  }

  removeWorkout(){
    this.workoutRemoved.emit(this.form.value);
  }


  toggle(){
    this.toggled = !this.toggled;
  }

}