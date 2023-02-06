import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkerFormComponent } from './add-worker-form.component';

describe('AddWorkerFormComponent', () => {
  let component: AddWorkerFormComponent;
  let fixture: ComponentFixture<AddWorkerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
