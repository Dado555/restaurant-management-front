import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MenuItem } from 'src/app/model/menuItem';
import { MenuItemCategory } from 'src/app/model/menuItemCategory';
import {UserInfo} from "../../model/userInfo";
import {MenuItemCreate} from "../../model/createMenuItem";

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/menu-items";

  constructor(private http: HttpClient) { }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.path).pipe(catchError( (error) => {return throwError(error) }));
  }

  getMenuItemsCount(): Observable<Number> {
    return this.http.get<Number>(this.path + "/count").pipe(catchError((error) => {return throwError(error)}));
  }

  getAllMenuItemsByCategory(categoryId:number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.path + "/category/" + categoryId).pipe(catchError( (error) => {return throwError(error) }));
  }

  getAllMenuItemCategories(): Observable<MenuItemCategory[]> {
    return this.http.get<MenuItemCategory[]>(this.path + "/categories").pipe(catchError( (error) => {return throwError(error) }));
  }

  createMenuItem(menuItem: MenuItemCreate): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.path, menuItem).pipe(catchError( (error) => {return throwError(error) }));
  }

  updateMenuItem(menuItem: MenuItemCreate, id: number) {
    // console.log(user);
    return this.http.put(this.path + "/" + id, menuItem).pipe(catchError( (error) => {return throwError(error) }));
  }

  deleteMenuItem(id: number) {
    // console.log(user);
    return this.http.delete(this.path + "/" + id).pipe(catchError( (error) => {return throwError(error) }));
  }

}
