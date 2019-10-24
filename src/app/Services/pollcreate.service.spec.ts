import { TestBed } from '@angular/core/testing';

import { PollcreateService } from './pollcreate.service';

describe('PollcreateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollcreateService = TestBed.get(PollcreateService);
    expect(service).toBeTruthy();
  });
});
