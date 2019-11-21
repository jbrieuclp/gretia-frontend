import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicateursPanelComponent } from './indicateurs-panel.component';

describe('IndicateursPanelComponent', () => {
  let component: IndicateursPanelComponent;
  let fixture: ComponentFixture<IndicateursPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicateursPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicateursPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
