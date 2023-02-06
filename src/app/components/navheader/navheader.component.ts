import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navheader',
  templateUrl: './navheader.component.html',
  styleUrls: ['./navheader.component.scss'],
})
export class NavheaderComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
