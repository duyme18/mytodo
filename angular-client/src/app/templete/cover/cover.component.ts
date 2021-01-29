import { Router } from '@angular/router';
import { TokenStorageService } from './../../service/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.router.navigate(['todo']);
    }
  }

  redirectLoginPage() {
    this.router.navigate(['login']);
  }
}
