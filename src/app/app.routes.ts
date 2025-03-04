import { Routes } from '@angular/router';

import { EmpleadosComponent } from './Componentes/empleados/empleados.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { EventosComponent } from './Componentes/eventos/eventos.component';
import { CreacionComponent } from './Componentes/creacion/creacion.component';

export const routes: Routes = [

    { path: '', component: InicioComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'crear', component: CreacionComponent }, 
    { path: '**', redirectTo: '' } 

];