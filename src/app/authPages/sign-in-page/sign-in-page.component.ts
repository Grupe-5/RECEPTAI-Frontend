import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  onSignIn() {
    const { username, password } = this.loginForm.value;
    if (!username) {
      this.toastr.error('Please provide username!', 'Sign-in Error');
    } else if (!password) {
      this.toastr.error('Please provide password!', 'Sign-in Error');
    } else {
      this.authService.Login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.toastr.error(
            'Invalid username and/or password!',
            'Sign-in Error'
          );
          this.loginForm.patchValue({ password: '' });
        }
      });
    }
  }
}
