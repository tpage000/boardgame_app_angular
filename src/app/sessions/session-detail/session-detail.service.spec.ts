import { TestBed, inject } from '@angular/core/testing';

import { SessionDetailService } from './session-detail.service';

describe('SessionDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionDetailService]
    });
  });

  it('should be created', inject([SessionDetailService], (service: SessionDetailService) => {
    expect(service).toBeTruthy();
  }));
});
