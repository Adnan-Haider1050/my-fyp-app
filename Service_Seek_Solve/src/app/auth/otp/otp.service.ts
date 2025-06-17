import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OtpService {
  constructor(private http: HttpClient) {}

  sendOtp(phone: string, otp: number) {
    return this.http.post('http://localhost:5000/api/send-otp', {
      phone,
      otp
    });
  }
}
