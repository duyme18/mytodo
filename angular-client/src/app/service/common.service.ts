import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public totalUsers = 0;
  public totalUsers$ = new BehaviorSubject<number>(0);

  constructor() { }

  public setTotalUsers(total: number) {
    this.totalUsers = total;
    this.totalUsers$.next(total);
  }

  public incrementsetTotalUsers() {
    this.totalUsers++;
    this.totalUsers$.next(this.totalUsers);
  }
}
