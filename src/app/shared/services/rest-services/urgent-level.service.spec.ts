import { TestBed } from '@angular/core/testing';

import { UrgentLevelService } from './urgent-level.service';

describe('UrgentLevelService', () => {
  let service: UrgentLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrgentLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
