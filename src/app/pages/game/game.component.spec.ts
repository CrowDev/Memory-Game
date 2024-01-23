import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { FacadeService } from '../../services/facade.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let facadeServiceStub: Partial<FacadeService>;

  facadeServiceStub = {
    
  }

  beforeEach(async () => {
    const facadeService = jasmine.createSpyObj('FacadeService', ['initGame', 'isGameFinished', 'restartGame']);
    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
