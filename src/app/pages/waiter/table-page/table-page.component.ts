import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderInfo } from 'src/app/model/orderInfo';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderItemService } from 'src/app/services/order-item/order-item.service';
import { Subscription } from 'rxjs';
import { OrderItemInfo } from 'src/app/model/orderItemInfo';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit, OnDestroy {
  componentName: string = 'TablePageComponent';
  opened: boolean = false;

  routeSub: any;
  tableId: number = 0;
  orders: OrderInfo[] = [];
  dataSource!: MatTableDataSource<OrderInfo>;
  displayedColumns: string[] = [
    'name',
    'preparationTime',
    'currentPrice',
    'amount',
    'status',
    'changeStatus',
    'remove',
  ];

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private orderItemService: OrderItemService
  ) {
    this.dataSource = new MatTableDataSource(this.orders);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.routeSub = this.route.params.subscribe((params) => {
      this.tableId = params['id'];
    });

    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  goToTables() {
    this.router.navigate(['waiter/home']);
  }

  loadData() {
    this.orderService
      .getOrdersWithOrderItemsForTable(this.tableId)
      .subscribe((data) => {
        this.orders = data;
        this.orders.forEach((o) =>
          o.orderItems.sort((oi1, oi2) => (oi2.status > oi1.status ? 1 : -1))
        );
      });
  }

  addItemIntoOrder() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  public handleOrderItem(orderItem: OrderItemInfo) {
    if (!orderItem.id) return;

    if (orderItem.status === 'AWAITING_APPROVAL')
      this.markOrderItemAsForPreparation(orderItem.id);
    else if (orderItem.status === 'FOR_PREPARATION')
      this.markOrderItemAsAwaitingApproval(orderItem.id);
    else this.deliverOrderItem(orderItem.id);
  }

  public markOrderItemAsForPreparation(id: number) {
    this.orderItemService
      .markOrderItemAsForPreparation(id)
      .subscribe((data) => {
        this.loadData();
      });
  }

  markOrderItemAsAwaitingApproval(id: number) {
    this.orderItemService
      .markOrderItemAsAwaitingApproval(id)
      .subscribe((data) => {
        this.loadData();
      });
  }

  public deliverOrderItem(id: number) {
    this.orderItemService.markOrderItemAsDelivered(id).subscribe((data) => {
      this.loadData();
    });
  }

  public removeOrderItem(id: number) {
    this.orderItemService.removeOrderItem(id).subscribe((data) => {
      this.loadData();
    });
  }

  public getTotalPrice(orderItems: OrderItemInfo[]) {
    let retVal = 0;
    orderItems.forEach((item) => {
      retVal += item.menuItem.price.value * item.amount;
    });
    return retVal;
  }

  public checkout(id: number) {
    this.orderService.checkoutOrder(id).subscribe((data) => {
      this.loadData();
      this.router.navigate(['/waiter/home']);
    });
  }

  public getColorForStatus(status: string) {
    if (status === 'AWAITING_APPROVAL') return 'btn btn-sm dark fs-16 btn-dark';
    else if (status === 'FOR_PREPARATION')
      return 'btn btn-sm dark fs-16 btn-warning';
    else if (status === 'IN_PROGRESS') return 'btn btn-sm dark fs-16 btn-info';
    else if (status === 'READY') return 'btn btn-sm dark fs-16 btn-success';
    else return 'btn btn-sm dark fs-16 btn-secondary';
  }

  public getColorForChangeStatus(status: string) {
    if (status === 'AWAITING_APPROVAL')
      return 'btn btn-sm light fs-16 btn-warning';
    else if (status === 'FOR_PREPARATION')
      return 'btn btn-sm light fs-16 btn-dark';
    else if (status === 'READY')
      return 'deliver-btn btn btn-sm light fs-16 btn-dark-green';
    else return '';
  }

  public getTextButtonForStatus(status: string) {
    if (status === 'AWAITING_APPROVAL') return 'APPROVE';
    else if (status === 'FOR_PREPARATION') return 'HOLD';
    else if (status === 'READY') return 'DELIVER';
    else return '';
  }
}
