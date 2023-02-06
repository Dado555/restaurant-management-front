import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserInfo } from 'src/app/model/userInfo';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly path = location.protocol + "//" + location.hostname + ":8081/api/users";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.path).pipe(catchError( (error) => {return throwError(error) }));
  }

  createUser(user: UserInfo): Observable<UserInfo> {
    return this.http.post<UserInfo>(this.path, user).pipe(catchError( (error) => {return throwError(error) }));
  }

  updateUser(user: UserInfo) {
    // console.log(user);
    return this.http.put(this.path + "/" + user.id, user).pipe(catchError( (error) => {return throwError(error) }));
  }

  deleteWorker(workerId: number): Observable<any> {
    return this.http.delete(this.path + "/" + workerId);
  }

  getWorkersCount(): Observable<Number> {
    return this.http.get<Number>(this.path + "/count-workers").pipe(catchError( (error) => {return throwError(error) }));
  }

  getAllWorkers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.path + "/workers").pipe(catchError( (error) => {return throwError(error) }));
  }

}
