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
  id: number= 0;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el ID a número
    });

    this.bbdd.getEvento(this.id).subscribe({
      next: (data) => {
        this.evento = data;
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
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


}
