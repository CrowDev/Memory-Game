import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { FacadeService } from '../../services/facade.service';
import { of } from 'rxjs';
import * as expectedImages from '../../util/mock-data.json';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['isWrong', 'isGameRestarted', 'areActionsBlocked', 'corrects', 'handlePlay']);
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService}
      ]
    });
    
    fixture = TestBed.createComponent(CardComponent);
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

  it('should update revealed to false if isWrong emit true', () => {
    component.revealed = true;
    facadeService.corrects = [];
    facadeService.isGameRestarted.and.returnValue(of(false));
    facadeService.areActionsBlocked.and.returnValue(of(false));
    facadeService.isWrong.and.returnValue(of(true));
    component.initListener();
    expect(component.revealed)
      .withContext('after initListener')
      .toBeFalse();
  });

  it('should do nothing if isWrong emit true and current card is correct', () => {
    component.revealed = true;
    component.uuid = '111';
    facadeService.corrects = ['111'];
    facadeService.isGameRestarted.and.returnValue(of(false));
    facadeService.areActionsBlocked.and.returnValue(of(false));
    facadeService.isWrong.and.returnValue(of(true));
    component.initListener();
    expect(component.revealed)
      .withContext('after initListener')
      .toBeTrue();
  });

  it('should update revealed to false if isGameRestarted emit true', () => {
    component.revealed = true;
    facadeService.corrects = [];
    facadeService.isGameRestarted.and.returnValue(of(true));
    facadeService.areActionsBlocked.and.returnValue(of(false));
    facadeService.isWrong.and.returnValue(of(false));
    component.initListener();
    expect(component.revealed)
      .withContext('after initListener')
      .toBeFalse();
  });

  it('should update isBlocked to true if areActionsBlocked emit true', () => {
    component.isBlocked = false;
    facadeService.corrects = [];
    facadeService.isGameRestarted.and.returnValue(of(false));
    facadeService.isWrong.and.returnValue(of(false));
    facadeService.areActionsBlocked.and.returnValue(of(true));
    component.initListener();
    expect(component.isBlocked)
      .withContext('after initListener')
      .toBeTrue();
  });

  it('should set uuid', () => {
    component.entry = expectedImages.entries[0];
    fixture.detectChanges();
    expect(component.uuid).toBe('f0753a4f-87b2-484d-aeb1-a22c3278cb50');
  });

  it('should call handlePlay on facadeService when handleClick is called', () => {
    component.uuid = '111';
    component.index = 1;
    facadeService.corrects = [];
    component.handleClick();
    expect(facadeService.handlePlay).toHaveBeenCalledWith({uuid: '111', index: 1});
  });

  it('should reveal card when handleClick is called and is not block or is current card', () => {
    component.revealed = false;
    component.isBlocked = false;
    facadeService.corrects = [];
    component.uuid = '111';
    component.index = 1;
    component.handleClick();
    expect(component.revealed).toBeTrue();
  });

  it('should do nothing when handleClick is called and is block or current card is correct', () => {
    component.revealed = false;
    component.isBlocked = true;
    component.handleClick();
    expect(component.revealed).toBeFalse();
    component.isBlocked = false;
    component.uuid = '111';
    facadeService.corrects = ['111'];
    component.handleClick();
    expect(component.revealed).toBeFalse();
  });

  it('should unsubscribe when ngOnDestroy is called', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscriptions = mockSubscription;
    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
