import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { OrderItemInfo } from 'src/app/model/orderItemInfo';
import {MenuItemCategory} from "../../model/menuItemCategory";

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/order-items";

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrderItemInfo> {
    return this.http.get<OrderItemInfo>(this.path);
  }

  markOrderItemAsForPreparation(id: number): Observable<OrderItemInfo> {
    return this.http.put<OrderItemInfo>(this.path + "/" + id + "/for-preparation", "");
  }

  takeOrderItem(id: number): Observable<OrderItemInfo> {
    return this.http.put<OrderItemInfo>(this.path + "/" + id + "/in-progress", "");
  }

  markOrderItemAsReady(id: number): Observable<OrderItemInfo> {
    return this.http.put<OrderItemInfo>(this.path + "/" + id + "/ready", "");
  }

  markOrderItemAsDelivered(id: number): Observable<OrderItemInfo> {
    return this.http.put<OrderItemInfo>(this.path + "/" + id + "/delivered", "");
  }

  markOrderItemAsAwaitingApproval(id: number): Observable<OrderItemInfo> {
    return this.http.put<OrderItemInfo>(this.path + "/" + id + "/awaiting-approval", "");
  }


  removeOrderItem(id: number): Observable<string> {
    return this.http.delete<string>(this.path + "/" + id);
  }

  getProfit(): Observable<Number> {
    return this.http.get<Number>(this.path + "/profit").pipe(catchError( (error) => {return throwError(error) }));
  }
}
