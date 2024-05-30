import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {
  signupForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { username, email, password, confirmPassword } = this.signupForm.value;
  
      let errorMessage: string | null = null;
  
      switch (true) {
        case !username:
          errorMessage = "Please provide username!";
          break;
        case !email:
          errorMessage = "Please provide email!";
          break;
        case !password:
          errorMessage = "Please provide password!";
          break;
        case !confirmPassword:
          errorMessage = "Please repeat password!";
          break;
        case password !== confirmPassword:
          errorMessage = "Passwords don't match!";
          this.signupForm.patchValue({ password: '', confirmPassword: '' });
          break;
      }
  
      if (errorMessage) {
        this.toastr.error(errorMessage, "Register Error");
      } else {
        this.authService.Signup(username, email, password).subscribe(
          response => {
            this.router.navigate(['/']);
          },
          (errorMsg) => {
            let errorArr = errorMsg.error.errors;
            if(errorArr !== undefined){
              this.toastr.error(errorArr[Object.keys(errorArr)[0]][0], "Register Error");
            }else{
              let errorArr = errorMsg.error;
              this.toastr.error(errorArr[0].description, "Register Error");
            }
            this.signupForm.patchValue({ password: '', confirmPassword: '' });
          }
        );
      }
    }
  }
  
}
