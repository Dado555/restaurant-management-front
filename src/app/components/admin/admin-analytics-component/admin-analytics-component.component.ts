import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-analytics-component',
  templateUrl: './admin-analytics-component.component.html',
  styleUrls: [
    './admin-analytics-component.component.scss',
    '../../../../vendor/chartist/css/chartist.min.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/jqvmap/css/jqvmap.min.css',
  ],
})
export class AdminAnalyticsComponentComponent {
  @Output() toggleSidenav = new EventEmitter();

  constructor() {}

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  toggleSidenavFunc() {
    console.log('SIDENAV TOGGLE');
    this.toggleSidenav.emit();
  }
}
