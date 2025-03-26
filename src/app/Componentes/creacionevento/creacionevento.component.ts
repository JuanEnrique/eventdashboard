import { Component} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Bbdd } from '../../services/bbdd.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-creacionevento',
  standalone: true,
  imports: [ModalComponent,ReactiveFormsModule],
  templateUrl: './creacionevento.component.html',
  styleUrl: './creacionevento.component.css'
})
export class CreacioneventoComponent {

 
  showModal: boolean = false;
  errorModal: boolean = false;
  mensaje: string = "";
  router = inject(Router);

  formulario_evento: FormGroup;
  constructor(private bbdd: Bbdd, private route: ActivatedRoute) {
  
    this.formulario_evento = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre_centro: new FormControl('', Validators.required),
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
      sonido_profesional: new FormControl(false),
      iluminacion_robotica: new FormControl(false),
      efectos_humo: new FormControl(false),
      guardaropa: new FormControl(false),
      djprofesional: new FormControl(false),
      fotografo: new FormControl(false),
      /*Recena */
      recena_mcdonalds: new FormControl(false),
      recena_burguerking: new FormControl(false),
      /*------- */
      seguridad_cualificada: new FormControl(false),
      animaciones_fotos: new FormControl(false),
      glitter_bar: new FormControl(false),
      barra_libre_alcohol: new FormControl(false),
      barra_libre_refrescos: new FormControl(false),
      consumisionesybarra: new FormControl(false),
      cartucho_gomitas: new FormControl(false),
      /*Maquina*/
      plataforma_360: new FormControl(false),
      fotomaton: new FormControl(false),
      
      /*Maquillaje*/
      glitter_bar_free: new FormControl(false),
      glitter_makeup: new FormControl(false),
      asist_ma_pe: new FormControl(false),
      
      /*Carrito*/
      recena_pizza: new FormControl(false),
      recena_kebab: new FormControl(false),
      recena_mexicana: new FormControl(false),
      recena_hamburguesas_perritos: new FormControl(false),
      
      /*Extras*/
      tatuajes: new FormControl(false),
      cachimba: new FormControl(false),
      /*---------*/
      intolerancias_fiesta: new FormControl(''),
      anotaciones_fiesta: new FormControl('')
    });

};


onSubmit_evento() {

  (id: string)=>{
    this.router.navigate(['/evento', id]);
  }
  console.log(this.formulario_evento.value.id)
  

  if (this.formulario_evento.valid) {
    this.verificarEvento();
    console.log('Formulario enviado:', this.formulario_evento.value);
  } else {
    this.mensaje = "";
    this.mensaje= "Error en la validación del formulario"
    this.errorModal = true;
  }

}

verificarEvento() {

  this.bbdd.registrarEvento(this.formulario_evento.value.id).subscribe({
    
    next: (response: any) => {
      if (response.existe) {
        alert(response.mensaje); // "Este evento ya está registrado."
      } else {
        alert(response.mensaje); // "Este evento no está registrado."
      }
    },
    error: (error) => {
      console.log(this.formulario_evento.value.id);
      console.error("Error en la verificación:", error);
      alert("Hubo un problema al verificar el evento.");
    }
  });
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



}