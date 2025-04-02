import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonaService } from '../../../services/persona/persona.service';
import { Persona } from '../../../models/persona/persona.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-persona-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './persona-update.component.html',
  styleUrl: './persona-update.component.scss'
})
export class PersonaUpdateComponent implements OnInit {
  persona: Persona = { id: 0, nombre: '', edad: 0 };

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.personaService.obtenerPersonaPorId(id).subscribe((data) => {
        this.persona = data;
      });
    }
  }

  actualizarPersona(): void {
    if (this.persona.id) {
      this.personaService.actualizarPersona(this.persona.id, this.persona).subscribe(() => {
        this.router.navigate(['/persona']); // Redirige tras la actualización
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/persona']);
  }
}
