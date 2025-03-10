import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {

  diasRestantes: number = 0;
  // Simulación de una base de datos (en un servicio podrías obtenerlo desde una API)
  eventosjson=[
    {
      "id": "EXP-2025-001",
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
      "id": "EXP-2025-002",
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

  elemento: any;

  // Simulación de una base de datos (en un servicio podrías obtenerlo desde una API)
  elementos = [
    { id: 'EXP-2025-001', nombre: 'Elemento 1', descripcion: 'Descripción breve', detalles: 'Detalles completos del Elemento 1' },
    { id: 2, nombre: 'Elemento 2', descripcion: 'Descripción breve', detalles: 'Detalles completos del Elemento 2' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Capturar el ID desde la URL
    const id = this.route.snapshot.paramMap.get('id');

    console.log('ID del evento:', id);
    
    // Buscar el elemento en el array
    this.elemento = this.eventosjson.find(e => e.id === id);

    if (!this.elemento) {
      alert('Elemento no encontrado');
      this.router.navigate(['/tabla']); // Redirigir si el ID no es válido
    }
     // Ejemplo de uso
     this.diasRestantes = this.calcularDiasRestantes(this.elemento.fecha);
  }

     

  calcularDiasRestantes(fechaObjetivo: string): number {
    const fechaHoy = new Date();
    const fechaFinal = new Date(fechaObjetivo);
    
    // Calcular la diferencia en días utilizando la diferencia de tiempo
    return Math.ceil((fechaFinal.getTime() - fechaHoy.getTime()) / (1000 * 3600 * 24));
  }
  


}
