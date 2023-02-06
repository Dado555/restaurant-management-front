import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableEditComponent } from './admin-table-edit.component';

describe('AdminTableEditComponent', () => {
  let component: AdminTableEditComponent;
  let fixture: ComponentFixture<AdminTableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTableEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
