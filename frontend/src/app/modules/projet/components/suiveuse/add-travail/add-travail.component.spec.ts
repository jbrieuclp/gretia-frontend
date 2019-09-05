import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravailComponent } from './add-travail.component';

describe('AddTravailComponent', () => {
  let component: AddTravailComponent;
  let fixture: ComponentFixture<AddTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
