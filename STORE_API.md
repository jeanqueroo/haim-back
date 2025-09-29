# Store CRUD API

Este documento describe los endpoints disponibles para el CRUD de tiendas (stores).

## Campos de la Tienda

- **storeType**: Tipo de tienda (enum)
  - `retail` - Minorista
  - `wholesale` - Mayorista
  - `online` - En línea
  - `restaurant` - Restaurante
  - `pharmacy` - Farmacia
  - `clothing` - Ropa
  - `electronics` - Electrónicos
  - `grocery` - Abarrotes
  - `other` - Otro

- **name**: Nombre de la tienda (string)
- **address**: Dirección de la tienda (string)
- **country**: País (string)
- **phone**: Teléfono (string)
- **userId**: ID del usuario propietario (number)

## Endpoints

### 1. Crear Tienda
```
POST /stores
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "storeType": "retail",
  "name": "Mi Tienda",
  "address": "Calle Principal 123",
  "country": "México",
  "phone": "+52 55 1234 5678",
  "userId": 1
}
```

**Respuesta:**
```json
{
  "id": 1,
  "storeType": "retail",
  "name": "Mi Tienda",
  "address": "Calle Principal 123",
  "country": "México",
  "phone": "+52 55 1234 5678",
  "userId": 1
}
```

### 2. Obtener Todas las Tiendas (Solo Admin)
```
GET /stores
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "storeType": "retail",
    "name": "Mi Tienda",
    "address": "Calle Principal 123",
    "country": "México",
    "phone": "+52 55 1234 5678",
    "userId": 1
  }
]
```

### 3. Obtener Tiendas por Usuario
```
GET /stores/user/:userId
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "storeType": "retail",
    "name": "Mi Tienda",
    "address": "Calle Principal 123",
    "country": "México",
    "phone": "+52 55 1234 5678",
    "userId": 1
  }
]
```

### 4. Obtener Tienda por ID
```
GET /stores/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta:**
```json
{
  "id": 1,
  "storeType": "retail",
  "name": "Mi Tienda",
  "address": "Calle Principal 123",
  "country": "México",
  "phone": "+52 55 1234 5678",
  "userId": 1
}
```

### 5. Actualizar Tienda
```
PUT /stores/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Body:**
```json
{
  "name": "Mi Tienda Actualizada",
  "phone": "+52 55 9876 5432"
}
```

**Respuesta:**
```json
{
  "id": 1,
  "storeType": "retail",
  "name": "Mi Tienda Actualizada",
  "address": "Calle Principal 123",
  "country": "México",
  "phone": "+52 55 9876 5432",
  "userId": 1
}
```

### 6. Eliminar Tienda
```
DELETE /stores/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Respuesta:**
```json
{
  "message": "Tienda eliminada exitosamente"
}
```

## Permisos

- **Crear Tienda**: `admin`, `user`, `vendedor`
- **Obtener Todas las Tiendas**: `admin` únicamente
- **Obtener Tiendas por Usuario**: Cualquier usuario autenticado
- **Obtener Tienda por ID**: Cualquier usuario autenticado
- **Actualizar Tienda**: `admin`, `user`, `vendedor`
- **Eliminar Tienda**: `admin`, `user`, `vendedor`

## Relación con Usuario

Cada tienda está relacionada con un usuario a través del campo `userId`, que referencia a la tabla `users`. Esta relación permite:

- Un usuario puede tener múltiples tiendas
- Filtrar tiendas por usuario
- Mantener la integridad referencial

