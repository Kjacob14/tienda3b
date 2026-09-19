# Tienda 3B - Control de Inventario

Proyecto de práctica de redes (GNS3): sistema de inventario con frontend estático,
API backend en Node/Express y base de datos MySQL.

## Estructura
- `frontend/` — index.html, style.css, script.js (se sirve tal cual, sin build).
- `backend/` — API en Node.js + Express + mysql2.
- `backend/db/init.sql` — script para crear la base, la tabla y el usuario.

## Backend: variables de entorno
El backend lee estas variables (con valores por defecto si no se definen):
- `DB_HOST` (default: 192.168.20.4)
- `DB_USER` (default: tienda3b_user)
- `DB_PASSWORD` (default: Tienda3B_2026)
- `DB_NAME` (default: tienda3b)

## Frontend
`script.js` apunta a `http://api.tienda.lab:3000/api/productos`. Si cambias el
dominio/IP del backend, actualiza la constante `API_URL` en ese archivo.

## Correr en local (fuera de GNS3, para desarrollo)
```
cd backend
npm install
DB_HOST=localhost npm start
```
Y abre `frontend/index.html` directo en el navegador, o sírvelo con cualquier
servidor estático.
