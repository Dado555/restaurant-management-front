import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class HomeActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    let userRole = this.authenticationService.getUserRole();

    if (userRole === 'ADMIN' || userRole === 'MANAGER') {
      this.router.navigate(['/admin']);
    } else if (userRole === 'WAITER') {
      this.router.navigate(['/waiter']);
    } else if (userRole === 'COOK') {
      this.router.navigate(['/worker']);
    } else if (userRole === 'BARTENDER') {
      this.router.navigate(['/worker']);
    }

    return true;
  }
}
