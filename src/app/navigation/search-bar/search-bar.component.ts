import { Component, inject, ViewChild, ElementRef} from '@angular/core';
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { OverlayModule } from '@angular/cdk/overlay'
import {SerachBarService} from '../../../Services/search-bar.service'
import {SearchOverlayComponent} from './search-overlay/search-overlay.component'
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  imports: [MatIconButton, MatIcon, OverlayModule, SearchOverlayComponent, NgClass]
})
export class SearchBarComponent {
  constructor(private router: Router){}
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  searchBarService = inject(SerachBarService)
  overlayOpen = this.searchBarService.overlayOpen;
  showHistory = this.searchBarService.showHistory;
  searchTerm = this.searchBarService.searchTerm;

  search(searchTerm: string){
    if(!searchTerm)
      return;
    let retValue = this.searchBarService.search(searchTerm);
    if(retValue != undefined){
      this.router.navigate(['/f/', retValue]);
      this.searchInput.nativeElement.value = retValue;
    }
  }

  onSearchChange(searchTerm: string){
    if(!searchTerm){
      this.showHistory.set(true)
      return;
    }
    this.showHistory.set(false);
    this.searchBarService.searchSubFooddits(searchTerm)
  }

  outsideClick(){
    this.searchInput.nativeElement.value = "";
    this.overlayOpen.set(false);
  }
}
