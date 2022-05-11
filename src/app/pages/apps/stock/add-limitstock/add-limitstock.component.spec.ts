import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLimitstockComponent } from './add-limitstock.component';

describe('AddLimitstockComponent', () => {
  let component: AddLimitstockComponent;
  let fixture: ComponentFixture<AddLimitstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLimitstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLimitstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
