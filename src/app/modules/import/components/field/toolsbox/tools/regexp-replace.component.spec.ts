import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegexpReplaceComponent } from './regexp-replace.component';

describe('RegexpReplaceComponent', () => {
  let component: RegexpReplaceComponent;
  let fixture: ComponentFixture<RegexpReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegexpReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegexpReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
