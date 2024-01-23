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
});
