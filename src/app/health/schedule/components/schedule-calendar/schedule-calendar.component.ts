import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ScheduleItem, ScheduleList } from 'src/app/health/shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['./schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls
        [selected]="selectedDay"
        (move)="onChange($event)">
      </schedule-controls>

      <schedule-days
        [selected]="selectedDayIndex"
        (select)="selectDay($event)">
      </schedule-days>

      <schedule-section
        *ngFor="let section of sections"
        [name]="section.name"
        [section]="getSection(section.key)"
        (select)="selectSection($event, section.key)">
      </schedule-section>
    </div>
  `
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {

  selectedDayIndex!: number;
  selectedDay!: Date;
  selectedWeek!: Date;

  sections = [
    {key: 'morning', name:'Morning'},
    {key: 'lunch', name:'Lunch'},
    {key: 'evening', name:'Evening'},
    {key: 'snacks', name:'Snacks and Drinks'},
  ]

  @Input()
  set date(date: Date | null){
    if (date) {
      this.selectedDay = new Date(date.getTime());
    }
  }

  @Input() items!: ScheduleList | null;

  @Output() change = new EventEmitter<Date>();

  @Output() select = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  // return all the specific section
  getSection(name: string): ScheduleItem {
    // get item based in the key (name)
    return this.items && this.items[name] || {};
  }

  selectSection({ type, assigned, data}: any, section: string){
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    })
  }

  // get first day of the week and emit to parent
  onChange(weekOffset: number){
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = (
      new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate())
    );
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  selectDay(index: number){
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  private getToday(date: Date){
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  private getStartOfWeek(date: Date){
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
}
