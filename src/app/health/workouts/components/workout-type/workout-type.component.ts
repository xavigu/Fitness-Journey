import { ChangeDetectionStrategy, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// register our own control
export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
}

@Component({
  selector: 'workout-type',
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./workout-type.component.scss'],
  template: `
    <div class="workout-type">
      <div 
        class="workout-type__pane" 
        *ngFor="let selector of selectors"
        [class.active]="selector === value"
        (click)="setSelected(selector)">
        <img src="/assets/{{selector}}.svg">
        <p>{{ selector }}</p>
      </div>
    </div>  
  `
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  selectors = ['strength', 'endurance'];

  value!: string;

  //basics you need to use ControlValueAccessor
  private onTouch!: Function;
  private onModelChange!: Function;

  registerOnTouched(fn: Function){
    this.onTouch = fn;
  }

  registerOnChange(fn: Function){
    this.onModelChange = fn;
  }

  // function to initialize this control to have the value from the form ('strength')
  writeValue(value: any): void {
    this.value = value;
  }

  setSelected(value: string) {
    this.value = value;
    //say to the form that the value changes
    this.onModelChange(value);
    this.onTouch();
  }

  ngOnInit(): void { }
}
