import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
role: string = '';
ngOnInit(): void {
    // Role nikaal lo local storage se (yehi wali line important hai)
    const storedRole = localStorage.getItem('role');
    console.log("stored role:",storedRole)
    if (storedRole) {
      this.role = storedRole;
    } else {
      // agar direct user object chahiye to
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsed = JSON.parse(userData);
        this.role = parsed.role; // fallback option
      }
    }
  }
}
