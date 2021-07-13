import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegroupingComponent } from './regrouping.component';

describe('RegroupingComponent', () => {
  let component: RegroupingComponent;
  let fixture: ComponentFixture<RegroupingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegroupingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegroupingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
