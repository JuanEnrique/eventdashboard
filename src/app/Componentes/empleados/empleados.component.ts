import { Component, OnInit } from '@angular/core';
import { empleado } from '../../Modelos/empleado.model';
import { CreacionempleadoComponent } from '../creacionempleado/creacionempleado.component';
import { Bbdd } from '../../services/bbdd.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';



@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CreacionempleadoComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent /*implements OnInit*/{

  formempleado: boolean = false;
  router = inject(Router);
  usuarios: any[] = [];

  constructor(private bbdd: Bbdd) {}

  ngOnInit() {
    this.bbdd.getEmpleados().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
      }
    });
  }

  actformempleado() {
    this.formempleado ? this.formempleado = false : this.formempleado = true;
  }

  verDetalle(id: string) {
    this.router.navigate(['/empleado', id]);
  }

}


