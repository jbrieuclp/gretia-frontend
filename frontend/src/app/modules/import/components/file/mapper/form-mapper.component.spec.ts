import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMapperComponent } from './form-mapper.component';

describe('FormMapperComponent', () => {
  let component: FormMapperComponent;
  let fixture: ComponentFixture<FormMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
