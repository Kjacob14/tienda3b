const API_URL = 'http://api.tienda.lab:3000/api/productos';

const tablaProductos = document.getElementById('tablaProductos');
const formProducto = document.getElementById('formProducto');
const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'));
const modalTitulo = document.getElementById('modalTitulo');
const alertContainer = document.getElementById('alertContainer');

document.addEventListener('DOMContentLoaded', cargarProductos);

// Muestra un mensaje de aviso arriba de la tabla
function mostrarAlerta(mensaje, tipo = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Trae todos los productos del backend y los pinta en la tabla
async function cargarProductos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) throw new Error('No se pudo obtener el inventario');

        const productos = await respuesta.json();
        tablaProductos.innerHTML = '';

        productos.forEach(producto => {
            const fila = document.createElement('tr');
            const cantidadClase = producto.cantidad <= 5 ? 'badge-cantidad-baja' : '';

            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion || '-'}</td>
                <td>${producto.categoria || '-'}</td>
                <td>$${Number(producto.precio).toFixed(2)}</td>
                <td class="${cantidadClase}">${producto.cantidad}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary" onclick="abrirModalEditar(${producto.id})">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="borrarProducto(${producto.id})">Borrar</button>
                </td>
            `;
            tablaProductos.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        mostrarAlerta('No se pudo conectar con el servidor. Intenta de nuevo.', 'danger');
    }
}

// Prepara el modal vacío para agregar un producto nuevo
function abrirModalNuevo() {
    formProducto.reset();
    document.getElementById('productoId').value = '';
    modalTitulo.textContent = 'Agregar producto';
}

// Busca un producto por id y llena el modal para editarlo
async function abrirModalEditar(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (!respuesta.ok) throw new Error('No se pudo obtener el producto');

        const producto = await respuesta.json();

        document.getElementById('productoId').value = producto.id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion || '';
        document.getElementById('categoria').value = producto.categoria || '';
        document.getElementById('precio').value = producto.precio;
        document.getElementById('cantidad').value = producto.cantidad;

        modalTitulo.textContent = 'Editar producto';
        modalProducto.show();
    } catch (error) {
        console.error(error);
        mostrarAlerta('No se pudo cargar el producto para editar.', 'danger');
    }
}

// Envía el formulario: crea un producto nuevo o actualiza uno existente
formProducto.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const id = document.getElementById('productoId').value;

    const datosProducto = {
        nombre: document.getElementById('nombre').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        categoria: document.getElementById('categoria').value.trim(),
        precio: parseFloat(document.getElementById('precio').value),
        cantidad: parseInt(document.getElementById('cantidad').value, 10)
    };

    const esEdicion = Boolean(id);
    const url = esEdicion ? `${API_URL}/${id}` : API_URL;
    const metodo = esEdicion ? 'PUT' : 'POST';

    try {
        const respuesta = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosProducto)
        });

        if (!respuesta.ok) throw new Error('Error al guardar el producto');

        modalProducto.hide();
        mostrarAlerta(esEdicion ? 'Producto actualizado correctamente.' : 'Producto agregado correctamente.');
        cargarProductos();
    } catch (error) {
        console.error(error);
        mostrarAlerta('No se pudo guardar el producto.', 'danger');
    }
});

// Borra un producto, pidiendo confirmación antes
async function borrarProducto(id) {
    if (!confirm('¿Seguro que quieres borrar este producto?')) return;

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!respuesta.ok) throw new Error('Error al borrar el producto');

        mostrarAlerta('Producto eliminado correctamente.');
        cargarProductos();
    } catch (error) {
        console.error(error);
        mostrarAlerta('No se pudo borrar el producto.', 'danger');
    }
}
