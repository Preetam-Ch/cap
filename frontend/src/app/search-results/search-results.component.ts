import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  filteredResults: any[] = [];
  noResults: boolean = false;
  showAnimation: boolean = false;

  constructor(private route: ActivatedRoute, private service: ServiceService, private router: Router) {}

  ngOnInit() {
    console.log("✅ SearchResultsComponent Loaded!");

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      console.log("✅ Search query received:", this.searchQuery);

      this.filteredResults = this.service.getResults();
      console.log("✅ Retrieved results:", this.filteredResults);

      // Check if results exist
      this.noResults = this.filteredResults.length === 0;
      console.log("⚠️ No results status:", this.noResults);
    });
  }

  // planeIcons = ["🛫", "🛩️", "✈️", "🛬", "🚀"];
  // selectedPlane: string = "";

  goToHome() {
    // this.selectedPlane = this.planeIcons[Math.floor(Math.random() * this.planeIcons.length)];
    this.showAnimation = true;

    setTimeout(() => {
      this.router.navigate(['']);
    }, 700);
  }

  

  // ✅ Improved `viewDetails` function
  viewDetails(item: any) {
    console.log("🛫 Navigating to details page for:", item.title);
    this.router.navigate(['/destination-details', item.id]); // Navigate to details page
  }



}
