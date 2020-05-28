import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxonomieComponent } from './toxonomie.component';

describe('ToxonomieComponent', () => {
  let component: ToxonomieComponent;
  let fixture: ComponentFixture<ToxonomieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToxonomieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToxonomieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
