# Guía de Autorización - AuthGuard

## 🔐 Sistema de Autorización Implementado

El proyecto ahora incluye un sistema completo de autorización con JWT y control de roles.

### 📋 Endpoints Protegidos

#### **Usuarios (`/users`)**

| Método | Endpoint | Autenticación | Roles Requeridos | Descripción |
|--------|----------|---------------|------------------|-------------|
| `POST` | `/users` | ✅ Sí | `admin` | Crear usuario (solo administradores) |
| `GET` | `/users` | ✅ Sí | `admin` | Listar todos los usuarios |
| `GET` | `/users/:id` | ✅ Sí | - | Obtener usuario por ID |
| `PUT` | `/users/:id` | ✅ Sí | `admin`, `user` | Actualizar usuario |
| `DELETE` | `/users/:id` | ✅ Sí | `admin` | Eliminar usuario |

#### **Autenticación (`/auth`)**

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `POST` | `/auth/login` | ❌ No | Iniciar sesión |
| `POST` | `/auth/refresh` | ❌ No | Renovar token |

> **Nota**: Los endpoints de autenticación son los únicos que no requieren autorización, ya que son necesarios para obtener el token JWT.

#### **Rutas Protegidas (`/protected`)**

| Método | Endpoint | Autenticación | Roles Requeridos | Descripción |
|--------|----------|---------------|------------------|-------------|
| `GET` | `/protected` | ✅ Sí | - | Ruta básica protegida |
| `GET` | `/protected/admin` | ✅ Sí | `admin` | Solo administradores |
| `GET` | `/protected/vendedor` | ✅ Sí | `admin`, `vendedor` | Admin y vendedores |

### 🛡️ Cómo Usar la Autorización

#### **1. Flujo de Registro de Usuarios**

Dado que la creación de usuarios ahora requiere autorización de administrador, el flujo recomendado es:

1. **Primer administrador**: Crear manualmente en la base de datos o usar un script de inicialización
2. **Usuarios adicionales**: Crear a través del endpoint `/users` con token de administrador

#### **2. Headers Requeridos**

Para endpoints protegidos, incluir en el header:

```
Authorization: Bearer <jwt_token>
```

#### **3. Ejemplo de Uso**

```bash
# Login para obtener token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "password123"}'

# Usar token para crear usuario (solo administradores)
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer <token_recibido>" \
  -H "Content-Type: application/json" \
  -d '{"email": "nuevo@example.com", "password": "password123", ...}'

# Usar token para acceder a endpoint protegido
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer <token_recibido>"
```

#### **4. Respuestas de Error**

- **401 Unauthorized**: Token inválido o expirado
- **403 Forbidden**: Usuario sin permisos para el rol requerido

### 🔧 Implementación Técnica

#### **Guards Utilizados**

1. **`AuthGuard('jwt')`**: Verifica la validez del JWT
2. **`RolesGuard`**: Verifica que el usuario tenga los roles necesarios

#### **Decoradores**

- **`@UseGuards(AuthGuard('jwt'))`**: Protege con JWT
- **`@UseGuards(AuthGuard('jwt'), RolesGuard)`**: Protege con JWT + roles
- **`@Roles('admin', 'user')`**: Especifica roles requeridos

#### **Ejemplo de Implementación**

```typescript
@Get()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
async findAll() {
  // Solo usuarios con rol 'admin' pueden acceder
}
```

### 📝 Roles Disponibles

- **`admin`**: Acceso completo al sistema
- **`user`**: Usuario estándar con permisos limitados
- **`vendedor`**: Vendedor con permisos específicos

### 🚀 Próximos Pasos

1. **Implementar middleware de logging** para auditoría
2. **Agregar rate limiting** para prevenir ataques
3. **Implementar refresh token** automático
4. **Agregar tests de autorización**
5. **Documentar con Swagger** los endpoints protegidos
