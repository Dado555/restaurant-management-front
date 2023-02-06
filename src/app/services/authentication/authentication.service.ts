import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Table } from 'src/app/model/table';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly path =
    location.protocol + '//' + location.hostname + ':8081/api/authentication';

  constructor(private http: HttpClient) {}

  masterLogin(data: Object): Observable<Table[]> {
    return this.http.post<Table[]>(this.path + '/master-login', data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  saveMasterPassword(data: string) {
    localStorage.setItem('master-key', data);
  }

  getMasterPassword() {
    return localStorage.getItem('master-key');
  }

  logoutMaster() {
    localStorage.removeItem('master-key');
  }

  logout() {
    localStorage.removeItem('user-data');
  }

  workerLogin(data: Object): Observable<Table[]> {
    return this.http.post<Table[]>(this.path + '/login', data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  saveLoggedUser(user: Object) {
    localStorage.setItem('user-data', JSON.stringify(user));
  }

  getJWTToekn() {
    let loggedUser = localStorage.getItem('user-data');
    if (!loggedUser) return null;

    let loggedUserObj = JSON.parse(loggedUser);
    return loggedUserObj?.jwt;
  }

  getLoggedUser() {
    let loggedUser = localStorage.getItem('user-data');
    if (!loggedUser) return null;

    let loggedUserObj = JSON.parse(loggedUser);
    return loggedUserObj;
  }

  isLoggedIn() {
    let loggedUser = localStorage.getItem('user-data');
    if (!loggedUser) return false;
    return true;
  }

  getUserRole() {
    let user = this.getLoggedUser();
    if (!user) return null;
    return user.authorities[0];
  }

  async isMasterValid() {
    let masterKey = localStorage.getItem('master-key');
    if (!masterKey) return false;

    try {
      let result = await this.masterLogin({ password: masterKey }).toPromise();
      return true;
    } catch (exception) {
      return false;
    }
  }
}
