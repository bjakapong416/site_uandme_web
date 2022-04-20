import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCusComponent } from './bill-cus.component';

describe('BillCusComponent', () => {
  let component: BillCusComponent;
  let fixture: ComponentFixture<BillCusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
