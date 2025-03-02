import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DestinationDetailsComponent } from './destination-details/destination-details.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  { path:'search-results', component: SearchResultsComponent },
  { path: 'destination-details/:id', component: DestinationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
