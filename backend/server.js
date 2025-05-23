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
    password: "MySQL8.0",   // Contraseña de MySQL
    database: "gradmin",    // Nombre de la base de datos
    port: 3306,             // Puerto de la base de datos
    dateStrings: true       // ⚠️ IMPORTANTE: devuelve fechas como strings para que no reste un día
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

    const eventosQuery = `
        SELECT evento.id, evento.expediente, evento.centro, evento.fecha
        FROM evento_empleados 
        INNER JOIN evento ON evento_empleados.evento_id = evento.id 
        WHERE empleado_id = ?`;

    db.query("SELECT * FROM empleado WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: "Empleado no encontrado" });
        } else {
            db.query(eventosQuery, [id], (err, eventosResult) => {
                if (err) return res.status(500).send({ error: err });
                // Devolver ambos resultados en un solo objeto JSON
                res.json({
                    eventos: eventosResult || [],
                    empleado: results[0] || {}
                });
            });
        }
    });
});

app.get("/evento", (req, res) => {
    db.query("select * from evento", (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.get("/evento/:id", (req, res) => {
    const id = req.params.id;

    const eventoQuery = "SELECT * FROM evento WHERE id = ?";

    const empleadosQuery = `
        SELECT evento_empleados.empleado_id, empleado.nombre, evento_empleados.puesto 
        FROM evento_empleados 
        INNER JOIN empleado ON evento_empleados.empleado_id = empleado.id 
        WHERE evento_id = ?`;

    db.query(eventoQuery, [id], (err, eventoResult) => {
        if (err) return res.status(500).send({ error: err });
        if (eventoResult.length === 0) {
            return res.status(404).send({ message: "Evento no encontrado" });
        }

        const evento = eventoResult[0];
        const fechaEvento = evento.fecha;

        db.query(empleadosQuery, [id], (err, empleadosResult) => {
            if (err) return res.status(500).send({ error: err });

            const emplDispQuery = `
                SELECT e.id, e.nombre, e.encargado, e.camarero
                FROM empleado e
                WHERE e.id NOT IN (
                    SELECT empleado_id
                    FROM evento_empleados
                    WHERE evento_id = ?
                )
                AND e.id NOT IN (
                    SELECT ee.empleado_id
                    FROM evento_empleados ee
                    INNER JOIN evento ev ON ee.evento_id = ev.id
                    WHERE ev.fecha = ?
                )
                AND NOT (e.encargado = 0 AND e.camarero = 0);
            `;

            db.query(emplDispQuery, [id, fechaEvento], (err, emplDispResult) => {
                if (err) return res.status(500).send({ error: err });

                res.json({
                    evento,
                    empleados: empleadosResult || [],
                    empleadosdispo: emplDispResult || []
                });
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
    
    // 🔍 1️⃣ Comprobamos si el empleado ya existe
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


app.patch("/empleados", (req, res) => {

    //€€€€ hay que verificar los campos que se han cambiado para que no haya conflictos en la base de datos

    const { json } = req.body;

    const query = jsonToQueryUpdate(json, "empleado");

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: "Empleado no encontrado" });
        } else {
            return res.status(200).json({ existe: false, mensaje: "Datos actualizados en la bbdd." });
        }
    });
});

app.patch("/evento", (req, res) => {

    //€€€€ hay que verificar los campos que se han cambiado para que no haya conflictos en la base de datos

    const { json } = req.body;

    const query = jsonToQueryUpdate(json, "evento");

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: "Evento no encontrado" });
        } else {
            return res.status(200).json({ existe: false, mensaje: "Datos actualizados en la bbdd." });
        }
    });
});

//modifica los trabajadores de un evento
app.post("/evento/:id", (req, res) => {
    
    const { json } = req.body;
    let query = jsonToQueryUpdateEventoEmpleados(json, "evento_empleados");

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al insertar el empleado:", err);
            return res.status(500).json({ error: "Error al insertar el empleado" });
        }

        // Si la inserción fue exitosa, enviamos una respuesta positiva
        console.log("Empleados insertado correctamente:", results);
    });
    return res.status(200).json({ existe: false, mensaje: "Datos metidos en la bbdd." });
});

app.delete("/evento/:id", (req, res) => {
    const id = req.params.id; // Captura el ID de la URL
    const json = req.body;
    let query = jsonToQueryDeleteEventoEmpleados(json, "evento_empleados");
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: "Empleado no encontrado" });
        } else {
            res.json({ message: "Empleado eliminado correctamente" });
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

function jsonToQueryUpdate(datos, tabla) {
    const columnas = [];
    const id = datos.id; // Obtenemos el id

    // Nos aseguramos de que el id esté presente
    if (id === undefined) {
        throw new Error("El objeto datos debe contener una propiedad 'id'");
    }

    // Iteramos sobre las claves y valores del objeto `datos`
    for (const clave in datos) {
        if (datos.hasOwnProperty(clave) && clave !== 'id') {
            const valor = typeof datos[clave] === 'string' ? `'${datos[clave]}'` : datos[clave];
            columnas.push(`${clave} = ${valor}`);
        }
    }

    // Construimos la query SQL
    const sql = `UPDATE ${tabla} SET ${columnas.join(', ')} WHERE id = ${id};`;
    return sql;
}

function jsonToQueryUpdateEventoEmpleados(datos, tabla) {
/*
    const sql = datos.map(datos => 
        `insert into ${tabla} (evento_id,empleado_id,puesto) values (${datos.evento_id}, ${datos.empleado_id}, '${datos.puesto}')`
    );
    const finalQuery = sql.join('; ');(sql);
    return finalQuery;*/
      const values = datos
    .map(d => `(${d.evento_id}, ${d.empleado_id}, '${d.puesto}')`)
    .join(', ');
  return `INSERT INTO ${tabla} (evento_id, empleado_id, puesto) VALUES ${values};`;
}

function jsonToQueryDeleteEventoEmpleados(datos, tabla) {
  const sql = datos.map(d => 
    `DELETE FROM ${tabla} WHERE evento_id = ${d.evento_id} AND empleado_id = ${d.empleado_id} AND puesto = '${d.puesto}'`
  );
  return sql.join('; ');
}