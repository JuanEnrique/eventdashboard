CREATE TABLE empleado (
    id INT AUTO_INCREMENT PRIMARY KEY, -- ID autoincremental
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    alias VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    telefono BIGINT, -- Se usa BIGINT para almacenar números largos sin ceros a la izquierda
    dni VARCHAR(20) UNIQUE NOT NULL, -- Documento de identidad único
    nss BIGINT UNIQUE NOT NULL, -- Número de Seguridad Social único
    puesto ENUM('encargado', 'camarero') NOT NULL, -- Solo puede tener estos valores
    horas INT DEFAULT 0 CHECK (horas >= 0), -- Horas trabajadas (mínimo 0)
    iban VARCHAR(34) UNIQUE NOT NULL, -- IBAN bancario
    docprev TINYINT DEFAULT 0 CHECK (docprev IN (0,1)) -- 0: No entregada, 1: Entregada
);


CREATE TABLE evento (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- ID autoincremental obligatorio
    expediente VARCHAR(50), 
    centro VARCHAR(100), 
    curso VARCHAR(50), 
    fecha DATE, 
    reserva VARCHAR(100),
    pagos VARCHAR(100),
    ciudad VARCHAR(100),
    entregado VARCHAR(50),
    menu VARCHAR(255), 
    carrito INT DEFAULT 0, 
    recena VARCHAR(100),
    maquina INT DEFAULT 0, 
    maquillaje INT DEFAULT 0, 
    extra VARCHAR(255),

    -- Datos del acto
    lugar_acto VARCHAR(255),
    hora_acto TIME, 
    numgraduados_acto INT DEFAULT 0,
    numfamiliares_acto INT DEFAULT 0,
    audiovisuales VARCHAR(255),
    anotaciones_acto TEXT,

    -- Datos de la cena
    lugar_cena VARCHAR(255),
    hora_cena TIME, 
    numalumnos_cena INT DEFAULT 0,
    nprofesores_cena INT DEFAULT 0,
    anotaciones_cena TEXT,
    menu_cena VARCHAR(255),

    -- Datos de la fiesta
    lugar_fiesta VARCHAR(255),
    hora_fiesta TIME, 
    numgratuidades_fiesta INT DEFAULT 0,
    numasistentes_fiesta INT DEFAULT 0,
    sonido_profesional BOOLEAN DEFAULT FALSE,
    iluminacion_robotica BOOLEAN DEFAULT FALSE,
    dj_profesional BOOLEAN DEFAULT FALSE,
    fotografo BOOLEAN DEFAULT FALSE,
    barra_libre_refrescos BOOLEAN DEFAULT FALSE,
    fotomaton BOOLEAN DEFAULT FALSE,
    plataforma_360 BOOLEAN DEFAULT FALSE,
    recena_pizza BOOLEAN DEFAULT FALSE,
    tatuajes BOOLEAN DEFAULT FALSE,
    intolerancias_fiesta TEXT,
    anotaciones_fiesta TEXT
);


ALTER TABLE evento 
ADD COLUMN recena_mexicana BOOLEAN DEFAULT FALSE,
ADD COLUMN recena_kebab BOOLEAN DEFAULT FALSE,
ADD COLUMN burger_perrito BOOLEAN DEFAULT FALSE;
ADD COLUMN efectos_humo BOOLEAN DEFAULT FALSE;
ADD COLUMN guardaropa BOOLEAN DEFAULT FALSE,
ADD COLUMN djprofesional BOOLEAN DEFAULT FALSE,
ADD COLUMN recena_mcdonalds BOOLEAN DEFAULT FALSE,
ADD COLUMN recena_burguerking BOOLEAN DEFAULT FALSE,
ADD COLUMN seguridad_cualificada BOOLEAN DEFAULT FALSE,
ADD COLUMN animaciones_fotos BOOLEAN DEFAULT FALSE,
ADD COLUMN glitter_bar BOOLEAN DEFAULT FALSE,
ADD COLUMN barra_libre_alcohol BOOLEAN DEFAULT FALSE,
ADD COLUMN consumisionesybarra BOOLEAN DEFAULT FALSE,
ADD COLUMN cartucho_gomitas BOOLEAN DEFAULT FALSE,
ADD COLUMN glitter_bar_free BOOLEAN DEFAULT FALSE,
ADD COLUMN glitter_makeup BOOLEAN DEFAULT FALSE,
ADD COLUMN asist_ma_pe BOOLEAN DEFAULT FALSE,
ADD COLUMN cachimba BOOLEAN DEFAULT FALSE;


CREATE TABLE evento_empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT,
    empleado_id INT,
    puesto VARCHAR(50), -- Puede ser 'Camarero', 'Encargado', etc.
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON DELETE CASCADE,
    FOREIGN KEY (empleado_id) REFERENCES empleado(id) ON DELETE CASCADE
);
