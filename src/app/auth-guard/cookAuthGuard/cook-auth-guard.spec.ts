import { TestBed } from '@angular/core/testing';

import { CookAuthGuard } from './cook-auth-guard';

describe('CookAuthGuard', () => {
  let service: CookAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
