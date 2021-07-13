import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalisationsComponent } from './localisations.component';

describe('LocalisationsComponent', () => {
  let component: LocalisationsComponent;
  let fixture: ComponentFixture<LocalisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
