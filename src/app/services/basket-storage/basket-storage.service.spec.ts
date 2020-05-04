/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BasketStorageService } from './basket-storage.service';

describe('Service: BasketStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketStorageService]
    });
  });

  it('should ...', inject([BasketStorageService], (service: BasketStorageService) => {
    expect(service).toBeTruthy();
  }));
});
