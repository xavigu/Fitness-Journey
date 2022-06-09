import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./meal-form.component.scss'],
  template: `
    <div class="meal-form">
      <form [formGroup]="form">
        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input
              type="text"
              placeholder="e.g. Ball Meats"
              formControlName="name">
            <div class="error" *ngIf="required">
              Meal name is required
            </div>
          </label>
        </div>
        
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button
              type="button"
              class="meal-form__add"
              (click)="addIngredient()">
              <img src="/assets/add-white.svg">
              Add food
            </button>  
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls; index as i">
              <input [formControlName]="i" placeholder="e.g. Eggs">
              <span
                  class="meal-form__remove"
                  (click)="removeIngredient(i)">
              </span>
            </label>
          </div>
        </div>

        <div class="meal-form__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="createMeal()"
              [disabled]="invalid">
              Create meal  
            </button>  

            <a
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>  
          </div>
        </div>

      </form>
    </div>
  `
})
export class MealFormComponent implements OnInit {

  @Output() mealCreated = new EventEmitter<any>();

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void { }

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

  get ingredients(){
    return this.form.get('ingredients') as FormArray;
  }

  createMeal(){
    if (this.form.valid) {
      this.mealCreated.emit(this.form.value);
    }
  }

  addIngredient(){
    //access to get ingredients()
    this.ingredients.push(new FormControl(''));
  }

  removeIngredient(index: number){
    //access to get ingredients()
    this.ingredients.removeAt(index);
  }

}