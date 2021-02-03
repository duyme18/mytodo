import { TokenStorageService } from './../../service/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username?: string;
  fullname?: string;
  email?: string;
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.username = user.username;
      this.fullname = user.fullname;
      this.email = user.email;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
  }
}
