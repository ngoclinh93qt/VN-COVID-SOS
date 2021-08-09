import { TestBed } from '@angular/core/testing';

import { UrgentRequestService } from './urgent-request.service';

describe('UrgentRequestService', () => {
  let service: UrgentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
