import { TokenStorageService } from './../service/token-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Permissions {
    constructor(private token: TokenStorageService) { }

    canActivate(): boolean {
        if (this.token.getToken()) {
            return true;
        } else {
            return false;
        }
    }

    isAdmin(): boolean {
        if (this.token.getAuthorities()[0] === 'ROLE_ADMIN') {
            return true;
        } else {
            return false;
        }
    }
}