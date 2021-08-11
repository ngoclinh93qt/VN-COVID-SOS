import { TestBed } from '@angular/core/testing';

import { RequestStatusService } from './request-status.service';

describe('RequestStatusService', () => {
  let service: RequestStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
