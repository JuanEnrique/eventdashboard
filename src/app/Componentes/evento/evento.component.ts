import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bbdd } from '../../services/bbdd.service';
import { Location } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {

  constructor(private bbdd: Bbdd, private route: ActivatedRoute,private location: Location) {}

  showModal: boolean = false;
  errorModal: boolean = false;
  evento: any = {};
  eventoempleado: any = [];
  eventoemplDispo: any = [];
  camareros: string[] = [];
  id: number= 0;



  trabajadores: {
    id: number;
    nombre: string;
    camarero: number;
    encargado: number;
    asignadoE: boolean;
    asignadoC: boolean;
  }[] = [];






  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el ID a número
    });

    this.bbdd.getEvento(this.id).subscribe({
      next: (data) => {
        this.evento = data.evento;
        this.eventoempleado = data.empleados;
        this.eventoemplDispo = data.empleadosdispo;
        console.log(this.eventoempleado);
        console.log(this.eventoemplDispo);
        this.asignacionTrabajadores();
      },
      error: (error) => {
        console.error("Error al obtener usuarios:", error);
      }
    });
  }

  asignacionTrabajadores(){
    
    this.eventoempleado.forEach((emp: any) => {
      if(emp.puesto == "camarero"){
        this.trabajadores.push({
          id: emp.empleado_id,
          nombre: emp.nombre,
          camarero: 1,
          encargado: 0,
          asignadoE: false,
          asignadoC: true
        });
      }
      else{
        this.trabajadores.push({
          id: emp.empleado_id,
          nombre: emp.nombre,
          camarero: 0,
          encargado: 1,
          asignadoE: true,
          asignadoC: false
        });
      }

    });
    this.eventoemplDispo.forEach((emp: any) => {
      this.trabajadores.push({
        id: emp.id,
        nombre: emp.nombre,
        camarero: emp.camarero,
        encargado: emp.encargado,
        asignadoE: false,
          asignadoC: false
      });

    });
    console.log(this.trabajadores);
  }
  
  meterEmpleado(camarero: number, p: string): void {
    if (!camarero) return;

    const trabajadorBuscado = this.trabajadores.find(trabajador => trabajador.id === camarero);
  
    if (trabajadorBuscado && trabajadorBuscado.encargado === 1 && p === 'e') {
      trabajadorBuscado.asignadoE = true;
      this.camareros.push(trabajadorBuscado.nombre);
    }
    if (trabajadorBuscado && trabajadorBuscado.camarero === 1 && p === 'c') {
      trabajadorBuscado.asignadoC = true;
      this.camareros.push(trabajadorBuscado.nombre);
    }
  }
  sacarEmpleado(camarero: number, p: string): void {
    if (!camarero) return;

    const trabajadorBuscado = this.trabajadores.find(trabajador => trabajador.id === camarero);
  
    if (trabajadorBuscado && trabajadorBuscado.encargado === 1 && p === 'e') {
      trabajadorBuscado.asignadoE = false;
      this.camareros.push(trabajadorBuscado.nombre);
    }
    if (trabajadorBuscado && trabajadorBuscado.camarero === 1 && p === 'c') {
      trabajadorBuscado.asignadoC = false;
      this.camareros.push(trabajadorBuscado.nombre);
    }
  }

  guardarBbdd(): void {


    const trabajadoresEliminados = this.eventoempleado
      .filter((eventEmp: any) => {
        const trabajador = this.trabajadores.find((trab: any) => trab.id === eventEmp.empleado_id);
        return trabajador && !trabajador.asignadoE && !trabajador.asignadoC;
      })
      .map((emp: any) => {
        return {
          id: emp.empleado_id,
          puesto: emp.puesto
        };
      });

    const trabajadoresAñadidos = this.trabajadores
      .filter((trab: any) => {
        return (trab.asignadoE || trab.asignadoC) && 
               !this.eventoempleado.some((eventEmp: any) => eventEmp.empleado_id === trab.id);
      });

    const jsonResultado = trabajadoresAñadidos.map((trabajador: any) => {
      return {
        evento_id: this.id,
        empleado_id: trabajador.id,
        puesto: trabajador.asignadoE ? 'encargado' : trabajador.asignadoC ? 'camarero' : null
      };
    });

    const jsonEliminados = trabajadoresEliminados.map((trabajador: any) => {
      return {
        evento_id: this.id,
        empleado_id: trabajador.id,
        puesto: trabajador.puesto
      };
    });

    if(jsonEliminados.length != 0){
      this.bbdd.deleteEmplevento(this.id,jsonEliminados).subscribe({
        next: (data) => {
          console.log("Se han eliminado los empleados al evento");
        },
        error: (error) => {
          console.error("Error al obtener usuarios:", error);
        }
      });
    }

    if(jsonResultado.length != 0){
      this.bbdd.insertEmplevento(this.id,jsonResultado).subscribe({
        next: (data) => {
          console.log("Se han introducido los empleados del evento");
        },
        error: (error) => {
          console.error("Error al obtener usuarios:", error);
        }
      });
    }
    if(jsonResultado.length != 0 && jsonEliminados.length != 0){
      alert("No se han añadido empleados al evento");
    }
  }


  /*---Acciones con el modal del menú*/
openModal() {
  this.showModal = true;
  
};

closeModal() {
  this.showModal = false;
};

closeerrorModal() {
  this.errorModal = false;
};


/*----*/
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

calcularDiasRestantes(fechaObjetivo: string): number {
  const fechaHoy = new Date();
  const fechaFinal = new Date(fechaObjetivo);
  
  // Calcular la diferencia en días utilizando la diferencia de tiempo
  return Math.ceil((fechaFinal.getTime() - fechaHoy.getTime()) / (1000 * 3600 * 24));
}

}
