import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss'],
})
export class AdminAnalyticsComponent {
  opened: boolean = false;
  componentName: string = 'Analytics';

  constructor() {}
}
