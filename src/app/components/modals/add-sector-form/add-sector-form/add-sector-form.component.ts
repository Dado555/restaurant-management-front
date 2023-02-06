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
  selector: 'app-add-sector-form',
  templateUrl: './add-sector-form.component.html',
  styleUrls: ['./add-sector-form.component.scss'],
})
export class AddSectorFormComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  constructor(
    private tableService: RestaurantTableService,
    private router: Router
  ) {
    super();
  }
  title: string = 'aa';
  message: string = 'bb';
  sectorData: Sector = {
    name: '',
  };

  cancel() {
    this.close();
  }

  createSector() {
    if (this.sectorData.id) {
      this.tableService.updateSector(this.sectorData).subscribe((data) => {
        console.log(data);
      });
    } else {
      this.tableService.createSector(this.sectorData).subscribe((data) => {
        console.log(data);
      });
    }

    this.router.navigate(['/admin/table-layout']);
    this.close();
  }
}
