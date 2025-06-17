import { Component, OnInit } from '@angular/core';
import { servicesService } from './services.service';
import { DisplayService } from './servicefilter';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: DisplayService[] = [];
  searchTerm: string = ''; // Add this at the top with your other variables

 get filteredServices() {
  if (!this.searchTerm.trim()) return this.services;

  const lowerTerm = this.searchTerm.toLowerCase();

  return this.services.filter(service => {
    const nameMatch = service.name.toLowerCase().includes(lowerTerm);
    const professionMatch = service.profession.toLowerCase().includes(lowerTerm);

    // 🔍 Split location by comma, space, etc., and check if any part includes searchTerm
    const locationParts = service.location.toLowerCase().split(/[\s,]+/); // split by space or comma
    const locationMatch = locationParts.some(part => part.includes(lowerTerm));

    return nameMatch || professionMatch || locationMatch;
  });
}
  constructor(private servicesService:servicesService) {}

  ngOnInit(): void {
  this.servicesService.getAllProviders().subscribe(data => {
    this.services = data;
    // ✅ Console to check full data
    console.log("📦 Services data received:", this.services);

    // ✅ Check each image URL
    this.services.forEach(service => {
      console.log("📸 Image URL:", service.image);
    });
  });
}
}
