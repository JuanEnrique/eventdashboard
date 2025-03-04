export class empleado{

        //propiedades
    nombre: string = "";
    apellido: string= "";
    alias: string= "";
    email: string= "";
    telefono: string= "";
    dni: string= "";
    nss: string= ""; //numero de la seguridad social
    puesto: string= "";
    horas: number=0;
    iban: string= "";
    docprev: number=0; //documentacion prevencion

    constructor(nombre: string, apellido: string, alias: string, email: string, telefono: string, dni: string, nss: string, puesto: string, horas: number, iban: string, docprev: number){
        this.nombre=nombre;
        this.apellido=apellido;
        this.alias=alias;
        this.email=email;
        this.telefono=telefono;
        this.dni=dni;
        this.nss=nss;
        this.puesto=puesto;
        this.horas=horas;
        this.iban=iban;
        this.docprev=docprev;
    }

}