const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors()); // Habilita CORS para permitir peticiones desde Angular
app.use(express.json()); // Permite recibir JSON en las peticiones

// 🔹 Conexión a la Base de Datos MySQL
const db = mysql.createConnection({
    host: "localhost",      // Servidor de la base de datos
    user: "root",           // Usuario de MySQL
    password: "MySQL8.0", // Contraseña de MySQL
    database: "gradmin", // Nombre de la base de datos
    port: 3306              // Puerto de la base de datos
});

db.connect(err => {
    if (err) {
        console.error("Error conectando a la BD:", err);
        return;
    }
    console.log("✅ Conectado a la Base de Datos");
});

app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente!");
});

// 🔹 Definir una Ruta API para obtener datos
app.get("/empleado", (req, res) => {
    db.query("SELECT * FROM empleado", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get("/evento", (req, res) => {
    db.query("SELECT * FROM evento", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.get("/evento/:id", (req, res) => {
    const id = req.params.id; // Captura el ID de la URL
    db.query("SELECT * FROM evento WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: "Evento no encontrado" });
        } else {
            res.json(results[0]); // Devuelve solo el primer resultado
        }
    });
});



app.post("/evento/registro", (req, res) => {
    const {
        identificador, nombre_centro, curso, fecha, poblacion, lugar_acto, 
        hora_acto, numgraduados_acto, numfamiliares_acto, audiovisuales, 
        anotaciones_acto, lugar_cena, hora_cena, numalumnos_cena, 
        nprofesores_cena, anotaciones_cena, menu_cena, lugar_fiesta, 
        hora_fiesta, numgratuidades_fiesta, numasistentes_fiesta, 
        sonido_profesional, iluminacion_robotica, efectos_humo, 
        guardaropa, djprofesional, fotografo, recena_mcdonalds, 
        recena_burguerking, seguridad_cualificada, animaciones_fotos, 
        glitter_bar, barra_libre_alcohol, barra_libre_refrescos, 
        consumisionesybarra, cartucho_gomitas, plataforma_360, 
        fotomaton, glitter_bar_free, glitter_makeup, asist_ma_pe, 
        recena_pizza, recena_kebab, recena_mexicana, 
        recena_hamburguesas_perritos, tatuajes, cachimba, 
        intolerancias_fiesta, anotaciones_fiesta
    } = req.body;

    const sql = `INSERT INTO evento (
        identificador, nombre_centro, curso, fecha, poblacion, lugar_acto, 
        hora_acto, numgraduados_acto, numfamiliares_acto, audiovisuales, 
        anotaciones_acto, lugar_cena, hora_cena, numalumnos_cena, 
        nprofesores_cena, anotaciones_cena, menu_cena, lugar_fiesta, 
        hora_fiesta, numgratuidades_fiesta, numasistentes_fiesta, 
        sonido_profesional, iluminacion_robotica, efectos_humo, 
        guardaropa, djprofesional, fotografo, recena_mcdonalds, 
        recena_burguerking, seguridad_cualificada, animaciones_fotos, 
        glitter_bar, barra_libre_alcohol, barra_libre_refrescos, 
        consumisionesybarra, cartucho_gomitas, plataforma_360, 
        fotomaton, glitter_bar_free, glitter_makeup, asist_ma_pe, 
        recena_pizza, recena_kebab, recena_mexicana, 
        recena_hamburguesas_perritos, tatuajes, cachimba, 
        intolerancias_fiesta, anotaciones_fiesta
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        identificador, nombre_centro, curso, fecha, poblacion, lugar_acto, 
        hora_acto, numgraduados_acto, numfamiliares_acto, audiovisuales, 
        anotaciones_acto, lugar_cena, hora_cena, numalumnos_cena, 
        nprofesores_cena, anotaciones_cena, menu_cena, lugar_fiesta, 
        hora_fiesta, numgratuidades_fiesta, numasistentes_fiesta, 
        sonido_profesional, iluminacion_robotica, efectos_humo, 
        guardaropa, djprofesional, fotografo, recena_mcdonalds, 
        recena_burguerking, seguridad_cualificada, animaciones_fotos, 
        glitter_bar, barra_libre_alcohol, barra_libre_refrescos, 
        consumisionesybarra, cartucho_gomitas, plataforma_360, 
        fotomaton, glitter_bar_free, glitter_makeup, asist_ma_pe, 
        recena_pizza, recena_kebab, recena_mexicana, 
        recena_hamburguesas_perritos, tatuajes, cachimba, 
        intolerancias_fiesta, anotaciones_fiesta
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al insertar el evento:", err);
            res.status(500).json({ message: "Error al insertar el evento" });
        } else {
            res.status(201).json({ message: "Evento registrado correctamente", id: result.insertId });
        }
    });
});




// 🔹 Iniciar el Servidor
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});