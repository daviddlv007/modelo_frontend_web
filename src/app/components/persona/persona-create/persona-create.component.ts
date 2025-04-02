import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../../services/persona/persona.service';
import { Persona } from '../../../models/persona/persona.model';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-persona-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './persona-create.component.html',
  styleUrl: './persona-create.component.scss'
})
export class PersonaCreateComponent {
  persona: Persona = { id: 0, nombre: '', edad: 0 };

  constructor(
    private personaService: PersonaService,
    private router: Router  // Inyectamos el servicio de router
  ) {}

  // Función para crear la persona
  crearPersona(): void {
    this.personaService.crearPersona(this.persona).subscribe(() => {
      this.router.navigate(['/persona']);  // Redirige al componente principal después de crear
    });
  }

    // Función para cancelar y volver a la lista de personas
    cancelar(): void {
      this.router.navigate(['/persona']);  // Redirige a la lista de personas
    }
}
