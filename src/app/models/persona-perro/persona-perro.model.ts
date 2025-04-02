//import { Persona } from '../persona/persona.model';
//import { Perro } from '../perro/perro.model';

export interface Persona {
  id?: number;     // El ID es opcional porque solo se asigna al obtener o actualizar.
  nombre?: string;
  edad?: number;
}

export interface Perro {
  id?: number;
  nombre?: string;
  raza?: string;
}

export interface PersonaPerro {
  id?: number; // El ID es opcional
  personaId?: number; // ID de la persona
  perroId?: number;  // ID del perro
  //persona?: { id: number; nombre: string; edad: number }; // Información de la persona
  //perro?: { id: number; nombre: string; raza: string }; // Información del perro
  persona?: Persona; // Asegurar que persona es un objeto
  perro?: Perro;  
}
