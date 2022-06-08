import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/store';
import { MealsService } from '../shared/services/meals/meals.service';

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div>
      {{ meals$ | async | json }}
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
