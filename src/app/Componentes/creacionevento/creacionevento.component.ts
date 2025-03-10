import { Component} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-creacionevento',
  standalone: true,
  imports: [ModalComponent,ReactiveFormsModule],
  templateUrl: './creacionevento.component.html',
  styleUrl: './creacionevento.component.css'
})
export class CreacioneventoComponent {

 
  showModal: boolean = false;

  formulario_evento: FormGroup;
  constructor() {
  
    this.formulario_evento = new FormGroup({
      identificador: new FormControl(''),
      nombre_centro: new FormControl(''),
      curso: new FormControl(''),
      fecha: new FormControl(''),
      poblacion: new FormControl(''),
      lugar_acto: new FormControl(''),
      hora_acto: new FormControl(''),
      numgraduados_acto: new FormControl(''),
      numfamiliares_acto: new FormControl(''),
      audiovisuales: new FormControl(''),
      anotaciones_acto: new FormControl(''),
      lugar_cena: new FormControl(''),
      hora_cena: new FormControl(''),
      numalumnos_cena: new FormControl(''),
      nprofesores_cena: new FormControl(''),
      anotaciones_cena: new FormControl(''),
      menu_cena: new FormControl(''),
      lugar_fiesta: new FormControl(''),
      hora_fiesta: new FormControl(''),
      numgratuidades_fiesta: new FormControl(''),
      numasistentes_fiesta: new FormControl(''),
      sonido_profesional: new FormControl(''),
      iluminacion_robotica: new FormControl(''),
      efectos_humo: new FormControl(''),
      guardaropa: new FormControl(''),
      djprofesional: new FormControl(''),
      fotografo: new FormControl(''),
      recena_mcdonalds: new FormControl(''),
      recena_burguerking: new FormControl(''),
      seguridad_cualificada: new FormControl(''),
      animaciones_fotos: new FormControl(''),
      glitter_bar: new FormControl(''),
      barra_libre_alcohol: new FormControl(''),
      barra_libre_refrescos: new FormControl(''),
      consumisionesybarra: new FormControl(''),
      cartucho_gomitas: new FormControl(''),
      plataforma_360: new FormControl(''),
      fotomaton: new FormControl(''),
      glitter_bar_free: new FormControl(''),
      glitter_makeup: new FormControl(''),
      asist_ma_pe: new FormControl(''),
      recena_pizza: new FormControl(''),
      recena_kebab: new FormControl(''),
      recena_mexicana: new FormControl(''),
      recena_hamburguesas_perritos: new FormControl(''),
      tatuajes: new FormControl(''),
      cachimba: new FormControl(''),
      intolerancias_fiesta: new FormControl(''),
      anotaciones_fiesta: new FormControl('')
    });

};


onSubmit_evento() {
  if (this.formulario_evento.valid) {
    console.log('Formulario enviado:', this.formulario_evento.value);
    console.log('Formulario enviado:', this.formulario_evento.value.nombre);
  } else {
    console.log('Formulario no válido');
  }
}



/*---Acciones con el modal del menú*/
openModal() {
  this.showModal = true;
};

closeModal() {
  this.showModal = false;
};

}