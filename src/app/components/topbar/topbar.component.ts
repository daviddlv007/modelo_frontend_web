import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  title = 'Mi Aplicación';
  menuOpen = false; // Estado del menú

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Cambiar el estado del menú
  }
}
