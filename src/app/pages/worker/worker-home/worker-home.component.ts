import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderInfo } from 'src/app/model/orderInfo';
import { OrderItemInfo } from 'src/app/model/orderItemInfo';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { OrderItemService } from 'src/app/services/order-item/order-item.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-worker-home',
  templateUrl: './worker-home.component.html',
  styleUrls: ['./worker-home.component.scss'],
})
export class WorkerHomeComponent implements OnInit, OnDestroy {
  newOrders: OrderInfo[] = [];
  acceptedOrders: OrderInfo[] = [];

  step = 0;
  dataSourceForNewOrders: MatTableDataSource<OrderInfo>;
  dataSourceForAcceptedOrders: MatTableDataSource<OrderInfo>;

  displayedColumns: string[] = [
    'name',
    'amount',
    'currentPrice',
    'preparationTime',
    'changeStatus',
  ];

  cookEvent?: Subscription;
  bartenderEvent?: Subscription;

  @ViewChild(MatSort, { static: true })
  sortForNewOrders: MatSort = new MatSort();

  @ViewChild(MatSort, { static: true })
  sortForAcceptedOrders: MatSort = new MatSort();

  constructor(
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private notificationService: NotificationService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.dataSourceForNewOrders = new MatTableDataSource(this.newOrders);
    this.dataSourceForAcceptedOrders = new MatTableDataSource(
      this.acceptedOrders
    );
  }

  ngOnInit(): void {
    this.loadData();
    this.dataSourceForNewOrders.sort = this.sortForNewOrders;
    this.dataSourceForAcceptedOrders.sort = this.sortForAcceptedOrders;
    this.subscribeToEvents();
  }

  ngOnDestroy() {
    this.cookEvent?.unsubscribe();
    this.bartenderEvent?.unsubscribe();
  }

  subscribeToEvents() {
    if (this.authService.getUserRole() == 'COOK')
      this.cookEvent = this.notificationService.CookEvent.subscribe((data) => {
        // this.loadData();
        this.acceptedOrders = [];
        this.newOrders = [];

        this.router
          .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['worker/home']);
          });
      });
    else {
      this.bartenderEvent = this.notificationService.BartenderEvent.subscribe(
        (data) => {
          // this.loadData();

          this.acceptedOrders = [];
          this.newOrders = [];

          this.router
            .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['worker/home']);
            });
        }
      );
    }
  }

  loadData() {
    this.loadNewOrders();
    this.loadAcceptedOrders();
  }

  loadNewOrders() {
    this.orderService.getNewOrders().subscribe((data) => {
      this.newOrders = data;
    });
  }

  loadAcceptedOrders() {
    this.orderService.getAcceptedOrders().subscribe((data) => {
      this.acceptedOrders = data;
    });
  }

  takeOrderItem(id: number) {
    this.orderItemService.takeOrderItem(id).subscribe((data) => {
      this.loadNewOrders();
      this.loadAcceptedOrders();
    });
  }

  markOrderItemAsReady(id: number) {
    this.orderItemService.markOrderItemAsReady(id).subscribe((data) => {
      this.loadAcceptedOrders();
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
