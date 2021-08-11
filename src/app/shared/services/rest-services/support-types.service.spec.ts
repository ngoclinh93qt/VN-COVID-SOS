import { TestBed } from '@angular/core/testing';

import { SupportTypesService } from './support-types.service';

describe('SupportTypesService', () => {
  let service: SupportTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
