import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalyticsComponentComponent } from './admin-analytics-component.component';

describe('AdminAnalyticsComponentComponent', () => {
  let component: AdminAnalyticsComponentComponent;
  let fixture: ComponentFixture<AdminAnalyticsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnalyticsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalyticsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
