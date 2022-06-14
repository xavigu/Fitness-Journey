import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['./schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      {{ date }}
    </div>
  `
})
export class ScheduleCalendarComponent implements OnInit {

  @Input() date: any;

  constructor() { }

  ngOnInit(): void { }
}
