import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrPanelComponent } from './gr-panel.component';

describe('GrPanelComponent', () => {
  let component: GrPanelComponent;
  let fixture: ComponentFixture<GrPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
