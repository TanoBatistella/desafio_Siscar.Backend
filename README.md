BACKEND

git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@example.com"

git clone https://github.com/tuUsuario/desafio_Siscar.Backend.git

Navegar al directorio del backend: cd backend

Instalar dependencias: npm install


Crear archivo .env en la raíz del directorio backend:
envCopyDB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_SERVER=localhost
DB_DATABASE=ProductosDB
PORT=3000


Iniciar el servidor: npm start

El backend estará corriendo en http://localhost:3000