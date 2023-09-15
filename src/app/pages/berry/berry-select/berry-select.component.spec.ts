import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerrySelectComponent } from './berry-select.component';

describe('BerrySelectComponent', () => {
  let component: BerrySelectComponent;
  let fixture: ComponentFixture<BerrySelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BerrySelectComponent]
    });
    fixture = TestBed.createComponent(BerrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
