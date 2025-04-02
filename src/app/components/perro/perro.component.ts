import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PerroService } from '../../services/perro/perro.service';
import { PersonaPerroService } from '../../services/persona-perro/persona-perro.service';
import { Perro } from '../../models/perro/perro.model';
import { PersonaPerro } from '../../models/persona-perro/persona-perro.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../services/filter/filter.service';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-perro',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './perro.component.html',
  styleUrls: ['./perro.component.scss'],
})
export class PerroComponent {
  perros: Perro[] = [];
  perrosFiltrados: Perro[] = [];
  perrosPaginados: Perro[] = [];
  personaPerros: PersonaPerro[] = [];
  textoBusqueda: string = '';
  paginaActual: number = 1;
  elementosPorPagina: number = 5;
  totalPaginas: number = 0;

  // Modal de eliminación
  mostrarModalEliminar: boolean = false;
  perroAEliminarId: number | null = null;

  // Modal de ver personas vinculadas
  mostrarModalPersonas: boolean = false;

  constructor(
    private perroService: PerroService,
    private personaPerroService: PersonaPerroService,
    private router: Router,
    private filterService: FilterService,
    private paginationService: PaginationService
  ) {}

  ngOnInit() {
    this.obtenerPerros();
  }

  obtenerPerros(): void {
    this.perroService.obtenerPerros().subscribe((data) => {
      this.perros = data;
      this.perrosFiltrados = data;
      this.calcularPaginacion();
    });
  }

  verPersonasPorPerro(id: number): void {
    this.personaPerroService.obtenerPersonaPerros().subscribe((data) => {
      this.personaPerros = data.filter(pp => pp.perro?.id === id);
      this.mostrarModalPersonas = true; // Mostrar el modal de personas vinculadas
    });
  }

  cerrarModalPersonas(): void {
    this.mostrarModalPersonas = false;
    this.personaPerros = [];
  }

  eliminarPerro(id: number): void {
    this.perroService.eliminarPerro(id).subscribe(() => {
      this.obtenerPerros();
    });
  }

  irACrearPerro(): void {
    this.router.navigate(['/perro-create']);
  }

  irAEditarPerro(id: number): void {
    this.router.navigate([`/perro-update/${id}`]);
  }

  // Funciones relacionadas con el modal de eliminación de un perro
  confirmarEliminarPerro(id: number): void {
    this.perroAEliminarId = id;  // Guardar el id del perro a eliminar
    this.mostrarModalEliminar = true;  // Mostrar el modal de eliminación
  }

  eliminarPerroConfirmado(): void {
    if (this.perroAEliminarId !== null) {
      this.eliminarPerro(this.perroAEliminarId);  // Eliminar el perro
      this.cerrarModalEliminar();  // Cerrar el modal de eliminación
    }
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;  // Cerrar el modal de eliminación
  }

  // Función para filtrar perros
  filtrarPerros(): void {
    this.perrosFiltrados = this.filterService.filtrar(this.perros, this.textoBusqueda);
    this.paginaActual = 1;
    this.calcularPaginacion();
  }

  calcularPaginacion(): void {
    const paginacion = this.paginationService.paginate(
      this.perrosFiltrados,
      this.paginaActual,
      this.elementosPorPagina
    );
    this.totalPaginas = paginacion.totalPages;
    this.perrosPaginados = paginacion.paginatedData;
  }

  cambiarPagina(direccion: string): void {
    this.paginaActual = this.paginationService.changePage(
      this.paginaActual,
      direccion as 'previous' | 'next',
      this.totalPaginas
    );
    this.actualizarPerrosPaginados();
  }

  actualizarPerrosPaginados(): void {
    const paginacion = this.paginationService.paginate(
      this.perrosFiltrados,
      this.paginaActual,
      this.elementosPorPagina
    );
    this.perrosPaginados = paginacion.paginatedData;
  }
}
