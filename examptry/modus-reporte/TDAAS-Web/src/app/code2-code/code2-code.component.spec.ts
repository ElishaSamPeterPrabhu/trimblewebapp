import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Code2CodeComponent } from './code2-code.component';

describe('Code2CodeComponent', () => {
  let component: Code2CodeComponent;
  let fixture: ComponentFixture<Code2CodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Code2CodeComponent]
    });
    fixture = TestBed.createComponent(Code2CodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
