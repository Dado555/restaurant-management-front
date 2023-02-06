import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNotificationComponent } from './login-notification.component';

describe('LoginNotificationComponent', () => {
  let component: LoginNotificationComponent;
  let fixture: ComponentFixture<LoginNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
