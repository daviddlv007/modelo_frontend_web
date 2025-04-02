import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  // Método para filtrar datos
  filtrar<T extends Record<string, any>>(data: T[], searchText: string): T[] {
    if (!data || !searchText) {
      return data;
    }
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
}
