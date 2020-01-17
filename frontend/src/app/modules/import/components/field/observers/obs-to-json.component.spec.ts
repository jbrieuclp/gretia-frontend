import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObsToJsonComponent } from './obs-to-json.component';

describe('ObsToJsonComponent', () => {
  let component: ObsToJsonComponent;
  let fixture: ComponentFixture<ObsToJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObsToJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObsToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
