import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PersonaService } from '../../services/persona/persona.service';
import { Persona } from '../../models/persona/persona.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../services/filter/filter.service';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss'],
})
export class PersonaComponent {
  personas: Persona[] = [];
  personasFiltradas: Persona[] = [];
  personasPaginadas: Persona[] = [];
  textoBusqueda: string = '';
  paginaActual: number = 1;
  elementosPorPagina: number = 10;
  totalPaginas: number = 0;
  mostrarModal: boolean = false;  // Control del modal
  personaAEliminarId: number | null = null;  // ID de la persona a eliminar

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private filterService: FilterService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    this.personaService.obtenerPersonas().subscribe((data) => {
      this.personas = data;
      this.personasFiltradas = data;
      this.calcularPaginacion();
    });
  }

  eliminarPersona(id: number): void {
    this.personaService.eliminarPersona(id).subscribe(() => {
      this.obtenerPersonas();
    });
  }

  irACrearPersona(): void {
    this.router.navigate(['/persona-create']);
  }

  irAEditarPersona(id: number): void {
    this.router.navigate([`/persona-update/${id}`]);
  }

  confirmarEliminarPersona(id: number): void {
    this.personaAEliminarId = id;  // Guardamos el id de la persona a eliminar
    this.mostrarModal = true;  // Mostramos el modal
  }

  eliminarPersonaConfirmada(): void {
    if (this.personaAEliminarId !== null) {
      this.eliminarPersona(this.personaAEliminarId);  // Realizamos la eliminación
      this.cerrarModal();  // Cerramos el modal
    }
  }

  cerrarModal(): void {
    this.mostrarModal = false;  // Ocultamos el modal
    this.personaAEliminarId = null;  // Limpiamos el id de la persona a eliminar
  }

  filtrarPersonas(): void {
    this.personasFiltradas = this.filterService.filtrar(this.personas, this.textoBusqueda);
    this.paginaActual = 1;  // Resetear la página actual al buscar
    this.calcularPaginacion();
  }

  calcularPaginacion(): void {
    const paginacion = this.paginationService.paginate(
      this.personasFiltradas,
      this.paginaActual,
      this.elementosPorPagina
    );
    this.totalPaginas = paginacion.totalPages;
    this.personasPaginadas = paginacion.paginatedData;
  }

  cambiarPagina(direccion: string): void {
    this.paginaActual = this.paginationService.changePage(
      this.paginaActual,
      direccion as 'previous' | 'next',
      this.totalPaginas
    );
    this.actualizarPersonasPaginadas();
  }

  actualizarPersonasPaginadas(): void {
    const paginacion = this.paginationService.paginate(
      this.personasFiltradas,
      this.paginaActual,
      this.elementosPorPagina
    );
    this.personasPaginadas = paginacion.paginatedData;
  }
}
