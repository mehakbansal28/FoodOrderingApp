import { TestBed } from '@angular/core/testing';

import { FoodService } from './food.service';

describe('FoodService', () => {
  let service: FoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
