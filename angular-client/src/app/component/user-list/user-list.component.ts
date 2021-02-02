import { CommonService } from './../../service/common.service';
import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  totalUser = 0;
  constructor(private userService: UserService,
    private common: CommonService) { }

  ngOnInit(): void {
    this.getUsers();

    this.common.totalUsers$.subscribe((total) => {
      this.totalUser = total;
    });

    if (this.common.totalUsers === 0) {
      this.userService.getUsers().subscribe((data) => {
        this.common.setTotalUsers(data.length);
      })
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
      this.common.setTotalUsers(data.length);
    });
  }



  deleteUser(userId: number) {
    if (window.confirm('Are you sure you want to delete this account?')) {
      this.userService.deleteUser(userId).subscribe((result) => {
        this.getUsers();
      });
    }
  }
}