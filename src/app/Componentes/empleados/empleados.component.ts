import { Component, OnInit } from '@angular/core';
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
  empleadoSeleccionado: any = null;

  constructor(private bbdd: Bbdd) {}

  ngOnInit() {
    this.cargarUsuarios();
  }
  
  cargarUsuarios() {
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

  getPuesto(encargado: number, camarero: number) {
    let puesto = "No asignado"
    if (encargado == 1 && camarero == 1) puesto = "Encargado y Camarero";
    if (encargado == 1 && camarero != 1) puesto = "Encargado";
    if (encargado != 1 && camarero == 1) puesto =  "Camarero";
    return puesto;

  }

  modificarEmpleado(emp: any) {
    this.empleadoSeleccionado = emp;
    this.formempleado = true;
  }


  recargarDatos() {
    console.log("Entra");
    
    this.formempleado = false; 
    this.empleadoSeleccionado = null;
    this.cargarUsuarios();
    
  }

}


