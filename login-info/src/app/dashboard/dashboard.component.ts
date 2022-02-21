import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/User';
import { UserlistService } from '../service/userlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  firstName: string;
  users: User[];
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userListService: UserlistService
  ) {
    console.log('I am in dashboard - Constructor');
    this.firstName = this.cookieService.get('user-id');
    this.users = [];
  }

  ngOnInit(): void {
    console.log('I am in dashboard - ngInit');
    if (this.firstName == '') {
      this.onSignout();
    }
    const response_user = this.userListService.getUserList();
    response_user.then((data:User[])=>{
      this.users = data;
      console.log('printing ' + this.users);
    });
  }
  onSignout(): void {
    console.log('trying to navigate');
    this.router.navigate(['/login']);
  }
}
