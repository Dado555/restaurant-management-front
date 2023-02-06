import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSectionFormComponent } from './delete-section-form.component';

describe('DeleteSectionFormComponent', () => {
  let component: DeleteSectionFormComponent;
  let fixture: ComponentFixture<DeleteSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
