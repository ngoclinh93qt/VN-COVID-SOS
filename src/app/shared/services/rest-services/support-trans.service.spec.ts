import { TestBed } from '@angular/core/testing';

import { SupportTransService } from './support-trans.service';

describe('SupportTransService', () => {
  let service: SupportTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
