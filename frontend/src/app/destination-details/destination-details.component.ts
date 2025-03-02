import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {

  destination: any;

  constructor(private route: ActivatedRoute, private dservice: ServiceService) { }

  ngOnInit() {
    // Subscribe to paramMap to handle dynamic route changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.dservice.getDestinationById(id).subscribe({
          next: (data) => {
            console.log('✅ Destination data received:', data);
            this.destination = data;
          },
          error: (error) => {
            console.error('❌ Error fetching destination details:', error);
          }
        });
      } else {
        console.error('⚠️ No ID found in route.');
      }
    });
  }
}