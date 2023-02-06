import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { MenuItemCreate } from '../../../model/createMenuItem';
import { MenuItemCategory } from '../../../model/menuItemCategory';
import { MenuItemCategoryService } from '../../../services/menu-item-category/menu-item-category.service';
import { MenuItemService } from '../../../services/menu-item/menu-item.service';
import { Router } from '@angular/router';
import { MenuItem } from '../../../model/menuItem';

export interface ConfirmModel {
  title: string;
  message: string;
  editMenuItem?: MenuItem;
  editMode?: boolean;
}

@Component({
  selector: 'app-add-menu-item-form',
  templateUrl: './add-menu-item-form.component.html',
  styleUrls: [
    './add-menu-item-form.component.scss',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
  ],
})
export class AddMenuItemFormComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel, OnInit, OnChanges
{
  title: string = '';
  message: string = '';
  type: string = 'existing';
  existingCategories: MenuItemCategory[] = [];
  existingCat: number = -1;
  newCat: string = '';
  priceValueString: string = '';
  prepTimeString: string = '';
  expenseValueString: string = '';
  itemCat: string = 'food';
  drinkType: string = 'likeABoss'; // 'alwaysAvoid'
  menuItem: MenuItemCreate = { item: {}, category: {}, price: {} };
  editMenuItem: MenuItem = {
    id: -1,
    item: { name: '', ingredients: '', preparationTime: -1 },
    price: { value: -1, date: -1, expense: -1 },
    categoryId: -1,
    type: '',
    isAlcoholic: false,
    imageUrl: '',
  };
  editMode: boolean = false;
  categoryId: number = -1;

  checkForm = {
    invalidName: false,
    invalidPrice: false,
    invalidExpense: false,
    invalidPrepTime: false,
    invalidIngredients: false,
    invalidExistingSubcat: false,
    invalidNewSubcat: false,
    invalidDesc: false,
  };

  constructor(
    private router: Router,
    private menuItemCategoryService: MenuItemCategoryService,
    private menuItemService: MenuItemService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) console.log('CHANGE: ' + this.type);
  }

  ngOnInit(): void {
    this.getMenuItemsCategories();
  }

  private setStringInputs(milis: number, price: number, expense: number) {
    let seconds = (milis / 1000) % 60;
    let minutes = (milis / (1000 * 60)) % 60;
    let hours = (milis / (1000 * 60 * 60)) % 24;
    this.prepTimeString =
      (hours | 0).toString() +
      'h ' +
      (minutes | 0).toString() +
      'm ' +
      (seconds | 0).toString() +
      's';

    this.priceValueString = price.toString() + 'RSD';
    this.expenseValueString = expense.toString() + 'RSD';
  }

  private checkEditForm() {
    if (this.editMode) {
      this.menuItem.id = this.editMenuItem.id;
      this.menuItem.item.name = this.editMenuItem.item.name;
      this.menuItem.item.ingredients = this.editMenuItem.item.ingredients;
      this.menuItem.item.preparationTime =
        this.editMenuItem.item.preparationTime;
      this.menuItem.item.description = this.editMenuItem.item.description;
      this.menuItem.type = 'existing';
      this.menuItem.type = this.editMenuItem.type;
      if (this.menuItem.type === 'food') this.itemCat = 'food';
      else {
        this.itemCat = 'drink';
        if (this.editMenuItem.isAlcoholic) this.drinkType = 'likeABoss';
        else this.drinkType = 'alwaysAvoid';
      }
      this.menuItem.isAlcoholic = this.editMenuItem.isAlcoholic;
      this.menuItem.price.price = this.editMenuItem.price.value;
      this.menuItem.price.expense = this.editMenuItem.price.expense;
      this.menuItem.imageUrl = this.editMenuItem.imageUrl;

      for (let i of this.existingCategories) {
        if (i.id === this.editMenuItem.categoryId) this.existingCat = i.id;
      }

      this.setStringInputs(
        this.menuItem.item.preparationTime,
        this.menuItem.price.price,
        this.menuItem.price.expense
      );
    }
  }

  private resetChecks() {
    this.checkForm.invalidName = false;
    this.checkForm.invalidPrice = false;
    this.checkForm.invalidExpense = false;
    this.checkForm.invalidPrepTime = false;
    this.checkForm.invalidIngredients = false;
    this.checkForm.invalidExistingSubcat = false;
    this.checkForm.invalidNewSubcat = false;
    this.checkForm.invalidDesc = false;
  }

  public confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    let canContinue = true;
    this.resetChecks();

    if (this.type === 'existing' && typeof this.existingCat === 'undefined') {
      this.checkForm.invalidExistingSubcat = true;
      canContinue = false;
    } else if (
      this.type === 'existing' &&
      typeof this.existingCat != 'undefined'
    ) {
      console.log('POSTOJECA KATEGORIJA');
      this.menuItem.category.id = this.existingCat.valueOf();
      console.log(this.menuItem.category);
      console.log(this.menuItem);
    }

    if (this.type === 'new' && this.newCat === '') {
      canContinue = false;
      this.checkForm.invalidNewSubcat = true;
    } else if (this.type === 'new' && this.newCat != '') {
      console.log('NOVA KATEGORIJA');
      this.menuItem.category.name = this.newCat;
      this.menuItem.category.id = undefined;
    }

    if (typeof this.menuItem.item.description === 'undefined') {
      canContinue = false;
      this.checkForm.invalidDesc = true;
    }

    if (typeof this.menuItem.item.name === 'undefined') {
      this.checkForm.invalidName = true;
      canContinue = false;
    }

    if (this.priceValueString === '') {
      this.checkForm.invalidPrice = true;
      canContinue = false;
    } else {
      let num = Number(this.priceValueString.slice(0, -3));
      if (num <= 0) {
        this.checkForm.invalidPrice = true;
        canContinue = false;
      } else this.menuItem.price.price = num;
    }

    if (this.expenseValueString === '') {
      this.checkForm.invalidExpense = true;
      canContinue = false;
    } else {
      let num = Number(this.expenseValueString.slice(0, -3));
      if (num <= 0) {
        this.checkForm.invalidExpense = true;
        canContinue = false;
      } else this.menuItem.price.expense = num;
    }

    if (this.prepTimeString === '') {
      canContinue = false;
      this.checkForm.invalidPrepTime = true;
    } else {
      let splitted = this.prepTimeString.split(' ');
      let sum = 0;
      console.log(splitted);
      for (let s of splitted) {
        console.log(s);
        console.log(s.substring(s.length - 1));
        if (s.substring(s.length - 1) === 'd')
          sum += 86400000 * Number(s.slice(0, -1));
        else if (s.substring(s.length - 1) === 'h')
          sum += 3600000 * Number(s.slice(0, -1));
        else if (s.substring(s.length - 1) === 'm')
          sum += 60000 * Number(s.slice(0, -1));
        else if (s.substring(s.length - 1) === 's')
          sum += 1000 * Number(s.slice(0, -1));
      }
      console.log('SUMMM');
      console.log(sum);
      if (sum <= 0) {
        canContinue = false;
        this.checkForm.invalidPrepTime = true;
      } else this.menuItem.item.preparationTime = sum;
    }

    if (this.itemCat === 'drink') {
      this.menuItem.type = 'drink';
      this.menuItem.isAlcoholic = this.drinkType === 'likeABoss';
    } else this.menuItem.type = 'food';

    if (typeof this.menuItem.item.ingredients === 'undefined') {
      canContinue = false;
      this.checkForm.invalidIngredients = true;
    }

    if (canContinue) {
      if (!this.editMode) {
        console.log('IDE CREATE: ');
        console.log(this.menuItem);
        this.menuItemService.createMenuItem(this.menuItem).subscribe((data) => {
          this.result = true;
          this.close();
          //this.router.navigate(['/admin-menu-items']);
        });
      } else {
        this.menuItem.id = this.editMenuItem.id;
        this.menuItem.item.id = this.editMenuItem.item.id;
        this.menuItem.price.id = this.editMenuItem.price.id;
        console.log('IDE UPDATE: ');
        console.log(this.menuItem);
        this.menuItemService
          .updateMenuItem(this.menuItem, this.editMenuItem.id)
          .subscribe((data) => {
            this.result = true;
            this.close();
            //this.router.navigate(['/admin/menu-items']);
          });
      }
    }
  }

  public cancel() {
    this.close();
  }

  getMenuItemsCategories() {
    this.menuItemCategoryService
      .getAllMenuItemCategories()
      .subscribe((data) => {
        this.existingCategories = data;
        console.log(this.existingCategories);
        if (this.editMode) this.checkEditForm();
      });
  }

  public deleteMenuItem(id: number) {
    this.menuItemService.deleteMenuItem(id).subscribe(data => {
      this.result = true;
      this.close();
    });
  }

}
