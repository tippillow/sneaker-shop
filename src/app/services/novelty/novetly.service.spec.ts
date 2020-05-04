/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoveltyService } from './novelty.service';

describe('Service: Novetly', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoveltyService]
    });
  });

  it('should ...', inject([NoveltyService], (service: NoveltyService) => {
    expect(service).toBeTruthy();
  }));
});
