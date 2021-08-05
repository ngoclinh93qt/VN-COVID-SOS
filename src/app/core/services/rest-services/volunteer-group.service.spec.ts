import { TestBed } from '@angular/core/testing';

import { VolunteerGroupService } from './volunteer-group.service';

describe('VolunteerGroupService', () => {
  let service: VolunteerGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolunteerGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
