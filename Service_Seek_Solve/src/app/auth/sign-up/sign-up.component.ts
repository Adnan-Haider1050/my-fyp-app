declare var google: any;

import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements AfterViewInit {
  isBuyer: boolean = true;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLocating: boolean = false;
  isSubmitting: boolean = false;
  showPassword: boolean = false;

  latitude: number | null = null;
  longitude: number | null = null;

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),

    // ✅ Pakistani phone number validation
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+92\d{10}$/)
    ]),

    password: new FormControl('', Validators.required),
    profileImage: new FormControl(''),
    location: new FormControl('', Validators.required),
    profession: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngAfterViewInit() {
    const input = document.getElementById("autocomplete") as HTMLInputElement;
    if (!input) return;

    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.latitude = lat;
        this.longitude = lng;

        this.signUpForm.patchValue({
          location: place.formatted_address
        });
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  detectLocation() {
    this.isLocating = true;

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      this.latitude = lat;
      this.longitude = lng;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng }, region: 'pk' }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === 'OK' && results.length) {
          const shahdaraAddress = results.find(r =>
            r.formatted_address.toLowerCase().includes('shahdara')
          );

          const bestAddress = shahdaraAddress ? shahdaraAddress.formatted_address : results[0].formatted_address;

          this.signUpForm.patchValue({ location: bestAddress });
        } else {
          Swal.fire({
  icon: 'error',
  title: this.translate.instant('POPUP.ADDRESS_NOT_FOUND_TITLE'),
  text: this.translate.instant('POPUP.ADDRESS_NOT_FOUND_TEXT'),
  confirmButtonColor: '#ef4444'
});

        }

        this.isLocating = false;
      });

    }, (err) => {
      Swal.fire({
  icon: 'error',
  title: this.translate.instant('POPUP.LOCATION_ERROR_TITLE'),
  text: this.translate.instant('POPUP.LOCATION_ERROR_TEXT'),
  confirmButtonColor: '#ef4444'
});


      console.error(err);
      this.isLocating = false;
    });
  }

  selectRole(isBuyer: boolean) {
    this.isBuyer = isBuyer;
    if (isBuyer) {
      this.signUpForm.patchValue({ profession: '' });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched(); 
      Swal.fire({
  icon: 'warning',
  title: this.translate.instant('POPUP.INCOMPLETE_FORM_TITLE'),
  text: this.translate.instant('POPUP.INCOMPLETE_FORM_TEXT'),
  confirmButtonColor: '#6366f1'
});

      return;
    }

    this.isSubmitting = true;
    const formValue = this.signUpForm.value;

    const formData = new FormData();
    formData.append('role', this.isBuyer ? 'seeker' : 'provider');
    formData.append('name', formValue.name || '');
    formData.append('email', formValue.email || '');
    formData.append('phoneNumber', formValue.phoneNumber || '');
    formData.append('password', formValue.password || '');
    

    formData.append('location', formValue.location || '');
    formData.append('profession', formValue.profession || '');

    if (this.latitude && this.longitude) {
      formData.append('latitude', this.latitude.toString());
      formData.append('longitude', this.longitude.toString());
    }

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile, this.selectedFile.name);
    }

    // ✅ Step 1: Send OTP request
    this.http.post('http://localhost:5000/api/send-otp', { phoneNumber: formValue.phoneNumber }).subscribe({
      next: (res: any) => {
        this.userService.setTempFormData(formData);
        localStorage.setItem('otp', res.otp.toString());

        Swal.fire({
  icon: 'info',
  title: this.translate.instant('POPUP.OTP_SENT_TITLE'),
  text: this.translate.instant('POPUP.OTP_SENT_TEXT'),
  confirmButtonColor: '#10b981'
});


        this.router.navigate(['/otp'], { queryParams: { phone: formValue.phoneNumber } });
      },
      error: () => {
        this.isSubmitting = false;

        Swal.fire({
  icon: 'error',
  title: this.translate.instant('POPUP.OTP_ERROR_TITLE'),
  text: this.translate.instant('POPUP.OTP_ERROR_TEXT'),
  confirmButtonColor: '#ef4444'
});

      }
    });
  }
}
