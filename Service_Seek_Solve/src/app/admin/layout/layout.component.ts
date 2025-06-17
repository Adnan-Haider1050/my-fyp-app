import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isSidebarVisible = true;
  role: string | null = null; // admin / provider / seeker

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
