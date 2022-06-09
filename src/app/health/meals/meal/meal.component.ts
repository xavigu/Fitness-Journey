import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal, MealsService } from '../../shared/services/meals/meals.service';

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

  constructor(
    private mealService: MealsService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  async addMeal(event: Meal){
    await this.mealService.addMeal(event)
    this.backToMeals();
  }

  backToMeals(){
    this.router.navigate(['meals'])
  }
}
