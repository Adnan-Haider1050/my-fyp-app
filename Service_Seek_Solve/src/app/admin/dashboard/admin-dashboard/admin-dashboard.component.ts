import { Component, OnInit } from '@angular/core';
import { servicesService } from '../../services/services.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  totalProviders = 0;
  totalSeekers = 0;

  constructor(private service: servicesService) {}

  ngOnInit(): void {
    this.service.getUserStats().subscribe((stats) => {
      this.totalUsers = stats.total;
      this.totalProviders = stats.providers;
      this.totalSeekers = stats.seekers;
    });
  }
}
