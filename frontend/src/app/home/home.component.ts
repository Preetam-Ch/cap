import { Component, HostListener, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  destinations: any[] = [];
  textterm: string = '';
  suggestions: any[] = [];
  filteredData: any[] = [];
  noResults: boolean = false;
  showDropDown: boolean = false;
  selectedIndex: number = -1;

  constructor(private service: ServiceService, private router:Router) {}


  ngOnInit(): void {
    this.fetchDestinations();

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      const searchBox = document.querySelector('.search-container');
      if (searchBox && !searchBox.contains(event.target as Node)) {
        this.showDropDown = false;
      }
    });
  }

  fetchDestinations(): void {
    this.service.getDestinations().subscribe(
      (data) => {
        this.destinations = data;
      },
      (error) => {
        console.error("Error fetching destinations:", error);
      }
    );
  }

  

  onSearch() {
    if (this.textterm.trim() === "") {
      this.suggestions = [];
      this.showDropDown = false;
      return;
    }
  
    // Filter destinations based on partial match
    this.suggestions = this.destinations.filter((item) =>
      item.title.toLowerCase().includes(this.textterm.toLowerCase())
    );
  
    // Show dropdown only if there are suggestions
    this.showDropDown = this.suggestions.length > 0;
  }
  
  

  selectSuggestion(suggestion: any) {
    this.textterm = suggestion.title;
    setTimeout(() => {
      this.showDropDown = false;
    }, 100);  // Explicitly hide dropdown
    this.suggestions = []; // Clear suggestions
    // this.filteredResults();
}


  filteredResults() {
    this.filteredData = this.destinations.filter(item =>
      item.title.toLowerCase().includes(this.textterm.toLowerCase())
    );
    this.noResults = this.filteredData.length === 0;
  }

  hideDropDown(): void {
    setTimeout(() => {
      this.showDropDown = false;
    }, 200);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (this.showDropDown && this.suggestions.length > 0) {
      if (event.key === 'ArrowDown') {
        this.selectedIndex = (this.selectedIndex + 1) % this.suggestions.length;
        this.textterm = this.suggestions[this.selectedIndex].title; // Update search bar
      } else if (event.key === 'ArrowUp') {
        this.selectedIndex = (this.selectedIndex - 1 + this.suggestions.length) % this.suggestions.length;
        this.textterm = this.suggestions[this.selectedIndex].title; // Update search bar
      } else if (event.key === 'Enter' && this.selectedIndex >= 0) {
        this.selectSuggestion(this.suggestions[this.selectedIndex]);
      }
    }
  }
  

  search() {
    if (this.textterm.trim() === '') {
      return;
    }
  
    const filteredResults = this.destinations.filter(item =>
      item.title.toLowerCase().includes(this.textterm.toLowerCase())
    );
  
    console.log("✅ Storing results in service:", filteredResults); // Debugging log
  
    this.service.setResults(filteredResults);  // Store results in service
  
    this.router.navigate(['/search-results'], { queryParams: { query: this.textterm } });
  }
  
  
  setActiveIndex(index: number) {
    this.selectedIndex = index;
  
    setTimeout(() => {
      const dropdown = document.querySelector('.dropdown-inner') as HTMLElement;
      const activeItem = document.querySelector('.dropdown-item.active') as HTMLElement;
  
      if (dropdown && activeItem) {
        dropdown.scrollTo({
          top: activeItem.offsetTop - dropdown.clientHeight / 2 + activeItem.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }, 50);
  }
  
  
  
  
  
}
