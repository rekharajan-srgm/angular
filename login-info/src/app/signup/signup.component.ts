import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordChecker } from '../custom-validators/password-checker';
import { UserlistService } from '../service/userlist.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  title = 'login-info';
  registerForm: FormGroup;
  submitted: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userlistservice: UserlistService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTandC: [false, Validators.requiredTrue],
      },
      {
        Validators: PasswordChecker('password', 'confirmPassword'),
   
      }
    );
  }
  get h() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) return;
    console.table(this.registerForm.value);
    console.table(this.registerForm);
    alert('Success Signup\n' + JSON.stringify(this.registerForm.value));
    this.userlistservice.handleSignUp(this.registerForm.value);

     
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
