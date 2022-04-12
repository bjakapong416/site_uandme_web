import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudStocksComponent } from './crud-stocks.component';

describe('CrudStocksComponent', () => {
  let component: CrudStocksComponent;
  let fixture: ComponentFixture<CrudStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
