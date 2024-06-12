import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SerachBarService } from '../../../../Services/search-bar.service';
import { MatIcon } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss',
  imports: [MatDivider, MatListModule, MatIcon, BrowserModule],
})
export class SearchOverlayComponent {
  constructor(private router: Router) {}

  searchBarServie = inject(SerachBarService);
  recentSearcher = this.searchBarServie.recentSearcher;
  currentSearcher = this.searchBarServie.currentSearcher;
  randomSearcher = this.searchBarServie.randomSearcher;
  showHistory = this.searchBarServie.showHistory;
  searchTerm = this.searchBarServie.searchTerm;

  deleteRecentSearch(searchTerm: string) {
    this.searchBarServie.deleteFromRecentSearch(searchTerm);
  }

  navigate(searchTerm: string) {
    this.searchBarServie.search(searchTerm);
    this.router.navigate(['/f/', searchTerm]);
    this.searchTerm.set(searchTerm);
  }
}
