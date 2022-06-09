import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';
import { MealsService } from '../shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/assets/food.svg">
          Your meals
        </h1>
        <a 
          class="btn__add"
          [routerLink]="['../meals/new']">
          <img src="/assets/add-white.svg">
          New meal
        </a>  
      </div>
      <div *ngIf="meals$ | async as meals; else loading">
        <div class="message" *ngIf="!meals.length">
          <img src="/assets/face.svg">
          No meals, add a new meal to start
        </div>
        <list-item
          *ngFor="let meal of meals"
          [item]="meal">
        </list-item>  
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/assets/loading.svg">
          Fetching meals...
        </div>
      </ng-template>
    </div>  
  `,
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$!: Observable<any[]>;
  subscription!: Subscription;

  constructor( 
    private mealsService: MealsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meals$ = this.store.select('meals');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
