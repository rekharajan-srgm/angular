import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../model/User';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserlistService } from '../service/userlist.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent implements OnInit {
  public user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _userlistService:UserlistService) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  
  ngOnInit(): void {
    this.user = this.data;
  }
  update_data(){
    console.log("updated data is below");
    console.log(this.data);
    this._userlistService.updateUser(this.data.firstName,this.data);
  }
}
