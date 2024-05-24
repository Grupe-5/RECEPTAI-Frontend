import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {
  signupForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { username, email, password, confirmPassword } = this.signupForm.value;
      // FIXME: Display info when confirm password doesn't match
      if (password != confirmPassword) {
        console.log('Password don\'t match');
        return;
      }
      this.authService.Signup(username, email, password).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Signup failed', error);
        
        }
      );
    }
  }
}
