import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySListComponent } from './my-s-list.component';

describe('MySListComponent', () => {
  let component: MySListComponent;
  let fixture: ComponentFixture<MySListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
