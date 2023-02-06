import { TestBed } from '@angular/core/testing';

import { WorkerAuthGuard } from './worker-auth-guard';

describe('WorkerAuthGuard', () => {
  let service: WorkerAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerAuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
