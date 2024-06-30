import { Directive, ElementRef, OnInit, inject, input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  selector: 'img[appUseUserImgOrPlaceholder]'
})
export class UseImgOrPlaceholderDirective implements OnInit{
  imgId = input.required<number | undefined>();
  imgType = input.required<'user' | 'recipe'>();

  private server = environment.apiUrl + '/api/image/';
  private userAvatarPlaceHolder = '../../../assets/imgs/user-avatar.png';
  private recipePlaceHolder = '../../../assets/imgs/recipe-img-dummy.jpg';
  private elRef = inject(ElementRef);
  
  ngOnInit() {
    const el = this.elRef.nativeElement;

    if (this.imgId() != undefined) {
      el.src = this.server + this.imgId(); 
    } 
    else if(this.imgType() == 'user') {
      el.src = this.userAvatarPlaceHolder;
    } else if(this.imgType() == 'recipe') {
      el.src = this.recipePlaceHolder;
    }
  }
}
