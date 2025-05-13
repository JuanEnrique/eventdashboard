import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bbdd } from '../../services/bbdd.service';
import { Location } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [RouterModule,ModalComponent],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {

  constructor(private bbdd: Bbdd, private route: ActivatedRoute,private location: Location) {}

  showModal: boolean = false;
  errorModal: boolean = false;
  empleado: any = {};
  eventos: any = [];
  id: string= '';
  puestoencargado: string = 'No';
  puestocamarero: string = 'No';
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Convierte el ID a número
    });

    this.bbdd.getEmpleado(this.id).subscribe({
      next: (data) => {
        this.empleado = data.empleado;   // Objeto con los datos del empleado
        this.eventos = data.eventos;     // Array de eventos
        this.addPuesto();                // Lógica adicional

        console.log(this.eventos);
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

  saludos(){
    alert("Hola");
  }

    /*---Acciones con el modal del menú*/
  openModal() {
    this.showModal = true;
    
  };

  closeModal() {
    this.showModal = false;
  };

  closeerrorModal() {
    this.errorModal = false;
  };



}
