import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-view',
  templateUrl: './admin-order-view.component.html',
  styleUrls: ['./admin-order-view.component.scss'],
})
export class AdminOrderViewComponent {
  opened: boolean = false;
  componentName: string = 'Orders';

  constructor() {}
}
