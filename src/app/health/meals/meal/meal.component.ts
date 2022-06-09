import { Component, OnInit } from '@angular/core';
import { Meal } from '../../shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['./meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/food.svg">
          <span>Create meal</span>
        </h1>  
      </div>
      <div>
        <meal-form
          (mealCreated)="addMeal($event)">
        </meal-form>
      </div>  
    </div>
  `
})
export class MealComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  addMeal(event: any){
    console.log('Meal:', event);
  }
}
