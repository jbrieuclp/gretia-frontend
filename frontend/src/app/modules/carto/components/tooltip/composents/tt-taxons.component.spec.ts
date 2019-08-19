import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtTaxonsComponent } from './tt-taxons.component';

describe('TtTaxonsComponent', () => {
  let component: TtTaxonsComponent;
  let fixture: ComponentFixture<TtTaxonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtTaxonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtTaxonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
