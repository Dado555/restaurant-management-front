import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event } from 'jquery';
import { OrderCreate } from 'src/app/model/dto/ordercreate';
import { OrderItemInOrderCreate } from 'src/app/model/dto/orderiteminordercreate';
import { MenuItem } from 'src/app/model/menuItem';
import { MenuItemCategory } from 'src/app/model/menuItemCategory';
import { MenuItemService } from 'src/app/services/menu-item/menu-item.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss'],
})
export class AddItemsComponent implements OnInit {
  componentName: string = 'AddItemsComponent';
  opened: boolean = false;

  tableId: number | undefined = undefined;
  menuItems: MenuItem[] = [];
  categories: MenuItemCategory[] = [];
  cart: Map<number, OrderItemInOrderCreate> = new Map<
    number,
    OrderItemInOrderCreate
  >();
  loadingOrderSubmit: boolean = false;

  constructor(
    private menuItemService: MenuItemService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAllCategories();
    this.loadAllMenuItems();
    this.tableId = Number(this.route.snapshot.paramMap.get('id'));
  }

  loadAllMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe((data) => {
      this.menuItems = data;
    });
  }

  goToTable() {
    this.router.navigate(['waiter/table/' + this.tableId]);
  }
  goToAllTables() {
    this.router.navigate(['/waiter/home']);
  }

  loadMenuItemsByCategory(categoryId: number) {
    this.menuItemService
      .getAllMenuItemsByCategory(categoryId)
      .subscribe((data) => {
        this.menuItems = data;
      });
  }

  loadAllCategories() {
    this.menuItemService.getAllMenuItemCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  categoryClick(category: MenuItemCategory) {
    this.loadMenuItemsByCategory(category.id);
  }

  addToCart(item: MenuItem) {
    if (!this.cart.has(item.id)) {
      let newItem: OrderItemInOrderCreate = {
        menuItemId: item.id,
        menuItem: item,
        amount: 0,
        status: 'FOR_PREPARATION',
        description: '',
      };

      this.cart.set(item.id, newItem);
    }
    let cartItem = this.cart.get(item.id);
    if (cartItem) cartItem.amount += 1;

    console.log(this.cart);
  }

  getTotal() {
    let total = 0;

    this.cart.forEach((value: OrderItemInOrderCreate, key: number) => {
      let itemTotal = value.amount * value.menuItem.price.value;
      total += itemTotal;
    });
    return total;
  }

  changeItemCartStatus(menuItemId: number) {
    let item = this.cart.get(menuItemId);
    if (!item) {
      console.error('Nema itema??');
      return;
    }

    if (item.status == 'FOR_PREPARATION') item.status = 'AWAITING_APPROVAL';
    else item.status = 'FOR_PREPARATION';
  }

  removeItemFromCart(menuItemId: number) {
    let item = this.cart.get(menuItemId);
    if (!item) {
      console.error('Nema itema??');
      return;
    }

    this.cart.delete(menuItemId);
  }

  createOrder() {
    console.log('CREATE ORDER');
    this.loadingOrderSubmit = true;
    if (!this.tableId) return;

    let orderItems: OrderItemInOrderCreate[] = Array.from(this.cart.values());
    let orderCreateDTO: OrderCreate = {
      tableId: this.tableId,
      waiterId: this.authenticationService.getLoggedUser().id,
      orderItems: orderItems,
    };

    this.orderService.createOrders(orderCreateDTO).subscribe((data) => {
      this.loadingOrderSubmit = false;
      this.router.navigate(['waiter/table/' + this.tableId]);
    });
  }
}
