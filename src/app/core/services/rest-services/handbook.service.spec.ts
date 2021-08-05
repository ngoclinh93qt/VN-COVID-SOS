import { TestBed } from '@angular/core/testing';

import { HandbookService } from './handbook.service';

describe('HandbookService', () => {
  let service: HandbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
