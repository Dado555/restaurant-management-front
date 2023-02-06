import { TestBed } from '@angular/core/testing';

import { HomeActivate } from './home-activate';

describe('HomeActivate', () => {
  let service: HomeActivate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeActivate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
