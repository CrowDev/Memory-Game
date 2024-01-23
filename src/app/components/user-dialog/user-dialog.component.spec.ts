import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogComponent } from './user-dialog.component';
import { FacadeService } from '../../services/facade.service';
import { FormControl, FormGroup } from '@angular/forms';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;
  let facadeService: jasmine.SpyObj<FacadeService>;

  beforeEach(async () => {
    facadeService = jasmine.createSpyObj('FacadeService', ['isUserStored', 'storeUser']);
    await TestBed.configureTestingModule({
      imports: [UserDialogComponent],
      providers: [
        { provide: FacadeService, useValue: facadeService}
      ]
    });
    
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showDialog to true if isUserStored return false', () => {
    facadeService.isUserStored.and.returnValue(false);
    component.setVisibility();
    expect(component.showDialog).toBeTrue();
  });

  it('should set showDialog to false if isUserStored return true', () => {
    facadeService.isUserStored.and.returnValue(true);
    component.setVisibility();
    expect(component.showDialog).toBeFalse();
  });

  it('should call setVisibility and setForm after onInit', () => {
    spyOn(component, 'setVisibility');
    spyOn(component, 'setForm');
    component.ngOnInit();
    expect(component.setVisibility).toHaveBeenCalled();
    expect(component.setForm).toHaveBeenCalled();
  });

  it('should set showDialog to false after called onSubmit', (done: DoneFn) => {
    component.showDialog = true;
    component.form = new FormGroup({
      name: new FormControl('test')
    });
    component.onSubmit();
    setTimeout(() => {
      expect(component.showDialog).toBeFalse();
      done();
    }, 1001);
  });
});
