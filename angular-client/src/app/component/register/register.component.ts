import { AlertService } from './../../service/alert.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MustMatch } from 'src/app/helper/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm?: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm?.controls; }

  onSubmit() {

    this.submitted = true;

    this.alertService.clear();

    if (this.registerForm?.invalid) {
      return;
    }

    this.loading = true;

    this.authService.register(this.registerForm?.value).pipe(first()).subscribe(data => {
      alert('Regítration successful!');
      this.router.navigate(['login']);
    },
      error => {
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    );
  }
}
