import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';
import { Workout } from 'src/app/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./schedule-assign.component.scss'],
  template: `
    <div class="schedule-assign">
      <div class="schedule-assign__modal">
        <div class="schedule-assign__title">
          <h1>
            <img src="/assets/{{ section.type === 'workouts' ? 'workout' : 'food'}}.svg">
            Assign {{ section.type }}
          </h1>
          <a 
            class="btn__add"
            [routerLink]="getRoute(section.type)">
            <img src="/assets/add-white.svg">
            New {{ section.type }}
          </a>
        </div>

        <div class="schedule-assign__list">
          <span 
            class="schedule-assign__empty"
            *ngIf="!list?.length">
            <img src="/assets/face.svg">
            Nothing here to assign
          </span>  
          <div
            *ngFor="let item of list"
            [class.active]="exists(item.name)"
            (click)="toggleItem(item.name)">
            {{ item.name }}
          </div>  
        </div>

        <div class="schedule-assign__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="updateAssign()">
              Update
            </button>  
            <button
              type="button"
              class="button button--cancel"
              (click)="cancelAssign()">
              Cancel
            </button>  
          </div>
        </div>

      </div>
    </div>
  `
})
export class ScheduleAssignComponent implements OnInit {

  private selected: string[] = []; 
  
  @Input() section: any;
  // show list of Meals or Workouts
  @Input() list!: any;

  @Output() update = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  ngOnInit(): void { 
    this.selected = [...this.section.assigned];
  }

  getRoute(name: string){
    return [`../${name}/new`];
  }

  exists(name: any){
    return !!~this.selected.indexOf(name);
  }

  toggleItem(name: any){
    if (this.exists(name)) {
      // similar to splice
      this.selected = this.selected.filter(item => item !== name);
    } else {
      // similar to push
      this.selected = [...this.selected, name];
    }
  }

  updateAssign() {
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }
}
