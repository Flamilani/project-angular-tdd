import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { emailPattern } from '../../shared/validators/validator';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../../shared/validators/interfaces/authData.interface';
import { IntegrationService } from '../../services/integration.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  invalidLogin?: boolean;

  error = null;
  email: string = '';
  password: string = '';

  control: string = 'email';
  nameInput: string = 'Email address';
  required: boolean = true;

  emailPattern = emailPattern;

  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private integrationService: IntegrationService,
    private authService: AuthService
  ) {

  }

  buildForm(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern(this.emailPattern)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.integrationService.login(email, password);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.router.navigateByUrl('/home');
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  signIn(credentials: any) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result)
          this.router.navigate(['/']);
        else
          this.invalidLogin = true;
      });
  }

}
