import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { FacadeService } from '../../services/facade.service';
import { of } from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['initGame', 'isGameFinished', 'restartGame']);
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService}
      ]
    });
    
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initGame on facadeService after onInit', () => {
    facadeService.isGameFinished.and.returnValue(of(true));
    component.ngOnInit();
    expect(facadeService.initGame).toHaveBeenCalled();
  });

  it('should call initListener after onInit', () => {
    spyOn(component, 'initListener');
    component.ngOnInit();
    expect(component.initListener).toHaveBeenCalled();
  });

  it('should update gameFinished to true if isGameFinished emit true', (done: DoneFn) => {
    expect(component.gameFinished)
      .withContext('before initListener')
      .toBeFalse();
    facadeService.isGameFinished.and.returnValue(of(true));
    component.initListener();
    setTimeout(() => {
      expect(component.gameFinished)
        .withContext('after initListener')
        .toBeTrue();
      done();
    }, 1001)
  });

  it('should update gameFinished to false if isGameFinished emit false', () => {
    component.gameFinished = true;
    expect(component.gameFinished)
      .withContext('after game finished')
      .toBeTrue();
    facadeService.isGameFinished.and.returnValue(of(false));
    component.initListener();
    expect(component.gameFinished)
      .withContext('after game restart')
      .toBeFalse();
  });

  it('should call restartGame on facadeService when handleNewGame is called', () => {
    component.handleNewGame();
    expect(facadeService.restartGame).toHaveBeenCalled();
  });

  it('should unsubscribe when ngOnDestroy is called', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscription = mockSubscription;
    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
