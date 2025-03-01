import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private searchResults: any[] = [];  // Store search results

  constructor(private http: HttpClient) { }

  getDestinations(): Observable<any> {
    return this.http.get('http://localhost:3000/destinationGuides');
  }

  // Store search results
  // setResults(results: any[]) {
  //   console.log("✅ Storing results in service:", results);  // Log results before storing
  //   this.searchResults = results;
  //   localStorage.setItem('searchResults', JSON.stringify(results));  // Store in localStorage
  // }

  setResults(results: any[]) {
    console.log("✅ Results saved in service:", results);
    this.searchResults = results;
  }
  
  saveResults(results: any[]) {
    console.log("✅ Storing results in localStorage:", results);
    localStorage.setItem('searchResults', JSON.stringify(results));
}



  // Retrieve search results
  getResults(): any[] {
    return this.searchResults;
  }
}
