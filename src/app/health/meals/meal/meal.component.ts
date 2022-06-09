import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'meal',
  styleUrls: ['./meal.component.scss'],
  template: `
    <div class="meal">
      I am meal!
    </div>
  `
})
export class MealComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
