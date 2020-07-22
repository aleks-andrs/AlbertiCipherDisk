import { TestBed } from '@angular/core/testing';

import { AlberticipherService } from './alberticipher.service';

describe('AlberticipherService', () => {
  let service: AlberticipherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlberticipherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
