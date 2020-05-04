/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShoesService } from './shoes.service';

describe('Service: Shoes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoesService]
    });
  });

  it('should ...', inject([ShoesService], (service: ShoesService) => {
    expect(service).toBeTruthy();
  }));
});
