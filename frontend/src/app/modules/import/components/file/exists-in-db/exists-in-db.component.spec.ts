import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistsInDbComponent } from './exists-in-db.component';

describe('ExistsInDbComponent', () => {
  let component: ExistsInDbComponent;
  let fixture: ComponentFixture<ExistsInDbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistsInDbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistsInDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
