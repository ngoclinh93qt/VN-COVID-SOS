import { TestBed } from '@angular/core/testing';

import { AuthenService } from './authen.service';

describe('AuthenService', () => {
  let service: AuthenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
