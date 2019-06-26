import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionInfoComponent } from './repartition-info.component';

describe('RepartitionInfoComponent', () => {
  let component: RepartitionInfoComponent;
  let fixture: ComponentFixture<RepartitionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartitionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartitionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
