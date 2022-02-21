import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserlistService } from '../service/userlist.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userlistService: UserlistService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: [''],
      password: [''],
    });
  }

  login(): void {
    var response_promise: Promise<Object> = this.userlistService.checkPassword(
      this.loginForm.value.firstName,
      this.loginForm.value.password
    );
    response_promise
      .then((response) => {
        console.log('login result = ' + JSON.stringify(response));
        var login_response = JSON.parse(JSON.stringify(response)); 
        if (login_response.result == 'OK') {
          this.cookieService.set('user-id',this.loginForm.value.firstName);
          console.log('trying to navigate');
          this.router.navigate(['/dashboard/']);
        } else {
          // say wrong password and stay in login page.
          console.log('Wrong username or password');
          this.loginForm.reset();
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.log('error occured');
        // say wrong password and stay in login page.
        console.log('Wrong username or password');
        this.loginForm.reset();
        this.router.navigate(['/login']);
      });
  }
}
