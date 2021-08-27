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
  it('login api', () => {
    service
      .signin('sos.demo@mailnesia.com', '123456789')
      .subscribe((result) => {
        expect(result).toBeDefined();
      });
  });
});
