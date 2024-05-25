import { Injectable, effect, signal } from '@angular/core';
import { SubfoodditService } from './subfooddit.service'
import { Subfooddit } from '../Models/Subfooddit.model';

@Injectable({
  providedIn: 'root'
})
// TODO: LIMIT AMOUNT OF THINGS THAT CAN BE DISPLAYED
// TODO: Show no history if nothing to show

export class SerachBarService {
    overlayOpen = signal(false);
    showHistory = signal(true)
    recentSearcher = signal<string[]>(JSON.parse(window.localStorage.getItem('recentSearches') ?? '[]'));
    currentSearcher = signal<string[]>([])
    allSubFooddits: string[];
    searchTerm = signal('');
    sfTitles: string [];

    constructor (private subfoodditService: SubfoodditService){}
    
    initSubFoodditNames(){
      this.subfoodditService.getSubfooddits().subscribe((subFooddits: Subfooddit[]) =>{
        this.sfTitles = subFooddits.map(subfooddit => subfooddit.title);
        this.allSubFooddits = this.sfTitles;
        this.currentSearcher.set(this.sfTitles)
      })
    }

    search(searchTerm: string): string{
      this.searchSubFooddits(searchTerm)
      this.overlayOpen.set(false);
      this.searchTerm.set(this.currentSearcher()[0])
      this.addToRecentSearches(this.currentSearcher()[0])
      return this.currentSearcher()[0]
    }

    searchSubFooddits(searchTerm: string){
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const searchTerms = lowerCaseSearchTerm.split(' ');

      let newSearch: string[] = this.allSubFooddits.filter(sf => {
          const lowerCaseItem = sf.toLowerCase();
          return searchTerms.every(term => lowerCaseItem.includes(term));
      });

      this.currentSearcher.set(newSearch)
    }
    
    addToRecentSearches(searchTerm: string){
      this.recentSearcher.set([searchTerm, ...this.recentSearcher().filter(s => s.toLocaleLowerCase() !== searchTerm.toLocaleLowerCase())])
    }

    deleteFromRecentSearch(searchTerm: string){
      this.recentSearcher.set(this.recentSearcher().filter(s => s != searchTerm))
    }

    saveLocalStorage = effect(() =>{
      window.localStorage.setItem('recentSearches', JSON.stringify(this.recentSearcher()))
    })
}
