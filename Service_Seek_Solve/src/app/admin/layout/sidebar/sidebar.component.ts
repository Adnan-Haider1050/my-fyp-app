import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
@Output() closeSidebar = new EventEmitter<void>();

  onClose() {
    this.closeSidebar.emit();
  }
}
