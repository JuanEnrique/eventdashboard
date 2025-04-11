import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreacioneventoComponent } from '../creacionevento/creacionevento.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Bbdd } from '../../services/bbdd.service';
import { ɵBrowserAnimationBuilder } from '@angular/animations';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [ReactiveFormsModule, CreacioneventoComponent],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {

  btnevento: boolean = false;
  router = inject(Router);
  evento: any[] = [];

  constructor(private bbdd: Bbdd) {}

  ngOnInit() {
    this.bbdd.getEventos().subscribe({
      next: (data) => {
        this.evento = data;
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
      }
    });
  }

  actformevento(){
    this.btnevento ? this.btnevento = false : this.btnevento = true;
  }

  verDetalle(id: string) {
    this.router.navigate(['/evento', id]);
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
    
      return `${día} de ${mes}`;
    }
  }
  Carrito(pizza: boolean,kebeb: boolean,mexicana: boolean,ham_perrito: boolean){
    
  }
}
