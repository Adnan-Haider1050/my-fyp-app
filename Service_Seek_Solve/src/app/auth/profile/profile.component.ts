import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
user: any;
editUser: any = {};
isEditModalOpen = false;

constructor(private http: HttpClient) {}

ngOnInit() {
  this.fetchProfile();
}

fetchProfile() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  this.http.get('http://localhost:5000/api/users/profile', { headers }).subscribe({
    next: (res: any) => {
      this.user = res;
    },
    error: (err) => {
      console.error('❌ Failed to fetch profile:', err.message);
    }
  });
}

openEditModal() {
  this.editUser = { ...this.user }; // Clone
  this.isEditModalOpen = true;
}

updateProfile() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  this.http.put(`http://localhost:5000/api/users/${this.user._id}`, this.editUser, { headers }).subscribe({
    next: () => {
      this.fetchProfile();
      this.isEditModalOpen = false;
    },
    error: (err) => {
      console.error('❌ Error updating profile:', err.message);
    }
  });
}
}
