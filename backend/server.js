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

app.get("/empleado/:id", (req, res) => {
    const id = req.params.id; // Captura el ID de la URL

    db.query("SELECT * FROM empleado WHERE dni = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: "Empleado no encontrado" });
        } else {
            res.json(results[0]); // Devuelve solo el primer resultado
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

/*app.get("/evento/:id", (req, res) => {
    const id = req.params.id; // Captura el ID de la URL
    /*const qsql = "select empleado.nombre, evento_empleados.puesto from evento_empleados inner join empleado on evento_empleados.empleado_id = empleado.id where evento_id = ?";
    db.query("SELECT * FROM evento WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: "Evento no encontrado" });
        } else {
            res.json(results[0]); // Devuelve solo el primer resultado
        }
    });
});*/



app.get("/evento/:id", (req, res) => {
    const id = req.params.id;

    // Consulta 1: obtener los datos del evento
    const eventoQuery = "SELECT * FROM evento WHERE id = ?";

    // Consulta 2: obtener empleados que participan en el evento
    const empleadosQuery = `
        SELECT empleado.nombre, evento_empleados.puesto 
        FROM evento_empleados 
        INNER JOIN empleado ON evento_empleados.empleado_id = empleado.id 
        WHERE evento_id = ?`;

    // Ejecutar la primera consulta
    db.query(eventoQuery, [id], (err, eventoResult) => {
        if (err) return res.status(500).send({ error: err });

        // Ejecutar la segunda consulta
        db.query(empleadosQuery, [id], (err, empleadosResult) => {
            if (err) return res.status(500).send({ error: err });

            // Devolver ambos resultados en un solo objeto JSON
            res.json({
                evento: eventoResult[0] || {},
                empleados: empleadosResult || []
            });
        });
    });
});


















app.post("/evento", (req, res) => {

    const { json } = req.body;
    
    // 🔍 1️⃣ Comprobamos si el evento ya existe
    db.query("SELECT * FROM evento WHERE expediente = ?", [json.expediente], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en la consulta a la base de datos" });
        }

        if (results.length > 0) {
            // 📛 Si el evento ya existe, enviamos un mensaje de error
            return res.status(200).json({ existe: true, mensaje: "Este evento ya está registrado." });
        } else {
            let query = jsonToQuery(json,'evento');
            db.query(query, (err, results) => {
                if (err) {
                    console.error("Error al insertar el evento:", err);
                    return res.status(500).json({ error: "Error al insertar el evento" });
                }

                // Si la inserción fue exitosa, enviamos una respuesta positiva
                console.log("Evento insertado correctamente:", results);
            });
            return res.status(200).json({ existe: false, mensaje: "Datos metidos en la bbdd." });

        }
    });
});

app.post("/empleados", (req, res) => {

    const { json } = req.body;
    
    // 🔍 1️⃣ Comprobamos si el evento ya existe
    db.query("SELECT * FROM empleado WHERE dni = ?", [json.dni], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en la consulta a la base de datos" });
        }

        if (results.length > 0) {
            // 📛 Si el empleado ya existe, enviamos un mensaje de error
            return res.status(200).json({ existe: true, mensaje: "Este empleado ya está registrado." });
        } else {
            let query = jsonToQuery(json, "empleado");
            db.query(query, (err, results) => {
                if (err) {
                    console.error("Error al insertar el empleado:", err);
                    return res.status(500).json({ error: "Error al insertar el empleado" });
                }

                // Si la inserción fue exitosa, enviamos una respuesta positiva
                console.log("Empleado insertado correctamente:", results);
            });
            return res.status(200).json({ existe: false, mensaje: "Datos metidos en la bbdd." });

        }
    });
});


// 🔹 Iniciar el Servidor
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});



// Función que transforma un JSON en una query de tipo INSERT
function jsonToQuery(datos, tabla) {
    const columnas = [];
    const valores = [];

    // Iteramos sobre las claves y valores del objeto `datos`
    for (const clave in datos) {
        if (datos.hasOwnProperty(clave)) {
            const valor = datos[clave];
            columnas.push(clave);

            if (typeof valor === 'boolean') {
                valores.push(valor ? 'TRUE' : 'FALSE');
            } else if (valor === '') {
                valores.push('NULL');
            } else if (typeof valor === 'string') {
                // Escapamos comillas simples con doble comilla simple para SQL
                const valorEscapado = valor.replace(/'/g, "''");
                valores.push(`'${valorEscapado}'`);
            } else if (valor === null || valor === undefined) {
                valores.push('NULL');
            } else {
                valores.push(String(valor));
            }
        }
    }

    // Construimos la query SQL
    const sql = `INSERT INTO ${tabla} (${columnas.join(', ')}) VALUES (${valores.join(', ')});`;
    return sql;
}