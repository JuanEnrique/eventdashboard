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

app.post("/evento", (req, res) => {

    const { id } = req.body;
    
    // 🔍 1️⃣ Comprobamos si el evento ya existe
    db.query("SELECT * FROM evento WHERE expediente = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error en la consulta a la base de datos" });
        }

        if (results.length > 0) {
            // 📛 Si el evento ya existe, enviamos un mensaje de error
            return res.status(200).json({ existe: true, mensaje: "Este evento ya está registrado." });
        } else {
            return res.status(200).json({ existe: false, mensaje: "Este evento no está registrado." });
        }
    });
});


// 🔹 Iniciar el Servidor
app.listen(3000, () => {
    console.log("🚀 Servidor corriendo en http://localhost:3000");
});