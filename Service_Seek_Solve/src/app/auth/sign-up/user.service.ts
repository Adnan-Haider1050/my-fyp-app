import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../sign-up/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/users'; // change if port is different
  private tempFormData: FormData | null = null;
  constructor(private http: HttpClient) {}

  registerUser(userData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/signup`, userData);
}
loginUser(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials);
}
setTempFormData(data: FormData): void {
    this.tempFormData = data;
  }

  // ✅ Get the temporary stored data
  getTempFormData(): FormData | null {
    return this.tempFormData;
  }

  // ✅ Clear after successful registration
  clearTempFormData(): void {
    this.tempFormData = null;
  }

}
