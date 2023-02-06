import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginForm } from 'src/app/model/dto/loginForm';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.scss'],
})
export class ManagerLoginComponent {
  loginData: LoginForm = {
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  loginUser() {
    let data = {
      username: this.loginData.username,
      password: this.loginData.password,
    };

    this.authenticationService.workerLogin(data).subscribe((response) => {
      this.authenticationService.saveLoggedUser(response);
      this.router.navigate(['/admin']);
    });
  }
}
