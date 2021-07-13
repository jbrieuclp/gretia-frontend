import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateLinesComponent } from './duplicate-lines.component';

describe('DuplicateLinesComponent', () => {
  let component: DuplicateLinesComponent;
  let fixture: ComponentFixture<DuplicateLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicateLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicateLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
