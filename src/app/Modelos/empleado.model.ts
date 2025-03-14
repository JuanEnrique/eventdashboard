export class empleado{

    constructor(
        public id: string = "",
        public nombre: string = "",
        public apellido: string = "",
        public alias: string = "",
        public email: string = "",
        public telefono: string = "",
        public dni: string = "",
        public nss: string = "", // Número de la seguridad social
        public puesto: string[] = [],
        public horas: number = 0,
        public iban: string = "",
        public docprev: number = 0, // Documentación prevencion

        
    ) {}
}