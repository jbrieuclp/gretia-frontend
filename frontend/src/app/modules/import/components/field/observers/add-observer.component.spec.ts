import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObserverComponent } from './add-observer.component';

describe('AddObserverComponent', () => {
  let component: AddObserverComponent;
  let fixture: ComponentFixture<AddObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
