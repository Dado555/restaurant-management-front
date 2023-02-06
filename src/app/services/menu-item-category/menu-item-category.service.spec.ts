import { TestBed } from '@angular/core/testing';

import { MenuItemCategoryService } from './menu-item-category.service';

describe('MenuItemCategoryService', () => {
  let service: MenuItemCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
