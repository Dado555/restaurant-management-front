import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.scss'],
})
export class AdminWorkersComponent {
  opened: boolean = false;
  componentName: string = 'Workers';

  constructor() {}
}
