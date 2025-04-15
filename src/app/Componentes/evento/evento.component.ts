import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bbdd } from '../../services/bbdd.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {

  constructor(private bbdd: Bbdd, private route: ActivatedRoute,private location: Location) {}

  evento: any = {};
  eventoempleado: any = [];
  encargado: string = "";
  camareros: string[] = [];
  id: number= 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el ID a número
    });

    this.bbdd.getEvento(this.id).subscribe({
      next: (data) => {
        /*this.evento = data;*/
        this.evento = data.evento;
        this.eventoempleado = data.empleados;
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
      }
    });
  }

  cargarTrabajadores() {

    this.eventoempleado.forEach((emp: any) => {
      if(emp.puesto == "camarero"){
        this.camareros.push(emp.nombre);  // Agregamos el nombre al array
      }
      else{
        this.encargado = emp.nombre;  // Agregamos el nombre al array
      }
    });

  }

  calcularDiasRestantes(fechaObjetivo: string): number {
    const fechaHoy = new Date();
    const fechaFinal = new Date(fechaObjetivo);
    
    // Calcular la diferencia en días utilizando la diferencia de tiempo
    return Math.ceil((fechaFinal.getTime() - fechaHoy.getTime()) / (1000 * 3600 * 24));
  }
  
  goBack(): void {
    this.location.back();
  }

  formatDate(fecha: string): string {
    if (fecha === null || fecha === undefined) {
      return '';
    }
    else{
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      
      const partes = fecha.split('T')[0].split('-');
      const mes = meses[+partes[1] - 1];
      const día = partes[2];
      const año = partes[0];
    
      return `${día} / ${mes} / ${año}`;
    }
  }



  introducirTrabajadores() {
    /*this.bbdd.getDisponibilidad(this.id).subscribe({
      next: (data) => {
        this.evento = data;
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
      }
    });*/

    this.cargarTrabajadores();

  }
  


}
