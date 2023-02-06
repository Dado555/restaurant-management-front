import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.scss'],
})
export class AdminOrdersListComponent {
  opened: boolean = false;
  componentName: string = 'Orders';

  constructor() {}
}
