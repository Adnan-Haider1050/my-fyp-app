import { Component, OnInit } from '@angular/core';
import { servicesService } from '../../services/services.service';
import { DisplayService } from '../../services/servicefilter';

@Component({
  selector: 'app-seeker-dashboard',
  templateUrl: './seeker-dashboard.component.html',
  styleUrls: ['./seeker-dashboard.component.css']
})
export class SeekerDashboardComponent implements OnInit {
  userProfile!: DisplayService; // 👈 Profile data holder

  constructor(private service: servicesService) {}

  ngOnInit(): void {
    this.service.getMyProfile().subscribe((profile) => {
      this.userProfile = profile;
    });
  }
}
