import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Meal, MealsService } from '../../shared/services/meals/meals.service';

@Component({
  selector: 'meal',
  styleUrls: ['./meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/assets/food.svg">
          <span *ngIf="meal$ | async as meal; else loading;">
            {{ meal?.name ? 'Edit': 'Create' }} meal {{ meal?.name }}
          </span>
          <ng-template #loading>
            Loading...
          </ng-template>  
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
export class MealComponent implements OnInit, OnDestroy {

  meal$!: Observable<any>;
  subscription!: Subscription;

  constructor(
    private mealService: MealsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void { 
    this.subscription = this.mealService.meals$.subscribe(); 
    // use switchMap to cancel a previous subscription and subscribe to a new one.
    // if you use map rxjs operator you cant subscribe in the getMeal observable
    this.meal$ = this.route.params.pipe(switchMap((param: any) => this.mealService.getMeal(param.id)));
  }

  async addMeal(event: Meal){
    await this.mealService.addMeal(event)
    this.backToMeals();
  }

  backToMeals(){
    this.router.navigate(['meals'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
