import { TestBed } from '@angular/core/testing';

import { PolloptionService } from './polloption.service';

describe('PolloptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolloptionService = TestBed.get(PolloptionService);
    expect(service).toBeTruthy();
  });
});
