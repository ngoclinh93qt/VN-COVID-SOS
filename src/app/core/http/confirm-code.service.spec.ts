import { TestBed } from '@angular/core/testing';

import { ConfirmCodeService } from './confirm-code.service';

describe('ConfirmCodeService', () => {
  let service: ConfirmCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
