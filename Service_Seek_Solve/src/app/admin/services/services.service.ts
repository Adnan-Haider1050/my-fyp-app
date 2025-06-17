import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DisplayService } from './servicefilter';
import { Userr } from './userr';

@Injectable({ providedIn: 'root' })
export class servicesService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  // ✅ All service providers
  getAllProviders(): Observable<DisplayService[]> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<Userr[]>(this.apiUrl, { headers }).pipe(
  map((users) => {
    const backendServices: DisplayService[] = users
      .filter((user) => user.role === 'provider')
      .map((user) => ({
        id: user._id,
        name: user.name,
        profession: user.profession,
        phone: user.phoneNumber,
        location: user.location,
        image: user.profileImage
          ? `http://localhost:5000${user.profileImage}`
          : 'assets/images/test1.jpg',
      }));

    return backendServices;
  }),

      catchError((error) => {
        console.error('❌ Error fetching providers:', error.message);
        return of([]); // 👈 Return empty array if error
      })
    );
  }

  // ✅ Logged-in user profile only
  getMyProfile(): Observable<DisplayService> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<any>('http://localhost:5000/api/users/me', { headers }).pipe(
      map((user) => ({
        id: user._id,
        name: user.name,
        profession: user.profession,
        phone: user.phoneNumber,
        location: user.location,
        image: user.profileImage
          ? `http://localhost:5000${user.profileImage}`
          : 'assets/images/test1.jpg',
      })),
      catchError((error) => {
        console.error('❌ Error fetching logged-in user:', error.message);
        return of(); // 👈 return empty Observable if error
      })
    );
  }
  getUserStats(): Observable<{ total: number; providers: number; seekers: number }> {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  return this.http.get<any[]>('http://localhost:5000/api/users/stats', { headers }).pipe(
    map((users) => {
      const total = users.length;
      const providers = users.filter((u) => u.role === 'provider').length;
      const seekers = users.filter((u) => u.role === 'seeker').length;

      return { total, providers, seekers };
    }),
    catchError((error) => {
      console.error('❌ Error fetching user stats:', error.message);
      return of({ total: 0, providers: 0, seekers: 0 });
    })
  );
}

}
