import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReplaceComponent } from './search-replace.component';

describe('SearchReplaceComponent', () => {
  let component: SearchReplaceComponent;
  let fixture: ComponentFixture<SearchReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
