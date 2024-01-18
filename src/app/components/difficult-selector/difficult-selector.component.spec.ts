import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultSelectorComponent } from './difficult-selector.component';

describe('DifficultSelectorComponent', () => {
  let component: DifficultSelectorComponent;
  let fixture: ComponentFixture<DifficultSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifficultSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DifficultSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
