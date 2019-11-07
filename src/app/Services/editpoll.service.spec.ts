import { TestBed } from '@angular/core/testing';

import { EditpollService } from './editpoll.service';

describe('EditpollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditpollService = TestBed.get(EditpollService);
    expect(service).toBeTruthy();
  });
});
