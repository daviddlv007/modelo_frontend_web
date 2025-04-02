import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  sidebarVisible = true;

  toggleSidebar() {
    console.log('Sidebar antes de toggle:', this.sidebarVisible);
    this.sidebarVisible = !this.sidebarVisible;
    console.log('Sidebar después de toggle:', this.sidebarVisible);
  }
}
