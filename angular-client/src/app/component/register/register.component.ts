import { AlertService } from './../../service/alert.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
      this.alertService.success('Regítration successful', true);
      this.router.navigate(['login']);
    },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
