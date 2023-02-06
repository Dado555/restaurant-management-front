import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { OrderInfo } from 'src/app/model/orderInfo';
import { OrderService } from 'src/app/services/order/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
// import '../../../vendor/datatables/js/jquery.dataTables.min.js';

// declare const addPagination: any;
// declare var $: any;
//declare var jQuery: any;

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: [
    './orders-list.component.scss',
    '../../../../vendor/chartist/css/chartist.min.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/jqvmap/css/jqvmap.min.css',
  ],
})
export class OrdersListComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  orders!: Observable<any>;
  ordersList: OrderInfo[] = [];
  activeStatus: string = '';
  displayedColumns: string[] = [
    'orderId',
    'date',
    'workerName',
    'sector',
    'statusOrder',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  searchInput: string = '';
  dateFrom: string = '';
  dateTo: string = '';
  startDate: number = -1;
  endDate: number = -1;
  rangeDate = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(
    private orderService: OrderService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    //this.addPagination();
    this.getOrders();
    // @ts-ignore
    this.rangeDate.get('start').valueChanges.subscribe((x) => {
      this.startDate = new Date(x).getTime();
      if (this.endDate > -1) this.getOrders();
    });
    // @ts-ignore
    this.rangeDate.get('end').valueChanges.subscribe((x) => {
      this.endDate = new Date(x).getTime();
      this.filterByDate();
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // filterForPreparation() {
  //   this.getOrders("FOR_PREPARATION");
  //   this.activeStatus = "For Preparation";
  // }

  // filterInProgress() {
  //   this.getOrders("IN_PROGRESS");
  //   this.activeStatus = "In Progress";
  // }

  // filterReady() {
  //   this.getOrders("READY");
  //   this.activeStatus = "Ready";
  // }

  retSort() {
    const sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'orderId':
          return item.id;
        case 'date':
          return item.date;
        case 'workerName':
          return item.waiter.firstName;
        case 'sector':
          return item.table.sectorName;
        case 'statusOrder':
          return item.status;
        default:
          return item.id;
      }
    };
    return sortingDataAccessor;
  }

  getOrders(filter = '') {
    this.orderService.getAllOrders().subscribe((data) => {
      this.ordersList = data;
      if (filter) {
        this.activeStatus = filter;
        this.ordersList = this.ordersList.filter(
          (order) => order.status === filter
        );
      } else this.activeStatus = 'All Status';
      this.dataSource = new MatTableDataSource<OrderInfo>(this.ordersList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = this.retSort();
      this.orders = this.dataSource.connect();
    });
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  toggleSidenavFunc() {
    console.log('SIDENAV TOGGLE');
    this.toggleSidenav.emit();
  }

  public getColorForOrderStatus(status: string) {
    if (status === 'FOR_PREPARATION')
      return 'btn btn-sm dark fs-16 btn-warning';
    else if (status === 'IN_PROGRESS') return 'btn btn-sm dark fs-16 btn-info';
    else if (status === 'READY') return 'btn btn-sm dark fs-16 btn-success';
    else if (status === 'DELIVERED')
      return 'btn btn-sm dark fs-16 btn-dark-green';
    else return 'btn btn-sm dark fs-16 btn-secondary';
  }

  /*
  addPagination() {
    (function($) {

      var table = (<any>$('#example5')).DataTable({
        searching: false,
        paging:true,
        select: false,
        //info: false,
        lengthChange:false

      });
      $('#example tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();

      });

    })(jQuery)
  };
  */

  public searchItems() {
    this.orderService.getAllOrders().subscribe((data) => {
      this.ordersList = data;
    });
    if (this.searchInput !== '') {
      this.ordersList = this.ordersList.filter((order) => {
        let search = this.searchInput.toLowerCase().trim();
        if (order.waiter.firstName.toLowerCase().trim().search(search) != -1)
          return true;
        else if (
          order.waiter.lastName.toLowerCase().trim().search(search) != -1
        )
          return true;
        else if (
          order.table.sectorName.toLowerCase().trim().search(search) != -1
        )
          return true;
        else if (order.status.toLowerCase().trim().search(search) != -1)
          return true;
        return false;
      });
      this.dataSource = new MatTableDataSource<OrderInfo>(this.ordersList);
      this.dataSource.paginator = this.paginator;
      this.orders = this.dataSource.connect();
      this.dataSource.sortingDataAccessor = this.retSort();
    } else this.getOrders();
  }

  public filterByDate() {
    this.ordersList = this.ordersList.filter((order) => {
      console.log(
        'Start : ' +
          this.startDate +
          ', end: ' +
          this.endDate +
          '; DATE: ' +
          order.date
      );
      return order.date > this.startDate && order.date < this.endDate;
    });
    this.dataSource = new MatTableDataSource<OrderInfo>(this.ordersList);
    this.dataSource.paginator = this.paginator;
    this.orders = this.dataSource.connect();
    this.dataSource.sortingDataAccessor = this.retSort();
  }
}
