import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { first, firstValueFrom } from 'rxjs';
import { trusted } from 'mongoose';
import { userInfo } from 'os';

let header = new HttpHeaders();
header.set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root',
})
export class UserlistService {
  
  constructor(private _httpClient: HttpClient) {}

  handleSignUp(formValue: any): void {
    var successCallBack = (response: any) => {
      console.log('POST call successful value returned in body', response);
    };

    var errorCallBack = (response: any) => {
      console.log('POST call in error', response);
    };

    var completedCallBack = () => {
      console.log('The POST observable is now completed.');
    };

    this._httpClient
      .post('http://localhost:3000/api/user', formValue, { headers: header })
      .subscribe(successCallBack, errorCallBack, completedCallBack);
  }

  checkPassword(username: string, password: string): any {
    let success: boolean = false;
    var geturl =
      'http://localhost:3000/api/validate/' + username + '/' + password;

    const promise = firstValueFrom( this._httpClient.get(geturl));
    console.log('userlistsvc: returning value from checkpassword ' + success);
    return promise;
  }

updateUser(firstName:String,data:any):any{
const promise=firstValueFrom(this._httpClient.put("http://localhost:3000/api/user/"+firstName,{lastName:data.lastName,email:data.email}));
return promise;
console.log("this is"+JSON.stringify(firstName));
}
  deleteUser(firstName:String):any{
    const promise = firstValueFrom(this._httpClient.delete("http://localhost:3000/api/user/"+firstName));
    return promise;
  }

  getUserList():any {
      const promise = firstValueFrom(this._httpClient.get('http://localhost:3000/api/user'));
      return promise;
  }
}
