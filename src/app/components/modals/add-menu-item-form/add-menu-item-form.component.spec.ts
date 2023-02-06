import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuItemFormComponent } from './add-menu-item-form.component';

describe('AddMenuItemFormComponent', () => {
  let component: AddMenuItemFormComponent;
  let fixture: ComponentFixture<AddMenuItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuItemFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
