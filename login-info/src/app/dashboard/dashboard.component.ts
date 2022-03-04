import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/User';
import { UserlistService } from '../service/userlist.service';
import { ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DelDialogComponent } from '../del-dialog/del-dialog.component'; 
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  firstName: string;
  users: User[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'Edit',
    'Delete',
  ];
  dataSource = this.users;
  @ViewChild('userlistTable') userlistTable: MatTable<any>;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userListService: UserlistService,
    private formbuilder: FormBuilder,public dialog: MatDialog
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
    response_user.then((data: User[]) => {
      this.users = data;
    });
  }

  onSignout(): void {
    console.log('trying to navigate');
    this.cookieService.delete('user-id');
    this.router.navigate(['/login']);
  }

  onEdit(index: number) {
   /* const update_promise=this.userListService.updateUser(this.users[index].firstName);*/
   this.openUpdateDialog(index);
  }

  onRemove(index: number) {
    //https://stackoverflow.com/questions/51280234/angular-refresh-table-after-delete-record-using-material-table-and-rest-api
    const delete_promise = this.userListService.deleteUser(
      this.users[index].firstName
    );
    delete_promise.then((data: string) => {
      console.log('delete message ' + data);
      console.log(this.users[index].firstName);
    });
    this.users.splice(index, 1);
    this.userlistTable.renderRows();
    this.openDialog();
  }
  openDialog() {
    this.dialog.open(DelDialogComponent );
  }
  openUpdateDialog(index:number){
    this.dialog.open(UpdateDialogComponent,{data:this.users[index]});
    
  }
}
 