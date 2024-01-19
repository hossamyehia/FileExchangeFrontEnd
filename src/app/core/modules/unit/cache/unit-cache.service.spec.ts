import { TestBed } from '@angular/core/testing';

import { UnitCacheService } from './unit-cache.service';

describe('UnitCacheService', () => {
  let service: UnitCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
