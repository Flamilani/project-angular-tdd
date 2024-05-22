import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { CardUiComponent } from '../../templates/UI/card-ui/card-ui.component';
import { IntegrationService } from '../../services/integration.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockIntegrationService: { login: any };
  let mockRouter;

  beforeEach(async () => {
    mockIntegrationService = {
      login: jest.fn()
    };
    mockRouter = {
      navigateByUrl: jest.fn()
    };
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CardUiComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [FormBuilder,
        { provide: IntegrationService, useValue: mockIntegrationService },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with two controls', () => {
    expect(component.formLogin.contains('email')).toBeTruthy();
    expect(component.formLogin.contains('password')).toBeTruthy();
  });

  describe('Validate the input email', () => {
    it('should make the email control required', () => {
      // Arrange (initializes variables)
      let control = component.formLogin.get('email');

      // Act (Executes the code)
      control?.setValue('');

      // Assert (Expected when the test passes or fails)
      expect(control?.valid).toBeFalsy();
    });

    it('should validate the email pattern when is invalid', () => {
      // Arrange
      let control = component.formLogin.get('email');

      // Act
      control?.setValue('invalidEmail');

      // Assert
      expect(control?.valid).toBeFalsy();
    });

    it('should validate the email pattern when is valid', () => {
      // Arrange
      let control = component.formLogin.get('email');

      // Act
      control?.setValue('valid@email.com');

      // Assert
      expect(control?.valid).toBeTruthy();
    });
  });

  describe('Validate the input password', () => {
    it('should make the password control required when is invalid', () => {
      // Arrange
      let control = component.formLogin.get('password');

      // Act
      control?.setValue('');

      // Assert
      expect(control?.valid).toBeFalsy();
    });

    it('should make the password control required when is valid', () => {
      // Arrange
      let control = component.formLogin.get('password');

      // Act
      control?.setValue('validPassword');

      // Assert
      expect(control?.valid).toBeTruthy();
    });
  });

  describe('Validate the button disabled', () => {
    it('should disable the button when the form is invalid', () => {
      // Arrange
      const button = fixture.debugElement.query(By.css('button')).nativeElement;

      // Initially, the form is invalid, so the button should be disabled
      expect(button.disabled).toBeTruthy();
    });

    it('should make the password control required if is valid', () => {
      // Arrange
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      let controlEmail = component.formLogin.get('email');
      let controlPassword = component.formLogin.get('password');

      // Make the form valid
      controlEmail?.setValue('valid.email@example.com');
      controlPassword?.setValue('validPassword');
      fixture.detectChanges(); // Update the view

      // Now the form is valid, so the button should be enabled
      expect(button.disabled).toBeFalsy();
    });
  });

  describe('Validate login in form', () => {
    it('should not call login if form is invalid', () => {
      // Arrange
      let controlEmail = component.formLogin.get('email');
      let controlPassword = component.formLogin.get('password');
      const form = component.formLogin;

      // Act
      controlEmail?.setValue('');
      controlPassword?.setValue('');
      component.onSubmit(form);

      expect(mockIntegrationService.login).not.toHaveBeenCalled();
    });
  });

});
