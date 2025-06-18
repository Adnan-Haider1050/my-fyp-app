import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';

  constructor(private http: HttpClient, private translate: TranslateService) {}

  subscribe() {
    if (!this.email || !this.email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: this.translate.instant('FOOTER.INVALID_TITLE'),
        text: this.translate.instant('FOOTER.INVALID_EMAIL'),
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    this.http.post('http://localhost:5000/api/subscribe', { email: this.email }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.translate.instant('FOOTER.SUCCESS_TITLE'),
          text: this.translate.instant('FOOTER.SUCCESS_TEXT'),
          timer: 2000,
          showConfirmButton: false
        });
        this.email = '';
      },
      error: (err) => {
        const msgKey = err.status === 409 ? 'FOOTER.ALREADY_TEXT' : 'FOOTER.ERROR_TEXT';
        Swal.fire({
          icon: 'error',
          title: this.translate.instant('FOOTER.ERROR_TITLE'),
          text: this.translate.instant(msgKey),
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
