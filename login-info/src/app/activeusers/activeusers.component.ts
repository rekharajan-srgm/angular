import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserlistService } from '../service/userlist.service';
@Component({
  selector: 'app-activeusers',
  templateUrl: './activeusers.component.html',
  styleUrls: ['./activeusers.component.css']
})
export class ActiveusersComponent implements OnInit {
  firstName: string;
  onlineflag:Boolean;
  users: User[];
  constructor(private router: Router,
    private userListService: UserlistService,) { }

  ngOnInit(): void {
  }

}
