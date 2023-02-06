import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/reports";

  constructor(private http: HttpClient) { }

  getAllSalaries(): any {
    return this.http.get(this.path + "/salaries").pipe(catchError( (error) => {return throwError(error) }));
  }

  getReport(): any {
    let params = new HttpParams();
    params = params.append('start', '2021-08-20').append('end', '2022-01-20');
    return this.http.get(this.path, { params: params }).pipe(catchError( (error) => {return throwError(error) }));
  }

}
