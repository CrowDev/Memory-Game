import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { FacadeService } from '../../services/facade.service';
import * as expectedImages from '../../util/mock-data.json';
import { of } from 'rxjs';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['getEntries']);
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService}
      ]
    });
    
    fixture = TestBed.createComponent(BoardComponent);
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

  it('should update entries after getEntries emit a value', () => {
    expect(component.entries.length)
      .withContext('before initListener')
      .toBe(0);
    const { entries } = expectedImages;
    facadeService.getEntries.and.returnValue(of(entries));
    component.initListener();
    expect(component.entries.length)
      .withContext('after initListener')
      .toBe(entries.length);
  });

  it('should unsubscribe on destroy', () => {
    const mockSubscription = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscription = mockSubscription;
    component.ngOnDestroy();
    expect(mockSubscription.unsubscribe).toHaveBeenCalled();
  });
});
