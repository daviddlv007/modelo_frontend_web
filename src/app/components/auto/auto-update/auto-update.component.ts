import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoService } from '../../../services/auto/auto.service';
import { PersonaService } from '../../../services/persona/persona.service';
import { Auto } from '../../../models/auto/auto.model';
import { Persona } from '../../../models/persona/persona.model';

@Component({
  selector: 'app-auto-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './auto-update.component.html',
  styleUrl: './auto-update.component.scss'
})
export class AutoUpdateComponent implements OnInit {
  auto: Auto = { marca: '', modelo: '', persona: { id: 0, nombre: '' } };
  personas: Persona[] = [];

  constructor(
    private autoService: AutoService,
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.autoService.obtenerAutoPorId(id).subscribe((data) => {
        this.auto = data;
      });
    }

    this.personaService.obtenerPersonas().subscribe((data) => {
      this.personas = data;
    });
  }

  actualizarAuto(): void {
    if (this.auto.id) {
      this.autoService.actualizarAuto(this.auto.id, this.auto).subscribe(() => {
        this.router.navigate(['/auto']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/auto']);
  }
}
