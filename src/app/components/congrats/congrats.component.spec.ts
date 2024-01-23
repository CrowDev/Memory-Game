import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratsComponent } from './congrats.component';
import { FacadeService } from '../../services/facade.service';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['getUser']);
    await TestBed.configureTestingModule({
      imports: [CongratsComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService }
      ]
    });
    
    fixture = TestBed.createComponent(CongratsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUser on facadeService', () => {
    facadeService.getUser.and.returnValue('User');
    expect(component.user).toBe('User');
  });

  it('should emit onNewGame when handleNewGame is called', () => {
    spyOn(component.onNewGame, 'emit');
    component.handleNewGame();
    expect(component.onNewGame.emit).toHaveBeenCalled();
  });
});
