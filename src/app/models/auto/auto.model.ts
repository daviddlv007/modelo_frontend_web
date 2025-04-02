// src/app/models/auto/auto.model.ts

export interface Auto {
    id?: number; // El ID es opcional porque solo se asigna al obtener o actualizar.
    marca: string;
    modelo: string;
    persona: { id: number; nombre: string }; // Almacenamos el ID de la persona pero mostramos el nombre
  }
  