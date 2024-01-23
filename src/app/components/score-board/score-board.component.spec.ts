import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreBoardComponent } from './score-board.component';
import { FacadeService } from '../../services/facade.service';
import { of } from 'rxjs';

describe('ScoreBoardComponent', () => {
  let component: ScoreBoardComponent;
  let fixture: ComponentFixture<ScoreBoardComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['isMissed', 'isHit']);
    await TestBed.configureTestingModule({
      imports: [ScoreBoardComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService}
      ]
    });
    
    fixture = TestBed.createComponent(ScoreBoardComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initListener after onInit', () => {
    spyOn(component, 'initListener');
    component.ngOnInit();
    expect(component.initListener).toHaveBeenCalled();
  });

  it('should update wrongs to 5 if isMissed emit 5', () => {
    facadeService.isHit.and.returnValue(of(0));
    facadeService.isMissed.and.returnValue(of(5));
    component.initListener();
    expect(component.wrongs).toBe(5);
  });

  it('should update hits to 10 if isHit emit 10', () => {
    facadeService.isMissed.and.returnValue(of(0));
    facadeService.isHit.and.returnValue(of(10));
    component.initListener();
    expect(component.hits).toBe(10);
  });

  it('should unsubscribe on destroy', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscription = mockSubscription;
    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
