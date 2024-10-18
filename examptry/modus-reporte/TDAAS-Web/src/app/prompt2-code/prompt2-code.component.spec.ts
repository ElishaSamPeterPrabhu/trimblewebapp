import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Prompt2CodeComponent } from './prompt2-code.component';

describe('Prompt2CodeComponent', () => {
  let component: Prompt2CodeComponent;
  let fixture: ComponentFixture<Prompt2CodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Prompt2CodeComponent]
    });
    fixture = TestBed.createComponent(Prompt2CodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
