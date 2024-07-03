import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword:  new FormControl('')
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  onSignup() {
    const { username, email, password, confirmPassword } =
      this.signupForm.value;

    let errorMessage: string | null = null;

    switch (true) {
      case !username:
        errorMessage = 'Please provide username!';
        break;
      case !email:
        errorMessage = 'Please provide email!';
        break;
      case !password:
        errorMessage = 'Please provide password!';
        break;
      case !confirmPassword:
        errorMessage = 'Please repeat password!';
        break;
      case password !== confirmPassword:
        errorMessage = "Passwords don't match!";
        this.signupForm.patchValue({ password: '', confirmPassword: '' });
        break;
    }

    if (errorMessage) {
      this.toastr.error(errorMessage, 'Register Error');
    } else {
      this.authService.Signup(username, email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (errorMsg) => {
          const errorArr = errorMsg.error.errors;
          if (errorArr !== undefined) {
            this.toastr.error(
              errorArr[Object.keys(errorArr)[0]][0],
              'Register Error'
            );
          } else {
            const errorArr = errorMsg.error;
            this.toastr.error(errorArr[0].description, 'Register Error');
          }
          this.signupForm.patchValue({ password: '', confirmPassword: '' });
        }
      });
    }
  }
}
