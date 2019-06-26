import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichesseInfoComponent } from './richesse-info.component';

describe('RichesseInfoComponent', () => {
  let component: RichesseInfoComponent;
  let fixture: ComponentFixture<RichesseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichesseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichesseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
