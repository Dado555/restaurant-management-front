import { TestBed } from '@angular/core/testing';

import { WaiterAuthGuard } from './waiter-auth-guard';

describe('WaiterAuthGuard', () => {
  let service: WaiterAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaiterAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
