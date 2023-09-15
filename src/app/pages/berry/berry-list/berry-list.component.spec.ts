import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerryListComponent } from './berry-list.component';

describe('BerryListComponent', () => {
  let component: BerryListComponent;
  let fixture: ComponentFixture<BerryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BerryListComponent]
    });
    fixture = TestBed.createComponent(BerryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
