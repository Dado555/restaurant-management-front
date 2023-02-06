import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MenuItemCategory } from 'src/app/model/menuItemCategory';
@Injectable({
  providedIn: 'root'
})
export class MenuItemCategoryService {
  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/menu-items/";

  constructor(private http: HttpClient) { }

  getAllMenuItemCategories(): Observable<MenuItemCategory[]> {
    return this.http.get<MenuItemCategory[]>(this.path + "categories").pipe(catchError( (error) => {return throwError(error) }));
  }
}
