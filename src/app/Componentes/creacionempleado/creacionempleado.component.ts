import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Bbdd } from '../../services/bbdd.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  router = inject(Router);
  constructor(private bbdd: Bbdd, private route: ActivatedRoute) {
  
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
      this.insertEmpleado();
    } else {
      console.log('Formulario no válido');
    }
  }

  insertEmpleado() {
  
    this.bbdd.insertEmpleado(this.formulario_empleado.value).subscribe({
      
      next: (response: any) => {
        if (response.existe) {
          alert(response.mensaje); // "Este evento ya está registrado."
        } else {
          alert(response.mensaje); // "Este evento no está registrado."
        }
      },
      error: (error) => {
        console.error("Error en la verificación:", error);
        alert("Hubo un problema al verificar el empleado.");
      }
    });
  }



}
