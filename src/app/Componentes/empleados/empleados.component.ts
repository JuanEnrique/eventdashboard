import { Component, OnInit } from '@angular/core';
import { empleado } from '../../Modelos/empleado.model';
import { CreacionempleadoComponent } from '../creacionempleado/creacionempleado.component';
import { Bbdd } from '../../services/bbdd.service';



@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CreacionempleadoComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent /*implements OnInit*/{

  formempleado: boolean = false;
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

}


