import { Component, OnChanges, OnInit } from '@angular/core';
import 'global';
import * as $ from 'jquery';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges, OnInit {
  title = 'aldente-frontend';

  constructor(private notificationService: NotificationService) {}

  ngOnChanges() {
    alert('ucitao se');
  }

  ngOnInit(): void {
    this.notificationService.connect();
  }
}
