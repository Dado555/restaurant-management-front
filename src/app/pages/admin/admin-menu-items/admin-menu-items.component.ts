import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-menu-items',
  templateUrl: './admin-menu-items.component.html',
  styleUrls: ['./admin-menu-items.component.scss'],
})
export class AdminMenuItemsComponent {
  events: string[] = [];
  opened: boolean = false;
  componentName: string = 'Menu items';

  constructor() {}
}
