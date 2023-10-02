import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewnewComponent } from './newnew.component';

describe('NewnewComponent', () => {
  let component: NewnewComponent;
  let fixture: ComponentFixture<NewnewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewnewComponent]
    });
    fixture = TestBed.createComponent(NewnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
