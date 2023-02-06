import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sector } from 'src/app/model/sector';
import { Table } from 'src/app/model/table';

@Injectable({
  providedIn: 'root'
})
export class RestaurantTableService {
  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/tables";

  constructor(private http: HttpClient) { }

    getAllTables(): Observable<Table[]> {
      return this.http.get<Table[]>(this.path);
    }

    getAllSectors(): Observable<Sector[]> {
      return this.http.get<Sector[]>(this.path + "/all-sectors");
    }

    getAllTablesInSectors(sectorId : number): Observable<Table[]> {
      return this.http.get<Table[]>(this.path + "/sector/" + sectorId);
    }

    saveTables(tablesData : Table[]): Observable<Table[]> {
      return this.http.post<Table[]>(this.path + "/all", tablesData);
    }

    createSector(sectorData : Sector): Observable<Sector> {
      return this.http.post<Sector>(this.path + "/sector", sectorData);
    }

    updateSector(sectorData : Sector): Observable<Sector> {
      return this.http.put<Sector>(this.path + "/sector", sectorData);
    }

    deleteSector(sectorId : number): Observable<Sector> {
      return this.http.delete<Sector>(this.path + "/sector/" + sectorId);
    }

}
