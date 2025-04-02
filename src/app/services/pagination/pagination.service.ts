import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor() {}

  // General method to calculate pagination
  paginate<T>(data: T[], currentPage: number, itemsPerPage: number) {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      totalPages,
      paginatedData: data.slice(start, end),
    };
  }

  // Method to change pages
  changePage(currentPage: number, direction: 'previous' | 'next', totalPages: number) {
    if (direction === 'previous' && currentPage > 1) {
      currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
      currentPage++;
    }

    return currentPage;
  }
}
