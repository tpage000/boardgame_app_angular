import { TestBed, inject } from '@angular/core/testing';

import { GameDetailService } from './game-detail.service';

describe('GameDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameDetailService]
    });
  });

  it('should be created', inject([GameDetailService], (service: GameDetailService) => {
    expect(service).toBeTruthy();
  }));
});
