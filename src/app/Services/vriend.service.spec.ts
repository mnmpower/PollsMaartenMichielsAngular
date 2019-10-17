import { TestBed } from '@angular/core/testing';

import { VriendService } from './vriend.service';

describe('VriendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VriendService = TestBed.get(VriendService);
    expect(service).toBeTruthy();
  });
});
