import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Sector } from 'src/app/model/sector';
import { RestaurantTableService } from 'src/app/services/table/restaurant-table/restaurant-table.service';
import { AddSectorFormComponent } from '../../../modals/add-sector-form/add-sector-form/add-sector-form.component';
import { DeleteSectionFormComponent } from '../../../modals/delete-section-form/delete-section-form/delete-section-form.component';

@Component({
  selector: 'app-admin-table-edit',
  templateUrl: './admin-table-edit.component.html',
  styleUrls: ['./admin-table-edit.component.scss'],
})
export class AdminTableEditComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  tableSections: Sector[] = [];
  tabBackgorund: ThemePalette = 'primary';
  demo1TabIndex: number = 0;

  constructor(
    private restaurantTableService: RestaurantTableService,
    private simpleModalService: SimpleModalService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.restaurantTableService.getAllSectors().subscribe((data) => {
      this.tableSections = data;
      console.log(this.tableSections);
    });
  }

  toggleSidenavFunc() {
    console.log('SIDENAV TOGGLE');

    this.toggleSidenav.emit();
  }

  getSelectedElement() {
    if (this.tableSections.length <= this.demo1TabIndex) return null;

    return this.tableSections[this.demo1TabIndex];
  }

  openAddSectionForm() {
    console.log('Forma add');
    let disposable = this.simpleModalService
      .addModal(AddSectorFormComponent, {
        title: 'Confirm title',
        message: 'Confirm message',
        sectorData: { name: '' },
      })
      .subscribe((isConfirmed) => {
        this.loadData();
      });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    //setTimeout(()=>{
    //disposable.unsubscribe();
    //},10000);
  }

  openUpdateSectionForm() {
    console.log('Forma edit');
    let disposable = this.simpleModalService
      .addModal(AddSectorFormComponent, {
        title: 'Confirm title',
        message: 'Confirm message',
        sectorData: this.getSelectedElement(),
      })
      .subscribe((isConfirmed) => {
        this.loadData();
      });
    //We can close modal calling disposable.unsubscribe();
    //If modal was not closed manually close it by timeout
    //setTimeout(()=>{
    //disposable.unsubscribe();
    //},10000);
  }

  openDeleteSectionForm() {
    let disposable = this.simpleModalService
      .addModal(DeleteSectionFormComponent, {
        title: 'Confirm title',
        message: 'Confirm message',
        sectorData: this.getSelectedElement(),
      })
      .subscribe((isConfirmed) => {
        this.loadData();
      });
  }
}
