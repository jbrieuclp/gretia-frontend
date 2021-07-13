import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObserverComponent } from './edit-observer.component';

describe('EditObserverComponent', () => {
  let component: EditObserverComponent;
  let fixture: ComponentFixture<EditObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
