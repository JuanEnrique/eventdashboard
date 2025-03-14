import { Component} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreacioneventoComponent } from '../creacionevento/creacionevento.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Bbdd } from '../../services/bbdd.service';

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

  eventosjson=[
    {
      "identificador": "EXP-2025-001",
      "nombre_centro": "IES Los Olivos",
      "curso": "2º de Bachillerato",
      "fecha": "2025-06-15",
      "poblacion": "Sevilla",
      "lugar_acto": "Auditorio Municipal",
      "hora_acto": "18:00",
      "numgraduados_acto": 120,
      "numfamiliares_acto": 300,
      "audiovisuales": "Pantalla LED y proyector",
      "anotaciones_acto": "Entrega de diplomas con música en directo",
      "lugar_cena": "Restaurante La Almazara",
      "hora_cena": "21:00",
      "numalumnos_cena": 110,
      "nprofesores_cena": 15,
      "anotaciones_cena": "Menú especial para veganos",
      "menu_cena": "Entrantes variados, solomillo o merluza, postre de tarta de queso",
      "lugar_fiesta": "Discoteca Sunset",
      "hora_fiesta": "23:30",
      "numgratuidades_fiesta": 5,
      "numasistentes_fiesta": 130,
      "sonido_profesional": true,
      "iluminacion_robotica": true,
      "dj_profesional": true,
      "fotografo": true,
      "barra_libre_refrescos": true,
      "fotomaton": true,
      "plataforma_360": true,
      "recena_pizza": true,
      "tatuajes": true,
      "intolerancias_fiesta": "Sin gluten disponible",
      "anotaciones_fiesta": "Zona VIP reservada"
      
    },
    {
      "identificador": "EXP-2025-002",
      "nombre_centro": "Colegio San José",
      "curso": "4º de ESO",
      "fecha": "2025-06-20",
      "poblacion": "Madrid",
      "lugar_acto": "Salón de actos del colegio",
      "hora_acto": "17:30",
      "numgraduados_acto": 80,
      "numfamiliares_acto": 200,
      "audiovisuales": "Micrófonos inalámbricos y proyector",
      "anotaciones_acto": "Palabras del director y presentación de un vídeo conmemorativo",
      "lugar_cena": "Hotel Gran Madrid",
      "hora_cena": "20:30",
      "numalumnos_cena": 75,
      "nprofesores_cena": 10,
      "anotaciones_cena": "Menú con opción vegetariana",
      "menu_cena": "Ensalada mixta, pollo al horno, tarta de chocolate",
      "lugar_fiesta": "Sala Moonlight",
      "hora_fiesta": "22:00",
      "numgratuidades_fiesta": 8,
      "numasistentes_fiesta": 100,
      "sonido_profesional": true,
      "dj_profesional": true,
      "barra_libre_refrescos": true,
      "glitter_bar": true,
      "glitter_makeup": true,
      "recena_kebab": true,
      "cachimba": true,
      "intolerancias_fiesta": "Sin lactosa disponible",
      "anotaciones_fiesta": "Zona chill-out habilitada"
      
    }
  ];
  item: any;

  actformevento(){
    this.btnevento ? this.btnevento = false : this.btnevento = true;
  }

  verDetalle(id: string) {
    console.log('Ver detalle del evento con id ' + id);
     // Inyectamos Router aquí
    this.router.navigate(['/evento', id]);
  }

  modificardDclick(){
    console.log("se ha dado doble click en el td");
  }
}
