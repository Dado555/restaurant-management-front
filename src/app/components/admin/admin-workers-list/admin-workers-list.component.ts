import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AddWorkerFormComponent } from '../../modals/add-worker-form/add-worker-form.component';
import { UserInfo } from 'src/app/model/userInfo';
import { UsersService } from 'src/app/services/users/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-workers-list',
  templateUrl: './admin-workers-list.component.html',
  styleUrls: [
    './admin-workers-list.component.scss',
    '../../../../vendor/chartist/css/chartist.min.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/jqvmap/css/jqvmap.min.css',
  ],
})
export class AdminWorkersListComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  workers: UserInfo[] = [];
  workersFilter: UserInfo[] = [];
  user = JSON.parse(localStorage.getItem('user-data') as string);
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'username',
    'empty',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  searchInput: string = '';
  workerType: string = 'All workers';

  constructor(
    private simpleModalService: SimpleModalService,
    private usersService: UsersService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getWorkers();
  }

  retSort() {
    const sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'firstName':
          return item.firstName;
        case 'lastName':
          return item.lastName;
        case 'phone':
          return item.phoneNumber;
        case 'username':
          return item.username;
        default:
          return item.firstName;
      }
    };
    return sortingDataAccessor;
  }

  getWorkers() {
    this.usersService.getAllUsers().subscribe((data) => {
      this.workers = data;
      this.dataSource = new MatTableDataSource<UserInfo>(this.workers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = this.retSort();
      // console.log(this.workers);
    });
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  toggleSidenavFunc() {
    console.log('SIDENAV TOGGLE');
    this.toggleSidenav.emit();
  }

  deleteWorker(worker: UserInfo) {
    this.usersService.deleteWorker(worker.id as number).subscribe((data) => {
      this.getWorkers();
    });
  }

  openEditForm(worker: UserInfo) {
    let disposable = this.simpleModalService
      .addModal(AddWorkerFormComponent, {
        title: 'Edit Worker',
        message: 'Edit Worker',
        working_user: worker,
      })
      .subscribe((isConfirmed) => {
        this.getWorkers();
        console.log('confirmed ' + isConfirmed);
      });
  }

  openAddForm() {
    let disposable = this.simpleModalService
      .addModal(AddWorkerFormComponent, {
        title: 'Create Worker',
        message: 'Create Worker',
        working_user: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          username: '',
          password: '',
          role: '',
          salary: '',
        },
      })
      .subscribe((isConfirmed) => {
        this.getWorkers();
        console.log('confirmed modal ' + isConfirmed);
      });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    //setTimeout(()=>{
    //disposable.unsubscribe();
    //},10000);
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

  public searchItems() {
    if (this.searchInput !== '') {
      this.workers = this.workers.filter((worker) => {
        let search = this.searchInput.toLowerCase().trim();
        if (worker.firstName.toLowerCase().trim().search(search) != -1)
          return true;
        else if (worker.lastName.toLowerCase().trim().search(search) != -1)
          return true;
        else if (worker.phoneNumber.toLowerCase().trim().search(search) != -1)
          return true;
        else if (worker.username.toLowerCase().trim().search(search) != -1)
          return true;
        return false;
      });
      this.dataSource = new MatTableDataSource<UserInfo>(this.workers);
      this.dataSource.paginator = this.paginator;
      this.workers = this.dataSource.connect();
      this.dataSource.sortingDataAccessor = this.retSort();
    } else this.getWorkers();
  }

  public filterWorkerType(type: string) {
    this.workerType = type;
    if (type === 'All workers') {
      this.workersFilter = this.workers;
    } else {
      this.workersFilter = this.workers.filter((worker) => {
        return (
          worker.role.toLowerCase() === type.toLowerCase().trim().slice(0, -1)
        );
      });
    }
    this.dataSource = new MatTableDataSource<UserInfo>(this.workersFilter);
    this.dataSource.paginator = this.paginator;
    this.workersFilter = this.dataSource.connect();
    this.dataSource.sortingDataAccessor = this.retSort();
  }
}
