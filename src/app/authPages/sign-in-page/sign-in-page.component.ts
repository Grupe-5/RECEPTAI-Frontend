import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  onSignIn(signInform: NgForm) {
    const { username, password } = signInform.form.controls;
    if(!signInform.form.invalid){
      this.authService.Login(username.value, password.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.toastr.error(
            'Invalid username and/or password!',
            'Sign-in Error'
          );
          signInform.resetForm();
        },
      });
    }else{
      if (!username.value) {
        this.toastr.error('Please provide username!', 'Sign-in Error');
      } else if (!password.value) {
        this.toastr.error('Please provide password!', 'Sign-in Error');
      } 
    }
  }
}
