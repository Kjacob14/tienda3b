-- Base de datos para el sistema de inventario de Tienda 3B

CREATE DATABASE IF NOT EXISTS tienda3b;
USE tienda3b;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL DEFAULT 0,
    categoria VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario dedicado para que el backend se conecte (mejor que usar root)
CREATE USER IF NOT EXISTS 'tienda3b_user'@'%' IDENTIFIED BY 'Tienda3B_2026';
GRANT ALL PRIVILEGES ON tienda3b.* TO 'tienda3b_user'@'%';
FLUSH PRIVILEGES;

-- Datos de ejemplo para probar que todo funciona
INSERT INTO productos (nombre, descripcion, precio, cantidad, categoria) VALUES
('Sabritas Original 45g', 'Papas fritas sabor natural', 18.50, 40, 'Botanas'),
('Jabon Zote blanco', 'Barra de jabon multiusos 400g', 22.00, 25, 'Limpieza'),
('Coca-Cola 600ml', 'Refresco de cola, botella de plastico', 20.00, 60, 'Bebidas'),
('Leche Lala entera 1L', 'Leche entera pasteurizada', 27.50, 18, 'Lacteos'),
('Frijol negro La Costena 560g', 'Frijol de la olla en lata', 24.90, 30, 'Abarrotes'),
('Papel higienico Petalo 4 rollos', 'Paquete de 4 rollos dobles', 55.00, 15, 'Limpieza'),
('Huevo San Juan 12 pzas', 'Carton de huevo blanco', 42.00, 20, 'Abarrotes'),
('Detergente Ariel 1kg', 'Detergente en polvo para ropa', 68.00, 12, 'Limpieza'),
('Pan Bimbo grande', 'Pan de caja blanco 680g', 39.00, 22, 'Panaderia'),
('Agua Ciel 1.5L', 'Agua purificada sin gas', 15.00, 50, 'Bebidas');
