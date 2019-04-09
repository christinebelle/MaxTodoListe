import { TestBed } from '@angular/core/testing';

import { DatatacheService } from './datatache.service';

describe('DatatacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatatacheService = TestBed.get(DatatacheService);
    expect(service).toBeTruthy();
  });
});
