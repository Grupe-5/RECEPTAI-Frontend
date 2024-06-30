import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, fromEvent } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';

@Directive({
  selector: '[appAuthenticated]',
})
export class AuthenticatedDirective implements OnInit, OnDestroy {
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  private elRef = inject(ElementRef);
  subscriptionToElementClick = new Subscription();
  
  ngOnInit() {
    const el = this.elRef.nativeElement;
    
    this.subscriptionToElementClick = fromEvent(el, 'click', { capture: true })
    .subscribe((e: unknown) => {
        if(!this.authService.isAuthenticated()){
          this.toastr.error('You have to sign-in first!', 'Auth Error');
          (e as Event).stopPropagation()
        }
      }); 
  }

  ngOnDestroy() {
    this.subscriptionToElementClick.unsubscribe();
  }

}
