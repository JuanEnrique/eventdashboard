import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bbdd } from '../../services/bbdd.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {

  constructor(private bbdd: Bbdd, private route: ActivatedRoute,private location: Location) {}

  empleado: any = {};
  id: string= '';
  puestoencargado: string = 'No';
  puestocamarero: string = 'No';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Convierte el ID a número
    });

    this.bbdd.getEmpleado(this.id).subscribe({
      next: (data) => {
        this.empleado = data;
        this.addPuesto();
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
      }
      
    });

    

  }

  addPuesto(){
    if(this.empleado.encargado == 1){
      this.puestoencargado = 'Si';
    }
    else{
      this.puestoencargado = 'No';
    }
    if(this.empleado.camarero == 1){
      this.puestocamarero = 'Si';
    }
    else{
      this.puestocamarero = 'No';
    }
  }

}
