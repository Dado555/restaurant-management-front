import {
  Component,
  OnInit,
  ViewChild,
  Directive,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { CodeInputComponent } from 'angular-code-input';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-worker-login',
  templateUrl: './worker-login.component.html',
  styleUrls: ['./worker-login.component.scss'],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
})
export class WorkerLoginComponent implements OnInit {
  authedMaster: boolean = false;
  masterPassword = '';
  workerPin = '';

  test: String = 'ajdee';
  @ViewChild('codeInput') codeInput!: CodeInputComponent;

  constructor(
    private location: Location,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadMasterPassword();
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.workerPin = code;
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    this.loginWokrer();
    this.codeInput.reset();
    this.workerPin = '';
    this.focusPin();
  }

  authButton() {
    if (!this.authedMaster) return this.authMaster();
    else return this.loginWokrer();
  }

  async loadMasterPassword() {
    let valid = await this.authenticationService.isMasterValid();
    if (valid) {
      let masterKey = this.authenticationService.getMasterPassword();
      if (!masterKey) return;

      this.masterPassword = masterKey;
      this.authedMaster = true;
    }
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Bad something');
  }

  authMaster() {
    let data = {
      password: this.masterPassword,
    };

    this.authenticationService
      .masterLogin(data)
      .pipe(catchError(this.errorHandler))
      .subscribe((result) => {
        this.authenticationService.saveMasterPassword(this.masterPassword);
        this.authedMaster = true;
      });
  }

  focusPin() {
    this.codeInput.focusOnField(0);
  }

  loginWokrer() {
    let data = {
      username: this.workerPin,
      password: this.masterPassword,
    };

    this.authenticationService.workerLogin(data).subscribe((response) => {
      this.authenticationService.saveLoggedUser(response);
      let res: any = response;
      console.log(res?.authorities);
      if (
        res?.authorities.includes('COOK') ||
        res?.authorities.includes('BARTENDER')
      )
        this.router.navigate(['/worker/home']);
      else this.router.navigate(['/waiter/home']);
    });
  }

  logoutMaster() {
    this.authedMaster = false;
    this.masterPassword = '';
    this.authenticationService.logoutMaster();
  }
}
