import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTaxonComponent } from './search-taxon.component';

describe('SearchTaxonComponent', () => {
  let component: SearchTaxonComponent;
  let fixture: ComponentFixture<SearchTaxonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTaxonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTaxonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
