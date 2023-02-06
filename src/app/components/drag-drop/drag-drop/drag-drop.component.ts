declare var require: any;

import {
  Component,
  OnInit,
  Input,
  Renderer2,
  OnDestroy,
  AfterViewChecked,
} from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router } from '@angular/router';
import { RestaurantTableService } from 'src/app/services/table/restaurant-table/restaurant-table.service';
import { Table } from 'src/app/model/table';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderInfo } from 'src/app/model/orderInfo';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';

// import {PlainDraggable} from './plain-draggable.esm.js'

// declare const PlainDraggable: any;
const PlainDraggable = require('./plain-draggable.esm.js');

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class DragDropComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() sectorId?: number;
  @Input() editMode: boolean = false;
  tablesData: Table[] = [];
  initializedDragable: boolean = false;
  allOrders: OrderInfo[] = [];

  allTables: any[] = [];

  selectedTable: Table | null = null;

  initializedTables: Map<String, boolean> = new Map();
  waiterEvent?: Subscription;

  constructor(
    private location: Location,
    private router: Router,
    private restaurantTableService: RestaurantTableService,
    private renderer: Renderer2,
    private orderService: OrderService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.loadTablesData();
    this.subscribeToEvents();
  }
  ngOnDestroy(): void {
    this.waiterEvent?.unsubscribe();
  }

  subscribeToEvents() {
    this.waiterEvent = this.notificationService.WaiterEvent.subscribe(() => {
      this.router
        .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['waiter/home']);
        });
    });
  }

  loadTablesData() {
    if (this.sectorId === undefined) return;

    this.restaurantTableService
      .getAllTablesInSectors(this.sectorId)
      .subscribe((data) => {
        this.tablesData = data;
        this.loadActiveOrders();
      });

    this.initDraggable();
  }

  ngAfterViewChecked() {
    this.initDraggable();
  }

  addTablesInDOM(tables: Table[]) {
    let tableCanvas = document.getElementById('tables-canvas')?.firstChild;

    tables.forEach((tableData) => {
      // <div class="draggable-table" id="draggable">Sto 1</div>
      let tableElement = this.renderer.createElement('div');
      tableElement.className = 'draggable-table';
      tableElement.innerText = '{{2+2}}Sto: ' + tableData.id;
      tableElement.id = 'table-id-' + tableData.id;
      tableElement.style.width = tableData.tableWidth + 'px';
      tableElement.style.height = tableData.tableHeight + 'px';
      tableElement.style.left = tableData.positionX + 'px';
      tableElement.style.top = tableData.positionY + 'px';
      tableElement.tableId = tableData.id;
      this.allTables.push(tableElement);
      tableCanvas?.appendChild(tableElement);
    });
  }

  selectTable(table: Table | null, event: Event) {
    event.stopPropagation();
    this.selectedTable = table;
  }

  initDraggable() {
    let elements = document.getElementsByClassName('draggable-table');

    const self = this;
    [].forEach.call(elements, function (element: Element) {
      if (self.initializedTables.get(element.id)) return;
      self.initializedTables.set(element.id, true);

      let draggable = new PlainDraggable.default(element);

      draggable.snap = { step: 25 };
      // element.addEventListener("onclick", self.onClickTable.bind(self,self));

      draggable.autoScroll = {
        target: document.getElementById('tables-canvas'),
      };
      // draggable.onDragStart = self.onClickTable.bind(draggable,self);

      draggable.disabled = !self.editMode;
      draggable.handle = element.getElementsByClassName('handle')[0];
    });
  }

  initElementDragable(element: any) {
    console.log(element);

    let draggable = new PlainDraggable.default(element);

    draggable.snap = { step: 25 };
    // element.addEventListener("onclick", self.onClickTable.bind(self,self));

    draggable.autoScroll = { target: document.getElementById('tables-canvas') };
    // draggable.onDragStart = self.onClickTable.bind(draggable,self);

    draggable.disabled = !this.editMode;
  }

  onClickTable(table: Table, event: Event) {
    if (this.editMode) {
      event.stopPropagation();
    } else {
      let draggable: any = this;
      let order = this.allOrders.find(
        (o: OrderInfo) => o.table.id === table.id
      );
      if (order) this.router.navigate(['waiter/table/' + table.id]);
      else this.router.navigate(['waiter/table/' + table.id + '/add']);
    }

    this.selectTable(table, event);
  }

  loadActiveOrders() {
    this.orderService.getActiveOrders().subscribe((data) => {
      this.allOrders = data;
      this.mergeTablesAndOrders();
    });
  }

  mergeTablesAndOrders() {
    this.allTables.forEach((table) => {
      let order = this.allOrders.find((x) => x.table.id === table.tableId);
      table.order = order;

      if (order) {
        table.innerText = order.status;
        table.style.background = this.getTableColor(order);
      } else {
        table.innerText = 'Sto ' + table.tableId;
      }
    });

    this.tablesData.forEach((table) => {
      let order = this.allOrders.find((x) => x.table.id === table.id);
      if (!order) return;
      table.orderObj = order;
    });
  }

  getTableColor(order: OrderInfo) {
    let user = this.authenticationService.getLoggedUser();
    let userId = user.id;

    if (order.waiter.id !== userId) return '#aaa';
    if (order.status == 'READY') return 'green';
    if (order.status == 'FOR_PREPARATION') return 'yellow';
    if (order.status == 'IN_PROGRESS') return 'orange';
    if (order.status == 'DELIVERED') return 'green';
    return '#ffffff';
  }

  addTable() {
    if (!this.sectorId) return;

    let newTable: Table = {
      id: Math.round(Math.random() * 50000) + 50000,
      tableNumber: this.getFirstNextTableNumber(),
      numberOfSeats: 4,
      sectorName: '',
      sectorId: this.sectorId,
      positionX: 500,
      positionY: 100,
      tableWidth: 100,
      tableHeight: 100,
      orderObj: undefined,
      pseudoId: true,
    };

    this.tablesData.push(newTable);
  }

  updateTransformedPosition() {
    this.tablesData.forEach((table) => {
      let element: HTMLElement | null = document.getElementById(
        'table-id-' + table.id
      );
      if (!element) return;
      let transformMatrix = new WebKitCSSMatrix(element.style.transform);

      let l = element.style.left;
      let t = element.style.top;
      let lint = Number(l.replace('px', ''));
      let tint = Number(t.replace('px', ''));

      lint += Number(transformMatrix.m41);
      tint += Number(transformMatrix.m42);

      table.positionX = Number(lint);
      table.positionY = Number(tint);
      element.style.transform = '';
    });

    let elements = document.getElementsByClassName('draggable-table');

    const self = this;
    [].forEach.call(elements, function (element: Element) {
      if (self.initializedTables.get(element.id)) return;
    });
  }

  saveTables() {
    this.updateTransformedPosition();

    let data: Table[] = JSON.parse(JSON.stringify(this.tablesData));

    data.forEach((element) => {
      if (element.pseudoId) element.id = undefined;
    });
    data = data.filter((x) => {
      if (x.id == null && x.active === false) return false;
      return true;
    });

    this.restaurantTableService.saveTables(data).subscribe((data) => {
      console.log(data);
    });
  }

  removeTable(table: Table) {
    let index = this.tablesData.indexOf(table);
    table.active = false;
    // this.tablesData.splice(index, 1);
  }

  orderStatusLabel(status: string) {
    if (status === 'FOR_PREPARATION') return 'Pred pripremu';
    if (status === 'IN_PROGRESS') return 'Priprema';
    if (status === 'READY') return 'Spremnno';
    if (status === 'DELIVERED') return 'Dostavljeno';
    if (status === 'FINISHED') return 'Zavrseno';

    return status;
  }

  getFirstNextTableNumber() {
    let tableNumber = 1;

    let again = true;
    while (again) {
      again = false;
      this.tablesData.forEach((table) => {
        if (tableNumber == table.tableNumber && table.active !== false) {
          again = true;
          tableNumber += 1;
        }
      });
    }
    return tableNumber;
  }

  isMyTable(table: Table) {
    let user = this.authenticationService.getLoggedUser();
    let userId = user.id;

    if (table.orderObj?.waiter?.id == userId) return true;
    return false;
  }
}
