const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Leer todos los productos
app.get('/api/productos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Leer un producto por id
app.get('/api/productos/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Agregar un producto nuevo
app.post('/api/productos', async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad, categoria } = req.body;

        if (!nombre || precio === undefined || cantidad === undefined) {
            return res.status(400).json({ error: 'Nombre, precio y cantidad son obligatorios' });
        }

        const [result] = await db.query(
            'INSERT INTO productos (nombre, descripcion, precio, cantidad, categoria) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion || null, precio, cantidad, categoria || null]
        );

        res.status(201).json({ id: result.insertId, nombre, descripcion, precio, cantidad, categoria });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

// Editar un producto existente
app.put('/api/productos/:id', async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad, categoria } = req.body;
        const { id } = req.params;

        const [result] = await db.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, categoria = ? WHERE id = ?',
            [nombre, descripcion || null, precio, cantidad, categoria || null, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ id, nombre, descripcion, precio, cantidad, categoria });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Borrar un producto
app.delete('/api/productos/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de Tienda 3B corriendo en el puerto ${PORT}`);
});
