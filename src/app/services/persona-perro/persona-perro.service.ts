// persona-perro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaPerro } from '../../models/persona-perro/persona-perro.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonaPerroService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerPersonaPerros(): Observable<PersonaPerro[]> {
    return this.http.get<PersonaPerro[]>(`${this.apiUrl}/persona-perro`);
  }

  obtenerPersonaPerroPorId(id: number): Observable<PersonaPerro> {
    return this.http.get<PersonaPerro>(`${this.apiUrl}/persona-perro/${id}`);
  }

  crearPersonaPerro(personaPerro: PersonaPerro): Observable<PersonaPerro> {
    return this.http.post<PersonaPerro>(`${this.apiUrl}/persona-perro`, personaPerro);
  }

  actualizarPersonaPerro(id: number, personaPerro: PersonaPerro): Observable<PersonaPerro> {
    return this.http.put<PersonaPerro>(`${this.apiUrl}/persona-perro/${id}`, personaPerro);
  }

  eliminarPersonaPerro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/persona-perro/${id}`);
  }
}
