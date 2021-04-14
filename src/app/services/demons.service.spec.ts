import { TestBed } from '@angular/core/testing';

import { DemonsService } from './demons.service';

describe('DemonsService', () => {
  let service: DemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
