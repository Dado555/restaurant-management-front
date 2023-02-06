import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSectorFormComponent } from './add-sector-form.component';

describe('AddSectorFormComponent', () => {
  let component: AddSectorFormComponent;
  let fixture: ComponentFixture<AddSectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
