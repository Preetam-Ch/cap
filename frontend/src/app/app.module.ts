import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { PracticeComponent } from './practice/practice.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { SearchResultsComponent } from './search-results/search-results.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchbarComponent,
    PracticeComponent,
    HomeComponent,
    SearchResultsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
