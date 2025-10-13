-- ======================================
-- Crear bases de datos
-- ======================================
CREATE DATABASE login_db;
CREATE DATABASE message_db;
CREATE DATABASE user_db;
CREATE DATABASE userservice_db;

-- ======================================
-- Crear usuarios y contraseñas
-- ======================================
CREATE USER login_user WITH ENCRYPTED PASSWORD 'loginpass';
CREATE USER message_user WITH ENCRYPTED PASSWORD 'messagepass';
CREATE USER user_user WITH ENCRYPTED PASSWORD 'userpass';
CREATE USER user_service_user WITH ENCRYPTED PASSWORD 'userservicepass';

-- ======================================
-- Conceder permisos a cada base de datos
-- ======================================
GRANT ALL PRIVILEGES ON DATABASE login_db TO login_user;
GRANT ALL PRIVILEGES ON DATABASE message_db TO message_user;
GRANT ALL PRIVILEGES ON DATABASE user_db TO user_user;
GRANT ALL PRIVILEGES ON DATABASE userservice_db TO user_service_user;
