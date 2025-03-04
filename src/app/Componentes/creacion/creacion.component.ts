import { Component } from '@angular/core';

@Component({
  selector: 'app-creacion',
  standalone: true,
  imports: [],
  templateUrl: './creacion.component.html',
  styleUrl: './creacion.component.css'
})
export class CreacionComponent {

  empleado: boolean = false;
  evento: boolean = false;

  actformempleado() {
    this.evento = false;
    this.empleado = true;
  }
  actformevento(){
    this.empleado = false;
    this.evento = true;
  };

}
