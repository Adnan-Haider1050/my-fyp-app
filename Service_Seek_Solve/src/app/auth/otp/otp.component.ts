import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../sign-up/user.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  phone: string = '';
  userOtp: string = '';
  verified: boolean = false;
  error: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private http: HttpClient,
    private translate:TranslateService
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  verifyOtp() {
    const storedOtp = localStorage.getItem('otp');

    if (this.userOtp === storedOtp) {
      this.verified = true;
      this.error = false;

      Swal.fire({
        icon: 'success',
        title: 'OTP Verified',
        text: 'Your phone number has been successfully verified!',
        confirmButtonColor: '#10b981'
      });

      const formData = this.userService.getTempFormData();

      if (!formData) {
        Swal.fire('Error', 'Signup data not found', 'error');
        return;
      }

      // ✅ Register user
      this.userService.registerUser(formData).subscribe({
        next: () => {
          this.userService.clearTempFormData();
          localStorage.removeItem('otp');

          Swal.fire({
  icon: 'success',
  title: this.translate.instant('OTP.VERIFIED_TITLE'),
  text: this.translate.instant('OTP.VERIFIED_TEXT'),
  confirmButtonColor: '#10b981'
});

          setTimeout(() => this.router.navigate(['/login']), 1500);
        },
        error: () => {
         Swal.fire({
  icon: 'error',
  title: this.translate.instant('OTP.SIGNUP_FAILED_TITLE'),
  text: this.translate.instant('OTP.SIGNUP_FAILED_TEXT'),
  confirmButtonColor: '#ef4444'
});
        }
      });

    } else {
      this.verified = false;
      this.error = true;

      Swal.fire({
  icon: 'error',
  title: this.translate.instant('OTP.INCORRECT_TITLE'),
  text: this.translate.instant('OTP.INCORRECT_TEXT'),
  confirmButtonColor: '#ef4444'
});
    }
  }
}
