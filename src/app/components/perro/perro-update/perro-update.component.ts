import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PerroService } from '../../../services/perro/perro.service';
import { PersonaService } from '../../../services/persona/persona.service';
import { PersonaPerroService } from '../../../services/persona-perro/persona-perro.service';
import { Perro } from '../../../models/perro/perro.model';
import { Persona } from '../../../models/persona/persona.model';
import { PersonaPerro } from '../../../models/persona-perro/persona-perro.model';

@Component({
  selector: 'app-perro-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perro-update.component.html',
  styleUrls: ['./perro-update.component.scss'],
})
export class PerroUpdateComponent implements OnInit {
  perro: Perro = { id: 0, nombre: '', raza: '' };
  personas: Persona[] = [];
  selectedPersonas: Persona[] = [];
  personaSeleccionada: Persona | null = null;

  constructor(
    private perroService: PerroService,
    private personaService: PersonaService,
    private personaPerroService: PersonaPerroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.perroService.obtenerPerroPorId(id).subscribe((data) => {
        this.perro = data;
  
        // Obtener las relaciones entre el perro y las personas
        this.personaPerroService.obtenerPersonaPerros().subscribe((personaPerros) => {
          // Filtrar las relaciones que corresponden al perro actual
          const personasRelacionadas = personaPerros.filter(p => p.perro?.id === this.perro.id);
          
          // Agregar las personas relacionadas a selectedPersonas
          this.selectedPersonas = personasRelacionadas
          .map(rel => rel.persona)  // Extraemos las personas
          .filter((persona): persona is Persona => persona !== undefined);  // Filtramos undefined
        
          
          // Filtrar las personas que ya están vinculadas al perro
          this.personas = this.personas.filter(persona => 
            !this.selectedPersonas.some(selected => selected.id === persona.id)
          );
        });
      });
    }
    this.cargarPersonas();
  }
  

  cargarPersonas(): void {
    this.personaService.obtenerPersonas().subscribe((personas) => {
      this.personas = personas;
    });
  }

  addPersonaToSelected(persona: Persona | null): void {
    if (persona) {
      this.selectedPersonas.push(persona);
      this.personas = this.personas.filter(p => p.id !== persona.id);
    }
    this.personaSeleccionada = null;
  }

  removePersonaFromSelected(persona: Persona): void {
    this.selectedPersonas = this.selectedPersonas.filter(p => p.id !== persona.id);
    this.personas.push(persona);
  }

  actualizarPerro(): void {
    if (this.perro.id) {
      this.perroService.actualizarPerro(this.perro.id, this.perro).subscribe((updatedPerro) => {
        // Obtener las relaciones existentes entre personas y perro
        this.personaPerroService.obtenerPersonaPerros().subscribe((relacionesExistentes) => {
          // Eliminar las relaciones que ya no estén seleccionadas
          const idsRelacionadasExistentes = relacionesExistentes.filter(r => r.perro?.id === updatedPerro.id)
            .map(r => r.persona?.id);
          const personasParaEliminar = relacionesExistentes.filter(relacion => 
            relacion.perro?.id === updatedPerro.id && 
            !this.selectedPersonas.some(persona => persona.id === relacion.persona?.id)
          );
  
          // Eliminar las relaciones que ya no están seleccionadas
          personasParaEliminar.forEach((relacion) => {
            // Verificar que el ID no sea undefined antes de eliminar
            if (relacion.id !== undefined) {
              this.personaPerroService.eliminarPersonaPerro(relacion.id).subscribe();
            }
          });
          
  
          // Agregar las nuevas relaciones seleccionadas
          this.selectedPersonas.forEach((persona) => {
            // Verifica si la relación ya existe antes de intentar agregarla
            if (!idsRelacionadasExistentes.includes(persona.id)) {
              const personaPerro: PersonaPerro = {
                persona: { id: persona.id },
                perro: { id: updatedPerro.id }
              };
              this.personaPerroService.crearPersonaPerro(personaPerro).subscribe();
            }
          });
  
          // Redirigir después de la actualización
          this.router.navigate(['/perro']);
        });
      });
    }
  }
  
  

  cancelar(): void {
    this.router.navigate(['/perro']);
  }
}
