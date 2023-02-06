import { TestBed } from '@angular/core/testing';

import { BartenderAuthGuard } from './bartender-auth-guard';

describe('BartenderAuthGuard', () => {
  let service: BartenderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BartenderAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
