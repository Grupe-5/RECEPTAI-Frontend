import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


export const reverseAuthGuard: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticated()){
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};
