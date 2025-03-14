export class evento{

    constructor(
        public expediente: string = "",
        public centro: string = "",
        public curso: string = "",
        public fecha: string = "",
        public reserva: string = "",
        public pagos: string = "",
        public ciudad: string = "",
        public entregado: string = "",
        public menu: string = "",
        public carrito: number = 0,
        public recena: string = "",
        public maquina: number = 0,
        public maquillaje: number = 0,
        public extra: string = "",

        // Datos del acto
        public lugar_acto: string = "",
        public hora_acto: string = "",
        public numgraduados_acto: number = 0,
        public numfamiliares_acto: number = 0,
        public audiovisuales: string = "",
        public anotaciones_acto: string = "",

        // Datos de la cena
        public lugar_cena: string = "",
        public hora_cena: string = "",
        public numalumnos_cena: number = 0,
        public nprofesores_cena: number = 0,
        public anotaciones_cena: string = "",
        public menu_cena: string = "",

        // Datos de la fiesta
        public lugar_fiesta: string = "",
        public hora_fiesta: string = "",
        public numgratuidades_fiesta: number = 0,
        public numasistentes_fiesta: number = 0,
        public sonido_profesional: boolean = false,
        public iluminacion_robotica: boolean = false,
        public dj_profesional: boolean = false,
        public fotografo: boolean = false,
        public barra_libre_refrescos: boolean = false,
        public fotomaton: boolean = false,
        public plataforma_360: boolean = false,
        public recena_pizza: boolean = false,
        public tatuajes: boolean = false,
        public intolerancias_fiesta: string = "",
        public anotaciones_fiesta: string = "",

        //bus o transporte
    ) {}
}