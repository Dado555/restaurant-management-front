import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class AdminAuthGuard {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.authenticationService.getUserRole() === 'ADMIN' ||
      this.authenticationService.getUserRole() === 'MANAGER'
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
