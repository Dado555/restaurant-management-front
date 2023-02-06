import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Sector } from 'src/app/model/sector';
import { RestaurantTableService } from 'src/app/services/table/restaurant-table/restaurant-table.service';

export interface ConfirmModel {
  title: string;
  message: string;
  sectorData: Sector;
}

@Component({
  selector: 'app-delete-section-form',
  templateUrl: './delete-section-form.component.html',
  styleUrls: ['./delete-section-form.component.scss'],
})
export class DeleteSectionFormComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  title: string = 'Delete sector';
  message: string = 'Are you sure';
  sectorData: Sector = {
    name: '',
  };

  constructor(
    private router: Router,
    private tableService: RestaurantTableService
  ) {
    super();
  }

  cancel() {
    this.close();
  }

  deleteSector() {
    if (this.sectorData.id)
      this.tableService.deleteSector(this.sectorData.id).subscribe((data) => {
        console.log(data);
      });

    this.router.navigate(['/admin/table-layout']);
    this.close();
  }
}
