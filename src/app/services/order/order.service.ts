import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { OrderInfo } from 'src/app/model/orderInfo';
import { OrderCreate } from 'src/app/model/dto/ordercreate';
import {error} from "jquery";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/orders";

  constructor(private http: HttpClient) { }

  getOrdersWithOrderItemsForTable(tableId: number): Observable<OrderInfo[]> {
    return this.http.get<OrderInfo[]>(this.path + "/table/" + tableId);
  }

  getNewOrders(): Observable<OrderInfo[]> {
    return this.http.get<OrderInfo[]>(this.path + "/new");
  }

  getAcceptedOrders(): Observable<OrderInfo[]> {
    return this.http.get<OrderInfo[]>(this.path + "/accepted");
  }

  getActiveOrders(): Observable<OrderInfo[]> {
    return this.http.get<OrderInfo[]>(this.path + "/active");
  }

  getAllOrders(): Observable<OrderInfo[]> {
    return this.http.get<OrderInfo[]>(this.path).pipe(catchError( (error) => {return throwError(error) }));
  }

  getOrdersCount(): Observable<Number> {
    return this.http.get<Number>(this.path + "/count").pipe(catchError((error) => {return throwError(error)}));
  }

  createOrders(data:OrderCreate): Observable<OrderInfo[]> {
    return this.http.post<OrderInfo[]>(this.path, data);
  }

  getNewOrdersCount(): Observable<Number> {
    return this.http.get<Number>(this.path + "/new-orders-count").pipe(catchError((error) => {return throwError(error)}));
  }

  getOrdersCountForNDays(days: number): Observable<number[]> {
    return this.http.get<number[]>(this.path + "/" + days.toString() + "/count-last-Ndays").pipe(catchError((error) => {return throwError(error)}));
  }

  getIncomesAndExpensesForNDays(days: number): Observable<any> {
    return this.http.get<any>(this.path + "/" + days.toString() + "/income-and-expense").pipe(catchError((error) => {return throwError(error)}));
  }

  getOrdersCountForLastNDays(days: number): Observable<number[]> {
    return this.http.get<number[]>(this.path + "/" + days + "/orders-count").pipe(catchError((error) => {return throwError(error)}));
  }

  checkoutOrder(id: number): Observable<OrderInfo> {
    return this.http.post<OrderInfo>(this.path + "/" + id + "/checkout", "");
  }
}
