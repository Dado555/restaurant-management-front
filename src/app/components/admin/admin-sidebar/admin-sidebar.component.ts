import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: [
    './admin-sidebar.component.scss',
    '../../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
    '../../../../vendor/chartist/css/chartist.min.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/jqvmap/css/jqvmap.min.css',
  ],
})
export class AdminSidebarComponent implements OnInit {
  @Input() currentComponent: string = 'Dashboard';
  listItemStyle: string = 'default-list-item';
  events: string[] = [];
  colors: Map<string, string> = new Map<string, string>();
  opened: boolean = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.markSelected(this.currentComponent);
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  initializeMap() {
    this.colors = new Map([
      ['Dashboard', '#7e7e7e'],
      ['Analytics', '#7e7e7e'],
      ['Workers', '#7e7e7e'],
      ['Orders', '#7e7e7e'],
      ['Menu items', '#7e7e7e'],
    ]);
  }

  markSelected(item: string) {
    this.initializeMap();
    this.colors.set(item, 'blue');
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
      case 'Table layout':
        this.router.navigate(['/admin/table-layout']);
        break;
    }
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  /*
  selectItem(item: string, list: any) {
    this.cleanItems(list);
    this.setItemClicked(list, item);
    this.gotoList(item);
  }

  listItemClicked(item: any) {
    console.log(item);
    let list = document.getElementById("menu")?.getElementsByTagName("li");
    this.selectItem(item, list);
  }

  cleanItems(list: HTMLCollection) {
    if(list) {
      for(let i = 0; i < list.length; i++) {
        list[i].classList.remove('default-list-item');
        list[i].classList.remove('clicked-list-item');
      }
    }
  }

  setItemClicked(list: HTMLCollection, item:string) {
    for(let i = 0; i < list.length; i++) {
      if(list[i].textContent === item) {
        list[i].classList.add('clicked-list-item');
        this.colors[i] = 'blue';
      }
      else {
        list[i].classList.add('default-list-item');
        this.colors[i] = '#7e7e7e';
      }
    }
  }
  */
}
