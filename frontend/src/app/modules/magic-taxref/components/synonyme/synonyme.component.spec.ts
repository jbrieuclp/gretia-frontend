import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymeComponent } from './synonyme.component';

describe('SynonymeComponent', () => {
  let component: SynonymeComponent;
  let fixture: ComponentFixture<SynonymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
