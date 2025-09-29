# Table API Documentation

## Overview
This document describes the REST API endpoints for managing tables in the restaurant management system.

## Base URL
All endpoints are prefixed with `/tables`

## Authentication
All endpoints require JWT authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Create Table
**POST** `/tables`

Creates a new table.

**Required Roles:** `admin`, `user`, `vendedor`

**Request Body:**
```json
{
  "tableNumber": 1,
  "capacity": 4,
  "status": "free",
  "storeId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "tableNumber": 1,
  "capacity": 4,
  "status": "free"
}
```

### 2. Get All Tables
**GET** `/tables`

Retrieves all tables or filters by status.

**Required Roles:** `admin`, `user`, `vendedor`

**Query Parameters:**
- `status` (optional): Filter by table status (`free`, `occupied`, `reserved`)
- `storeId` (optional): Filter by store ID

**Examples:** 
- `GET /tables?status=free`
- `GET /tables?storeId=1`
- `GET /tables?storeId=1&status=free`

**Response:**
```json
[
  {
    "id": 1,
    "tableNumber": 1,
    "capacity": 4,
    "status": "free",
    "storeId": 1
  },
  {
    "id": 2,
    "tableNumber": 2,
    "capacity": 6,
    "status": "occupied",
    "storeId": 1
  }
]
```

### 3. Get Table by ID
**GET** `/tables/:id`

Retrieves a specific table by its ID.

**Required Roles:** Any authenticated user

**Path Parameters:**
- `id`: Table ID (integer)

**Response:**
```json
{
  "id": 1,
  "tableNumber": 1,
  "capacity": 4,
  "status": "free"
}
```

**Error Response (404):**
```json
{
  "message": "Mesa no encontrada"
}
```

### 4. Update Table
**PUT** `/tables/:id`

Updates an existing table.

**Required Roles:** `admin`, `user`, `vendedor`

**Path Parameters:**
- `id`: Table ID (integer)

**Request Body:**
```json
{
  "tableNumber": 1,
  "capacity": 6,
  "status": "occupied",
  "storeId": 1
}
```

**Response:**
```json
{
  "id": 1,
  "tableNumber": 1,
  "capacity": 6,
  "status": "occupied"
}
```

**Error Response (404):**
```json
{
  "message": "Mesa no encontrada"
}
```

### 5. Delete Table
**DELETE** `/tables/:id`

Deletes a table.

**Required Roles:** `admin`, `user`, `vendedor`

**Path Parameters:**
- `id`: Table ID (integer)

**Response:**
```json
{
  "message": "Mesa eliminada exitosamente"
}
```

**Error Response (404):**
```json
{
  "message": "Mesa no encontrada"
}
```

## Data Models

### Table
```typescript
{
  id: number;           // Auto-generated primary key
  tableNumber: number;  // Table number (unique per store)
  capacity: number;     // Number of seats
  status: TableStatus;  // Table status enum
  storeId: number;      // Foreign key to store
}
```

### TableStatus Enum
```typescript
enum TableStatus {
  FREE = 'free',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved'
}
```

## Validation Rules

### Create Table Request
- `tableNumber`: Required, integer, minimum value 1
- `capacity`: Required, integer, minimum value 1
- `status`: Optional, must be one of: `free`, `occupied`, `reserved` (defaults to `free`)
- `storeId`: Required, integer, minimum value 1

### Update Table Request
- `tableNumber`: Optional, integer, minimum value 1
- `capacity`: Optional, integer, minimum value 1
- `status`: Optional, must be one of: `free`, `occupied`, `reserved`
- `storeId`: Optional, integer, minimum value 1

## Error Codes

- `400 Bad Request`: Invalid request data or validation errors
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Insufficient permissions for the operation
- `404 Not Found`: Table not found
- `500 Internal Server Error`: Server error

## Example Usage

### Create a new table
```bash
curl -X POST http://localhost:3000/tables \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "tableNumber": 5,
    "capacity": 8,
    "status": "free",
    "storeId": 1
  }'
```

### Get all free tables for a specific store
```bash
curl -X GET "http://localhost:3000/tables?storeId=1&status=free" \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Get all tables for a store
```bash
curl -X GET "http://localhost:3000/tables?storeId=1" \
  -H "Authorization: Bearer <your-jwt-token>"
```

### Update table status
```bash
curl -X PUT http://localhost:3000/tables/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "status": "occupied"
  }'
```
