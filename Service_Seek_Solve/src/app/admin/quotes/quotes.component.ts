import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuotesService } from './quotes.service';
import { servicesService } from '../services/services.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    message: '',
    providerId: '' // ✅ Add this field
  };

  providerData: any;

  constructor(
    private requestService: QuotesService,
    private route: ActivatedRoute,
    private serviceService: servicesService
  ) {}

  ngOnInit() {
    const providerId = this.route.snapshot.paramMap.get('id');
    this.formData.providerId = providerId ?? '';

    this.serviceService.getAllProviders().subscribe((providers) => {
      const found = providers.find(p => p.id === providerId);
      if (found) this.providerData = found;
    });
  }

  submitRequest() {
    this.requestService.createRequest(this.formData).subscribe({
      next: () => {
        alert('✅ Request submitted successfully!');
        this.formData = {
          name: '',
          email: '',
          message: '',
          providerId: this.formData.providerId // retain ID
        };
      },
      error: (err) => {
        console.error('❌ Error submitting request:', err);
      }
    });
  }
}
