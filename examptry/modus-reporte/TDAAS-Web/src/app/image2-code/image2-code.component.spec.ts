import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Image2CodeComponent } from './image2-code.component';

describe('Image2CodeComponent', () => {
  let component: Image2CodeComponent;
  let fixture: ComponentFixture<Image2CodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Image2CodeComponent]
    });
    fixture = TestBed.createComponent(Image2CodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
