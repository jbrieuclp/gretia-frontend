import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonPanelComponent } from './taxon-panel.component';

describe('TaxonPanelComponent', () => {
  let component: TaxonPanelComponent;
  let fixture: ComponentFixture<TaxonPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
