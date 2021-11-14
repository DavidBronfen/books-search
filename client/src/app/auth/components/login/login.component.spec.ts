import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { AnimatedBackgroundComponent } from '../animated-background/animated-background.component';

describe('Login component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let nameControl: AbstractControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        AnimatedBackgroundComponent
      ],
      imports: [
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [ provideMockStore({}) ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    nameControl = fixture.componentInstance.name;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit method', () => {
    spyOn(component, 'submitUSer');
    const element = fixture.debugElement.query(By.css('.submit-button')).nativeElement;
    element.click();
    expect(component.submitUSer).toHaveBeenCalledTimes(1);
  });

  describe('Empty input', () => {
    beforeEach(() => {
      nameControl.markAllAsTouched();
      fixture.detectChanges();
    });

    it('should has required validator', () => {
      expect(nameControl.hasError('required')).toBeTruthy();
    });

    it('should have required error displayed', () => {
      expect(nameControl.hasError('required')).toBeTruthy();
    });

    it('should check button is disabled', (() => {
      const button = fixture.debugElement.query(By.css('.submit-button'));
      expect(button.nativeElement.disabled).toBe(true);
    }));
  });
});
