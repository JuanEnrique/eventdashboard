import { Component } from '@angular/core';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {

  name = "Ana";
  age = 31;
  puesto = "Gerente";
  horas = 20;
}
