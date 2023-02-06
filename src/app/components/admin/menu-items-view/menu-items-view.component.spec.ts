import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsViewComponent } from './menu-items-view.component';

describe('MenuItemsViewComponent', () => {
  let component: MenuItemsViewComponent;
  let fixture: ComponentFixture<MenuItemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
