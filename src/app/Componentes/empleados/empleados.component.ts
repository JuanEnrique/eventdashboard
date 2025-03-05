import { Component } from '@angular/core';
import { empleado } from '../../Modelos/empleado.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

  empleados:empleado[] = [
    new empleado("Juan", "Pérez", "Juanito el de los palotes", "juan@example.com", "123456789", "12345678A", "123456789012", "Desarrollador", 40, "ES123456789", 1),
    new empleado("María", "López", "ML", "maria@example.com", "987654321", "87654321B", "987654321098", "Diseñadora", 35, "ES987654321", 2),
    new empleado("Carlos", "Gómez", "CG", "", "654123987", "32165487C", "654321987654", "Gerente", 45, "ES654321987", 3),
    new empleado("Laura", "Fernández", "LF", "laura@example.com", "741852963", "36985214D", "852741963852", "Contadora", 38, "ES852741963", 4),
    new empleado("Pedro", "Martínez", "PM", "pedro@example.com", "159753468", "14725836E", "159753468159", "Recursos Humanos", 30, "ES159753468", 5)
  ]

}
