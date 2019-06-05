import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravailleurFormComponent } from './travailleur-form.component';

describe('TravailleurFormComponent', () => {
  let component: TravailleurFormComponent;
  let fixture: ComponentFixture<TravailleurFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravailleurFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravailleurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
