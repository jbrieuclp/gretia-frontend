import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsboxComponent } from './toolsbox.component';

describe('ToolsboxComponent', () => {
  let component: ToolsboxComponent;
  let fixture: ComponentFixture<ToolsboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
