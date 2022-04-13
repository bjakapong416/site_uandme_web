import { TestBed } from '@angular/core/testing';

import { StockResolver } from './stock.resolver';

describe('StockResolver', () => {
  let resolver: StockResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StockResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
