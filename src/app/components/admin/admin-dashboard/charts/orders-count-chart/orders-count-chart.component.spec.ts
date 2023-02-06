import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCountChartComponent } from './orders-count-chart.component';

describe('OrdersCountChartComponent', () => {
  let component: OrdersCountChartComponent;
  let fixture: ComponentFixture<OrdersCountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersCountChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
