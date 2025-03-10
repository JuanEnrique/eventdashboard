import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-creacionempleado',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creacionempleado.component.html',
  styleUrl: './creacionempleado.component.css'
})
export class CreacionempleadoComponent {




  formulario_empleado: FormGroup;
  mostrarActo = false;
  constructor() {
  
    this.formulario_empleado = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      alias: new FormControl(''),
      email: new FormControl(''),
      telefono: new FormControl(''),
      dni:new FormControl(''),
      nss: new FormControl(''),
      puesto: new FormControl(''),
      horas: new FormControl(''),
      iban: new FormControl(''),
      docprev: new FormControl('',)
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



}
