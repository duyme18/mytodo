import { TokenStorageService } from './../../service/token-storage.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    fullname: null,
    phoneNumber: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, fullname, phoneNumber, email, password } = this.form;

    this.authService.register(username, fullname, phoneNumber, email, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        alert('Sign Up Success!');
        this.router.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
