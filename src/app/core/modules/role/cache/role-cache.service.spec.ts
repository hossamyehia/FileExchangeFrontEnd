import { TestBed } from '@angular/core/testing';

import { RoleCacheService } from './role-cache.service';

describe('RoleCacheService', () => {
  let service: RoleCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
