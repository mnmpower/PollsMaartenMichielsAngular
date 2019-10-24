import { TestBed } from '@angular/core/testing';

import { PollgebruikerService } from './pollgebruiker.service';

describe('PollgebruikerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollgebruikerService = TestBed.get(PollgebruikerService);
    expect(service).toBeTruthy();
  });
});
