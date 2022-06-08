import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from 'src/store';
import { User } from '../auth/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app-header.component.scss'],
  template: `
    <div class="app-header">
      <div class="wrapper">
        <img src="/assets/logo.png">
        <div 
          class="app-header__user-info"
          *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `,
})
export class AppHeaderComponent implements OnInit {

  @Input() user!: User | null;

  @Output() logout = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  logoutUser(){
    this.logout.emit();
  }
}
