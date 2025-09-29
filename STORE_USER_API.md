# Store-User Management API Documentation

## Overview
This document describes the REST API endpoints for managing the many-to-many relationship between stores and users, including primary user assignment.

## Base URL
All endpoints are prefixed with `/stores`

## Authentication
All endpoints require JWT authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Add User to Store
**POST** `/stores/:id/users`

Adds a user to a store with optional primary user assignment.

**Required Roles:** `admin`, `user`, `vendedor`

**Path Parameters:**
- `id`: Store ID (integer)

**Request Body:**
```json
{
  "userId": 2,
  "isPrimary": false
}
```

**Response:**
```json
{
  "id": 1,
  "storeId": 1,
  "userId": 2,
  "isPrimary": false,
  "status": "active",
  "joinedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get Store Users
**GET** `/stores/:id/users`

Retrieves all users associated with a specific store.

**Required Roles:** Any authenticated user

**Path Parameters:**
- `id`: Store ID (integer)

**Response:**
```json
[
  {
    "id": 1,
    "storeId": 1,
    "userId": 1,
    "isPrimary": true,
    "status": "active",
    "joinedAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "storeId": 1,
    "userId": 2,
    "isPrimary": false,
    "status": "active",
    "joinedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### 3. Get User Stores
**GET** `/stores/user/:userId/stores`

Retrieves all stores associated with a specific user.

**Required Roles:** Any authenticated user

**Path Parameters:**
- `userId`: User ID (integer)

**Response:**
```json
[
  {
    "id": 1,
    "storeId": 1,
    "userId": 1,
    "isPrimary": true,
    "status": "active",
    "joinedAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 3,
    "storeId": 2,
    "userId": 1,
    "isPrimary": false,
    "status": "active",
    "joinedAt": "2024-01-15T11:00:00.000Z"
  }
]
```

### 4. Get Primary User
**GET** `/stores/:id/primary-user`

Retrieves the primary user of a specific store.

**Required Roles:** Any authenticated user

**Path Parameters:**
- `id`: Store ID (integer)

**Response:**
```json
{
  "id": 1,
  "storeId": 1,
  "userId": 1,
  "isPrimary": true,
  "status": "active",
  "joinedAt": "2024-01-15T10:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "No hay usuario principal asignado"
}
```

### 5. Set Primary User
**PUT** `/stores/:id/users/:userId/set-primary`

Sets a user as the primary user of a store. This will automatically unset any existing primary user.

**Required Roles:** `admin`, `user`, `vendedor`

**Path Parameters:**
- `id`: Store ID (integer)
- `userId`: User ID (integer)

**Response:**
```json
{
  "message": "Usuario establecido como principal exitosamente"
}
```

**Error Response (400):**
```json
{
  "message": "No se pudo establecer el usuario como principal"
}
```

### 6. Remove User from Store
**DELETE** `/stores/:id/users/:userId`

Removes a user from a store.

**Required Roles:** `admin`, `user`, `vendedor`

**Path Parameters:**
- `id`: Store ID (integer)
- `userId`: User ID (integer)

**Response:**
```json
{
  "message": "Usuario removido de la tienda exitosamente"
}
```

**Error Response (400):**
```json
{
  "message": "No se pudo remover el usuario de la tienda"
}
```

## Data Models

### StoreUser
```typescript
{
  id: number;           // Auto-generated primary key
  storeId: number;      // Foreign key to store
  userId: number;       // Foreign key to user
  isPrimary: boolean;   // Whether this user is the primary user of the store
  status: string;       // User status in the store ('active', 'inactive')
  joinedAt: Date;       // When the user was added to the store
}
```

### Add User to Store Request
```typescript
{
  userId: number;       // Required, integer, minimum value 1
  isPrimary: boolean;   // Optional, defaults to false
}
```

## Business Rules

1. **Unique Constraint**: A user can only be associated with a store once (unique store_id, user_id combination)
2. **Primary User**: Only one user can be the primary user of a store at any time
3. **Cascade Delete**: When a store or user is deleted, all associated store-user relationships are automatically deleted
4. **Status Management**: Users can be marked as 'active' or 'inactive' in a store
5. **Ordering**: Store users are returned ordered by primary status (primary first) and then by join date

## Error Codes

- `400 Bad Request`: Invalid request data or validation errors
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Insufficient permissions for the operation
- `404 Not Found`: Store or user not found
- `409 Conflict`: User already associated with store
- `500 Internal Server Error`: Server error

## Example Usage

### Add a user to a store
```bash
curl -X POST http://localhost:3000/stores/1/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "userId": 2,
    "isPrimary": false
  }'
```

### Get all users of a store
```bash
curl -X GET http://localhost:3000/stores/1/users \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Set a user as primary
```bash
curl -X PUT http://localhost:3000/stores/1/users/2/set-primary \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Remove a user from a store
```bash
curl -X DELETE http://localhost:3000/stores/1/users/2 \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Use Cases

### Store Management
- **Multi-user Stores**: Stores can have multiple users with different roles
- **Primary User Assignment**: Each store has one primary user who can manage the store
- **User Access Control**: Users can be added/removed from stores as needed

### User Management
- **Multi-store Access**: Users can be associated with multiple stores
- **Role-based Access**: Different users can have different access levels to stores
- **Store Switching**: Users can easily switch between their associated stores

### Business Logic
- **Primary User Transfer**: Primary user status can be transferred between users
- **Status Management**: Users can be temporarily deactivated from stores
- **Audit Trail**: Track when users were added to stores and their status changes
