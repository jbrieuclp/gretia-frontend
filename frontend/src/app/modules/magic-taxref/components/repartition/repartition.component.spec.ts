import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartitionComponent } from './repartition.component';

describe('RepartitionComponent', () => {
  let component: RepartitionComponent;
  let fixture: ComponentFixture<RepartitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepartitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepartitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
