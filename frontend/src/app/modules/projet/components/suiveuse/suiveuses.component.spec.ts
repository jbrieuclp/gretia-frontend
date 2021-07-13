import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiveusesComponent } from './suiveuses.component';

describe('SuiveusesComponent', () => {
  let component: SuiveusesComponent;
  let fixture: ComponentFixture<SuiveusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiveusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiveusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
