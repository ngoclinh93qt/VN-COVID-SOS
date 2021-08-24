import { TestBed } from '@angular/core/testing';

import { SupportObjectService } from './support-object.service';

describe('SupportObjectService', () => {
  let service: SupportObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
