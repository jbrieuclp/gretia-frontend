import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressionInfoComponent } from './pression-info.component';

describe('PressionInfoComponent', () => {
  let component: PressionInfoComponent;
  let fixture: ComponentFixture<PressionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
