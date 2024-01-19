import { TestBed } from '@angular/core/testing';

import { PendingCacheService } from './pending-cache.service';

describe('PendingCacheService', () => {
  let service: PendingCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
