

import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../services/servicefilter';
import { servicesService } from '../../services/services.service';
import { QuotesService } from '../../quotes/quotes.service';

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  userProfile!: DisplayService;
  requests: any[] = []; // All submitted requests
  selectedUserForDelete: any = null; // For modal
  totalRequests: number = 0;
completedRequests: number = 0;

  constructor(
    private service: servicesService,
    private requestService: QuotesService
  ) {}

  ngOnInit(): void {
    this.fetchRequests();
    this.service.getMyProfile().subscribe((profile) => {
      this.userProfile = profile;
    });
  }

  fetchRequests() {
    this.requestService.getAllRequests().subscribe((res: any) => {
      this.requests = res;

       this.totalRequests = res.length;
       this.completedRequests = res.filter((req: any) => req.status === 'completed').length;

    });
  }

  // Show modal
  confirmDelete(req: any) {
    this.selectedUserForDelete = req;
  }

  // Cancel modal
  cancelDelete() {
    this.selectedUserForDelete = null;
  }

  // Actual deletion
  deleteUser() {
    if (!this.selectedUserForDelete) return;

    this.requestService.deleteRequest(this.selectedUserForDelete._id).subscribe(() => {
      this.requests = this.requests.filter(r => r._id !== this.selectedUserForDelete._id);
      this.selectedUserForDelete = null;
    });
  }

  markAsCompleted(id: string) {
  this.requestService.completeRequest(id).subscribe(() => {
    this.fetchRequests(); // Refresh the list after completion
  });
}
}
