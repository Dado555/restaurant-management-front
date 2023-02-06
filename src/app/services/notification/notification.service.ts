declare var require: any;

import { EventEmitter, Injectable } from '@angular/core';
import '@stomp/stompjs';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { ToastrService } from 'ngx-toastr';
import { Notification } from 'src/app/model/dto/notification';
import { AuthenticationService } from '../authentication/authentication.service';

const SockJS = require('../../../assets/js/sockjs.js');

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  stompClient?: CompatClient;
  socket = new SockJS('http://localhost:8081/notifications');
  AllNotificationEvent = new EventEmitter();
  CookEvent = new EventEmitter();
  BartenderEvent = new EventEmitter();
  WaiterEvent = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private authService: AuthenticationService
  ) {}

  connect() {
    var headers = {
      // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzU3Iiwicm9sZXMiOiJXQUlURVIiLCJpYXQiOjE2NDM0MTE2NTIsImV4cCI6MTY2MTQxMTY1Mn0._w9o_s9wXxnynmb7gRvZ9YIQNngiAL4nBFCXG4aUqEk"
    };

    var socket = new SockJS('http://localhost:8081/notifications');
    this.stompClient = Stomp.over(socket);
    const self = this;
    this.stompClient.connect(headers, function (frame: any) {
      if (!self.stompClient) return;
      var url = self.stompClient.ws._transport.url!;

      url = url.replace('ws://localhost:8081/notifications/', '');
      url = url.replace('/websocket', '');
      url = url.replace(/^[0-9]+\//, '');
      console.log('Your current session is: ' + url);
      let sessionId = url;

      // self.setConnected(true);
      console.log('Connected: ' + frame);
      self.stompClient.subscribe(
        '/topic/notification',
        function (messageOutput) {
          self.showMessageOutput(JSON.parse(messageOutput.body));
        }
      );

      self.stompClient.subscribe('/topic/messages', function (messageOutput) {
        self.showMessageOutput(JSON.parse(messageOutput.body));
      });

      self.stompClient.subscribe(
        '/topic/specific-user' + '-user' + sessionId,
        function (messageOutput) {
          self.showMessageOutput(JSON.parse(messageOutput.body));
        }
      );
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    // this.setConnected(false);
    console.log('Disconnected');
  }

  sendMessage(object: object) {
    this.stompClient?.send('/app/messages', {}, JSON.stringify(object));
  }

  private showMessageOutput(messageOutput: Notification) {
    this.AllNotificationEvent.emit(messageOutput);

    console.log(this.authService.getUserRole());
    console.log(messageOutput);

    if (
      (this.authService.getUserRole() === messageOutput.toRole ||
        messageOutput.toRole === 'ALL' ||
        this.authService.getUserRole() == null) &&
      messageOutput.to !== 'HIDDEN'
    )
      this.toastr.success(messageOutput.message, messageOutput.time);

    if (messageOutput.toRole == 'COOK') this.CookEvent.emit(messageOutput);
    else if (messageOutput.toRole == 'BARTENDER')
      this.BartenderEvent.emit(messageOutput);
    else if (messageOutput.toRole == 'WAITER')
      this.WaiterEvent.emit(messageOutput);
  }
}
