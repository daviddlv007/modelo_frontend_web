import { TestBed } from '@angular/core/testing';

import { PersonaPerroService } from './persona-perro.service';

describe('PersonaPerroService', () => {
  let service: PersonaPerroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaPerroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
