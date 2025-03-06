import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creacion',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './creacion.component.html',
  styleUrl: './creacion.component.css'
})
export class CreacionComponent {

  empleado: boolean = false;
  evento: boolean = false;
  showModal: boolean = false;

  nombre: string = '';

  actformempleado() {
    this.evento = false;
    this.empleado = true;
  }
  actformevento(){
    this.empleado = false;
    this.evento = true;
  };

  
  /*---Acciones con el modal del menú*/
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


}
