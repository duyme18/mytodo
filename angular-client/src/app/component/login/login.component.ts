import { AlertService } from './../../service/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from './../../service/token-storage.service';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm?: FormGroup;
  loading = false;
  submitted = false;
  roles: string[] = [];
  userId: any;
  username: any;
  fullname: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      this.fullname = this.tokenStorage.getFullname();
    }
  }

  get f() { return this.loginForm?.controls; }

  onSubmit(): void {

    this.submitted = true;

    if (this.loginForm?.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm?.value).subscribe(
      data => {
        this.tokenStorage.saveUserId(data.id);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveFullname(data.fullname);
        this.tokenStorage.saveAuthorities(data.roles);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.roles = this.tokenStorage.getUser().roles;
        this.userId = this.tokenStorage.getUserId();
        this.router.navigate(['']);

      },
      err => {
        this.loading = false;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
