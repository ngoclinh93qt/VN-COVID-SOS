import { TestBed } from '@angular/core/testing';

import { RequesterObjectStatusService } from './requester-object-status.service';

describe('RequesterObjectStatusService', () => {
  let service: RequesterObjectStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequesterObjectStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
