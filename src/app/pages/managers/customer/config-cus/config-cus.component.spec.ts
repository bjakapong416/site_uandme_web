import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCusComponent } from './config-cus.component';

describe('ConfigCusComponent', () => {
  let component: ConfigCusComponent;
  let fixture: ComponentFixture<ConfigCusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
