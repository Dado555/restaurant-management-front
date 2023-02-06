import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItemService } from '../../../services/menu-item/menu-item.service';
import { OrderService } from '../../../services/order/order.service';
import { UsersService } from '../../../services/users/users.service';
import { OrderItemService } from '../../../services/order-item/order-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [
    './admin-dashboard.component.scss',
    '../../../../vendor/chartist/css/chartist.min.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/jqvmap/css/jqvmap.min.css',
  ],
})
export class AdminDashboardComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  menuItemsCount: Number = -1;
  ordersCount: Number = -1;
  workersCount: Number = -1;
  profit: Number = -1;
  newOrdersCount: Number = -1;
  ordersCountForNDays: number[] = [];
  percentagesForOrdersCount: number[] = [];
  incomeAndExpense: number[] = [0, 0];
  incomeAndExpenseLists: Array<Array<number>> = [];
  incomes: Array<number> = [];
  expenses: Array<number> = [];
  ordersCountForLastNDays: number[] = [];

  constructor(
    private menuItemService: MenuItemService,
    private orderService: OrderService,
    private userService: UsersService,
    private orderItemService: OrderItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMenuItemsCount();
    this.getOrdersCount();
    this.getWorkersCount();
    this.getProfit();
    this.getNewOrdersCount();
    this.getOrdersCountForNDays(30);
    this.getIncomeAndExpenseNumber(30);
    this.getOrdersCountForNLastDays(30);
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  public getMenuItemsCount() {
    this.menuItemService.getMenuItemsCount().subscribe((data) => {
      this.menuItemsCount = data;
      console.log(this.menuItemsCount);
    });
  }

  public getOrdersCount() {
    this.orderService.getOrdersCount().subscribe((data) => {
      this.ordersCount = data;
      console.log(this.ordersCount);
    });
  }

  public getWorkersCount() {
    this.userService.getWorkersCount().subscribe((data) => {
      this.workersCount = data;
      console.log(this.ordersCount);
    });
  }

  public getProfit() {
    this.orderItemService.getProfit().subscribe((data) => {
      this.profit = data;
      console.log(this.profit);
    });
  }

  public getNewOrdersCount() {
    this.orderService.getNewOrdersCount().subscribe((data) => {
      this.newOrdersCount = data;
      console.log(this.newOrdersCount);
    });
  }

  private calcPercentagesForOrdersCount() {
    let sum = 0.0;
    for (let i = 0; i < this.ordersCountForNDays.length; i++) {
      sum += this.ordersCountForNDays[i].valueOf();
    }
    for (let i = 0; i < this.ordersCountForNDays.length; i++) {
      this.percentagesForOrdersCount[i] = Number(
        ((this.ordersCountForNDays[i].valueOf() / sum) * 100).toPrecision(4)
      );
    }
  }

  public getOrdersCountForNDays(days: number) {
    this.percentagesForOrdersCount = [];
    this.orderService.getOrdersCountForNDays(days).subscribe((data) => {
      this.ordersCountForNDays = data;
      this.calcPercentagesForOrdersCount();
      console.log(this.ordersCountForNDays);
      console.log(this.percentagesForOrdersCount);
    });
  }

  public setIncomesAndExpenses(list: number[][][]) {
    let incomes: Array<number> = [];
    let expenses: Array<number> = [];
    for (let i = 0; i < list.length; i++) {
      let val = list[i];
      if (val.length == 0) {
        incomes[i] = 0;
        expenses[i] = 0;
      } else {
        let inc = 0,
          exp = 0;
        for (let j = 0; j < list[i].length; j++) {
          inc += list[i][j][0];
          exp += list[i][j][1];
        }
        incomes[i] = inc;
        expenses[i] = exp;
      }
    }
    this.incomes = incomes;
    this.expenses = expenses;
  }

  public getIncomeAndExpenseNumber(days: number) {
    this.incomeAndExpense = [0, 0];
    this.orderService.getIncomesAndExpensesForNDays(days).subscribe((data) => {
      console.log(data);
      this.setIncomesAndExpenses(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].length > 0) {
          for (let j = 0; j < data[i].length; j++) {
            this.incomeAndExpense[0] += data[i][j][0];
            this.incomeAndExpense[1] += data[i][j][1];
          }
        }
      }
      console.log(this.incomeAndExpense);
    });
  }

  gotoList(item: string) {
    switch (item) {
      case 'Dashboard':
        this.router.navigate(['/admin']);
        break;
      case 'Analytics':
        this.router.navigate(['/admin/analytics']);
        break;
      case 'Workers':
        this.router.navigate(['/admin/workers']);
        break;
      case 'Orders':
        this.router.navigate(['/admin/orders']);
        break;
      case 'Menu items':
        this.router.navigate(['/admin/menu-items']);
        break;
    }
  }

  toggleSidenavFunc() {
    console.log('SIDENAV TOGGLE');
    this.toggleSidenav.emit();
  }

  public getOrdersCountForNLastDays(days: number) {
    this.orderService.getOrdersCountForLastNDays(days).subscribe((data) => {
      this.ordersCountForLastNDays = data;
      console.log(this.ordersCountForLastNDays);
    });
  }
}
