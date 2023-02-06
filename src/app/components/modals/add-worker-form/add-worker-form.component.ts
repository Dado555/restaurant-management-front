import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { UserInfo } from 'src/app/model/userInfo';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

export interface ConfirmModel {
  title: string;
  message: string;
  working_user: UserInfo;
}

@Component({
  selector: 'app-add-worker-form',
  templateUrl: './add-worker-form.component.html',
  styleUrls: [
    './add-worker-form.component.scss',
    '../../../../styles/template/css/style.css',
    '../../../../vendor/bootstrap-select/dist/css/bootstrap-select.min.css',
  ],
})
export class AddWorkerFormComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel, OnInit
{
  title: string = '';
  message: string = '';
  passwd_confirm: string = '';
  working_user: UserInfo = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    username: '',
    password: '',
    role: '',
    salary: '',
  };

  constructor(private router: Router, private userService: UsersService) {
    super();
    this.working_user;
  }

  ngOnInit(): void {
    if (this.title == 'Edit Worker') {
      this.working_user.password = '';
    }
  }

  public onScrollEvent(event: any): void {
    console.log(event);
  }

  public cancel() {
    this.close();
  }

  public editUser() {
    if (
      this.working_user.password !== this.passwd_confirm &&
      this.working_user.role === 'MANAGER'
    ) {
      return;
    }

    if (this.working_user.role !== 'MANAGER') {
      this.working_user.password = 'MASTER';
      if (this.working_user.username.length != 4) {
        alert('Pin must contain 4 number');
        return;
      }
    }

    this.userService.updateUser(this.working_user).subscribe((data) => {
      this.close();
      this.router.navigate(['/admin/workers']);
    });
  }

  public createUser() {
    if (
      (this.working_user.password !== this.passwd_confirm ||
        this.working_user.password === '') &&
      this.working_user.role === 'MANAGER'
    ) {
      alert('Password does not match');
      return;
    }

    if (this.working_user.role !== 'MANAGER') {
      this.working_user.password = 'MASTER';
      if (this.working_user.username.length != 4) {
        alert('Pin must contain 4 number');
        return;
      }
    }

    this.userService.createUser(this.working_user).subscribe((data) => {
      this.close();
      this.router.navigate(['/admin/workers']);
    });
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    this.working_user.username = code;
  }

  // this called only if user entered full code
  onCodeCompleted(code: string) {
    // this.loginWokrer();
    // this.codeInput.reset();
    // this.workerPin = '';
    // this.focusPin();
  }
}
