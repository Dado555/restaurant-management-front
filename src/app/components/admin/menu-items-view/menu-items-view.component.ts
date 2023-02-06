import {Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef} from '@angular/core';
import { SimpleModalService } from "ngx-simple-modal";
import { MenuItem } from 'src/app/model/menuItem';
import { MenuItemService } from 'src/app/services/menu-item/menu-item.service';
import { AddMenuItemFormComponent } from '../../modals/add-menu-item-form/add-menu-item-form.component';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import {MenuItemCategory} from "../../../model/menuItemCategory";

@Component({
  selector: 'app-menu-items-view',
  templateUrl: './menu-items-view.component.html',
  styleUrls: ['./menu-items-view.component.scss', '../../../../styles/template/css/style.css',
  '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css']
})
export class MenuItemsViewComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  menuItems!: Observable<any>;
  menuItemsList: MenuItem[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any;
  categories?: MenuItemCategory[];
  selectedCat?: number;
  filterType: string = "All items";
  currSort: string = '';
  currSortType: string = '';
  searchInput: string = '';
  elNumber: number = -1;

  constructor(private simpleModalService:SimpleModalService, private menuItemService: MenuItemService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.getMenuItems();
    this.loadAllCategories();
  }

  getMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe(data => {
        // this.menuItems = data;
        console.log(this.menuItems);
        this.dataSource = new MatTableDataSource<MenuItem>(data);
        this.dataSource.paginator = this.paginator;
        this.menuItems = this.dataSource.connect();
        this.menuItemsList = data;
        this.elNumber = data.length;
        console.log("BROJ: ");
        console.log(this.elNumber);

        console.log("MENU ITEMS :");
        console.log(this.menuItems);
        console.log(this.menuItemsList);
    });
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  toggleSidenavFunc() {
    console.log("SIDENAV TOGGLE");
    this.toggleSidenav.emit();
  }

  openAddForm() {
    let disposable = this.simpleModalService.addModal(AddMenuItemFormComponent, {
      title: 'Create Menu Item',
      message: 'Create Menu Item',
    })
      .subscribe((isConfirmed)=>{
        if(isConfirmed) {
          this.getMenuItems();
        }
      });
  }

  openUpdateForm(item: MenuItem) {
    console.log("MENU ITEMS: ");
    console.log(item);
    console.log(this.menuItemsList);
    console.log(this.menuItems);
    let disposable = this.simpleModalService.addModal(AddMenuItemFormComponent, {
      title: 'Update Menu Item',
      message: 'Update Menu Item',
      editMenuItem: item,
      editMode: true,
    })
      .subscribe((isConfirmed)=>{
        if(isConfirmed)
          this.getMenuItems();
      });
  }

  loadMenuItemsByCategory(categoryId:number) {
    if(categoryId == -1)
      this.getMenuItems();
    else {
      this.menuItemService.getAllMenuItemsByCategory(categoryId).subscribe(data => {
        this.dataSource = new MatTableDataSource<MenuItem>(data);
        this.dataSource.paginator = this.paginator;
        this.menuItems = this.dataSource.connect();
        console.log(this.menuItems);
        this.menuItemsList = data;
      })
    }
  }

  loadAllCategories() {
    this.menuItemService.getAllMenuItemCategories().subscribe(data => {
      this.categories = data;
      this.categories.push({id: -1, name: "All items"});
      console.log(this.categories);
    })
  }

  public sortItems(by:string) {
    if(by === 'name' && (this.currSortType === 'desc' || this.currSortType === '')) {
      this.currSort = by; this.currSortType = 'asc';
      this.menuItemsList.sort((a,b) => (a.item.name > b.item.name ? 1 : -1));
    } else if (by === 'name' && this.currSortType === 'asc') {
      this.currSort = by; this.currSortType = 'desc';
      this.menuItemsList.sort((a,b) => (a.item.name > b.item.name ? -1 : 1));
    } else if (by === 'price' && (this.currSortType === 'desc' || this.currSortType === '')) {
      this.currSort = by; this.currSortType = 'asc';
      this.menuItemsList.sort((a,b) => (a.price.value > b.price.value ? 1 : -1));
    } else if (by === 'price' && this.currSortType === 'asc') {
      this.currSort = by; this.currSortType = 'desc';
      this.menuItemsList.sort((a,b) => (a.price.value > b.price.value ? -1 : 1));
    }
    this.dataSource = new MatTableDataSource<MenuItem>(this.menuItemsList);
    this.dataSource.paginator = this.paginator;
    this.menuItems = this.dataSource.connect();
  }

  public searchItems() {
    if(this.searchInput !== '') {
      this.menuItemsList = this.menuItemsList.filter(menuItem => menuItem.item.name.toLowerCase().trim().search(this.searchInput.toLowerCase().trim()) != -1);
      this.dataSource = new MatTableDataSource<MenuItem>(this.menuItemsList);
      this.dataSource.paginator = this.paginator;
      this.menuItems = this.dataSource.connect();
    } else this.getMenuItems();
  }
}
