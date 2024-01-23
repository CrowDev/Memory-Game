import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultSelectorComponent } from './difficult-selector.component';
import { FacadeService } from '../../services/facade.service';

describe('DifficultSelectorComponent', () => {
  let component: DifficultSelectorComponent;
  let fixture: ComponentFixture<DifficultSelectorComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['initGame']);
    await TestBed.configureTestingModule({
      imports: [DifficultSelectorComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService }
      ]
    });
    
    fixture = TestBed.createComponent(DifficultSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dialog', (done: DoneFn) => {
    component.showDialog = false;
    component.toggleDialog();
    expect(component.showDialog).toBe(true);
    component.toggleDialog();
    setTimeout(() => {
      expect(component.showDialog).toBe(false);
      done();
    }, 900);
  });

  it('should change difficult', () => {
    expect(component.selectedDifficult)
      .withContext('default difficult should be 5')
      .toBe(5);
    component.onDifficultChange(10);
    expect(component.selectedDifficult)
      .withContext('difficult should be changed to 10')
      .toBe(10);
    expect(facadeService.initGame).toHaveBeenCalledWith(10);
  });
});
