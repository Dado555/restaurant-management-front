import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Sector } from 'src/app/model/sector';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { RestaurantTableService } from 'src/app/services/table/restaurant-table/restaurant-table.service';

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.component.html',
  styleUrls: ['./waiter-home.component.scss'],
})
export class WaiterHomeComponent implements OnInit {
  componentName: string = 'WaiterHomeComponent';
  opened: boolean = false;

  tabBackgorund: ThemePalette = 'primary';

  tableSections: Sector[] = [];

  waiterEvent?: Subscription;

  constructor(private restaurantTableService: RestaurantTableService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.restaurantTableService.getAllSectors().subscribe((data) => {
      this.tableSections = data;
      console.log(this.tableSections);
    });
  }
}
