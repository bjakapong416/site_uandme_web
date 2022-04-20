import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCusComponent } from './review-cus.component';

describe('ReviewCusComponent', () => {
  let component: ReviewCusComponent;
  let fixture: ComponentFixture<ReviewCusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
