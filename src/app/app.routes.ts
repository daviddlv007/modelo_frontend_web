import { Routes } from '@angular/router';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaCreateComponent } from './components/persona/persona-create/persona-create.component';
import { PersonaUpdateComponent } from './components/persona/persona-update/persona-update.component';
import { AutoComponent } from './components/auto/auto.component';
import { AutoCreateComponent } from './components/auto/auto-create/auto-create.component';
import { AutoUpdateComponent } from './components/auto/auto-update/auto-update.component';
import { PerroComponent } from './components/perro/perro.component';
import { PerroCreateComponent } from './components/perro/perro-create/perro-create.component';
import { PerroUpdateComponent } from './components/perro/perro-update/perro-update.component';


export const routes: Routes = [
  { path: 'persona', component: PersonaComponent },
  { path: 'persona-create', component: PersonaCreateComponent },
  { path: 'persona-update/:id', component: PersonaUpdateComponent },
  
  { path: 'auto', component: AutoComponent },
  { path: 'auto-create', component: AutoCreateComponent },
  { path: 'auto-update/:id', component: AutoUpdateComponent },

  { path: 'perro', component: PerroComponent },
  { path: 'perro-create', component: PerroCreateComponent },
  { path: 'perro-update/:id', component: PerroUpdateComponent }
];
