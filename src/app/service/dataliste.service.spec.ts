import { TestBed } from '@angular/core/testing';

import { DatalisteService } from './dataliste.service';

describe('DatalisteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatalisteService = TestBed.get(DatalisteService);
    expect(service).toBeTruthy();
  });
});
