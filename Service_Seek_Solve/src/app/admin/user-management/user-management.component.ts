import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
allUsers: any[] = [];
searchText: string = ''; // 🔍 for input binding
filteredUsers: any[] = []; // 👈 for filtered list
selectedUserForDelete: any = null;
selectedUserForEdit: any = null;
  constructor(private http: HttpClient,private translate: TranslateService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:5000/api/users/stats', { headers }).subscribe({
      next: (users) => {
        this.allUsers = users;
        this.filteredUsers = users;
      },
      error: (err) => {
        console.error('❌ Failed to load users:', err.message);
      }
    });
  }
onSearchChange() {
  const search = this.searchText.toLowerCase().trim();
  this.filteredUsers = this.allUsers.filter((user) =>
    user.name.toLowerCase().includes(search) ||
    user.email.toLowerCase().includes(search)
  );
}
  toggleUserStatus(user: any) {
    // Placeholder action
    user.isBlocked = !user.isBlocked;
    // Optionally: call backend to update block status
  }

  // onSearchChange() {
  //   const search = this.searchText.toLowerCase().trim();
  //   this.filteredUsers = this.allUsers.filter((user) =>
  //     user.name.toLowerCase().includes(search) ||
  //     user.email.toLowerCase().includes(search)
  //   );
  // }

  confirmDelete(user: any) {
    this.selectedUserForDelete = user;
  }

  cancelDelete() {
    this.selectedUserForDelete = null;
  }

  deleteUser() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete(`http://localhost:5000/api/users/${this.selectedUserForDelete._id}`, { headers }).subscribe({
      next: () => {
        this.allUsers = this.allUsers.filter(u => u._id !== this.selectedUserForDelete._id);
        this.filteredUsers = this.filteredUsers.filter(u => u._id !== this.selectedUserForDelete._id);
        this.selectedUserForDelete = null;
        Swal.fire({
  icon: 'success',
  title: this.translate.instant('USER.DELETE_SUCCESS_TITLE'),
  text: this.translate.instant('USER.DELETE_SUCCESS_TEXT'),
  timer: 2000,
  showConfirmButton: false
});
      },
      error: (err) => {
        console.error('❌ Failed to delete user:', err.message);
        Swal.fire({
    icon: 'error',
    title: this.translate.instant('USER.DELETE_ERROR_TITLE'),
    text: this.translate.instant('USER.DELETE_ERROR_TEXT'),
    timer: 2000,
    showConfirmButton: false
  });
      }
    });
  }
  openEditModal(user: any) {
  // Clone user to avoid live changes
  this.selectedUserForEdit = { ...user };
}
cancelEdit() {
  this.selectedUserForEdit = null;
}
updateUser() {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  this.http.put(`http://localhost:5000/api/users/${this.selectedUserForEdit._id}`, this.selectedUserForEdit, { headers })
    .subscribe({
      next: (res) => {
        this.getAllUsers(); // Refresh list
        this.selectedUserForEdit = null;
       Swal.fire({
  icon: 'success',
  title: this.translate.instant('USER.UPDATE_SUCCESS_TITLE'),
  text: this.translate.instant('USER.UPDATE_SUCCESS_TEXT'),
  timer: 2000,
  showConfirmButton: false
});// Close modal
      },
      error: (err) => {
        console.error('❌ Failed to update user:', err.message);
        Swal.fire({
  icon: 'error',
  title: this.translate.instant('USER.UPDATE_ERROR_TITLE'),
  text: this.translate.instant('USER.UPDATE_ERROR_TEXT'),
  timer: 2000,
  showConfirmButton: false
});
      }
    });
}
}
