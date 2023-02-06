import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/model/dto/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login-notification',
  templateUrl: './login-notification.component.html',
  styleUrls: ['./login-notification.component.scss'],
})
export class LoginNotificationComponent implements OnInit, OnDestroy {
  notificationSubscription?: Subscription;

  constructor(
    private notificationService: NotificationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.notificationSubscription =
      this.notificationService.AllNotificationEvent.subscribe(
        (data: Notification) => {
          console.log(data);
          this.toastr.success(data.message, data.time);
        }
      );
  }

  ngOnDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }
}
