import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkersListComponent } from './admin-workers-list.component';

describe('AdminWorkersListComponent', () => {
  let component: AdminWorkersListComponent;
  let fixture: ComponentFixture<AdminWorkersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
