-- Crear bases de datos
CREATE DATABASE login_db;
CREATE DATABASE message_db;

-- Crear usuarios y contraseñas
CREATE USER login_user WITH ENCRYPTED PASSWORD 'loginpass';
CREATE USER message_user WITH ENCRYPTED PASSWORD 'messagepass';

-- Conceder permisos a cada base de datos
GRANT ALL PRIVILEGES ON DATABASE login_db TO login_user;
GRANT ALL PRIVILEGES ON DATABASE message_db TO message_user;
