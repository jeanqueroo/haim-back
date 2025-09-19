⚡ Comandos útiles
1. Construir la imagen
docker-compose build

2. Levantar el contenedor
docker compose --env-file .env up -d

3. Ver logs
docker-compose logs -f backend

4. Detener contenedor
docker-compose down

🚀 Resultado

Tu API NestJS correrá en:
👉 http://localhost:3000

Usa el .env para definir el puerto y la configuración:

PORT=3000
JWT_SECRET=mi_clave_secreta_super_segura
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d