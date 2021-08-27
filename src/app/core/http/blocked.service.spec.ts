import { TestBed } from '@angular/core/testing';

import { BlockedService } from './blocked.service';

describe('BlockedService', () => {
  let service: BlockedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
