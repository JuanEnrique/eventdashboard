import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-creacion',
  standalone: true,
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './creacion.component.html',
  styleUrl: './creacion.component.css'
})
export class CreacionComponent {

  empleado: boolean = false;
  evento: boolean = false;
  showModal: boolean = false;

  






/*_______________________________________Recogida de datos de los FORM___________________________________*/


formulario_empleado: FormGroup;
formulario_evento: FormGroup;

constructor() {

  this.formulario_empleado = new FormGroup({
    nombre: new FormControl('',[Validators.minLength(3)]),
    apellido: new FormControl('',[Validators.minLength(3)]),
    alias: new FormControl('',[Validators.minLength(3)]),
    email: new FormControl('',[Validators.minLength(3)]),
    telefono: new FormControl('',[Validators.minLength(3)]),
    dni:new FormControl('',[Validators.minLength(3)]),
    nss: new FormControl('',[Validators.minLength(3)]),
    puesto: new FormControl('',[Validators.minLength(3)]),
    horas: new FormControl('',[Validators.minLength(3)]),
    iban: new FormControl('',[Validators.minLength(3)]),
    docprev: new FormControl('',[Validators.minLength(3)])
  });
  this.formulario_evento = new FormGroup({

  });



}

onSubmit_empleado() {
  if (this.formulario_empleado.valid) {
    console.log('Formulario enviado:', this.formulario_empleado.value);
    console.log('Formulario enviado:', this.formulario_empleado.value.nombre);
  } else {
    console.log('Formulario no válido');
  }
}

onSubmit_evento() {
  if (this.formulario_empleado.valid) {
    console.log('Formulario enviado:', this.formulario_empleado.value);
    console.log('Formulario enviado:', this.formulario_empleado.value.nombre);
  } else {
    console.log('Formulario no válido');
  }
}


/*__________________________________________________________________________*/



























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
  };

  closeModal() {
    this.showModal = false;
  };

  /* Prueba */

  prueba(){
    console.log("Prueba");
  };

}
