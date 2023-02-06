import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-table-layout',
  templateUrl: './admin-table-layout.component.html',
  styleUrls: ['./admin-table-layout.component.scss'],
})
export class AdminTableLayoutComponent {
  opened: boolean = false;
  componentName: string = 'Tables';

  constructor() {}
}
