# User Roles Documentation

## Overview
This document describes the user roles available in the restaurant management system and their permissions.

## Available Roles

### 1. Admin (`admin`)
**Highest level of access**
- Full system access
- Can manage all stores, users, and tables
- Can assign and remove any role
- Can delete any resource

### 2. User (`user`)
**Standard user access**
- Can create and manage their own stores
- Can manage tables in their stores
- Can add/remove users from their stores
- Can set primary users in their stores

### 3. Vendedor (`vendedor`)
**Sales/Management role**
- Similar to `user` role
- Can manage stores and tables
- Can handle sales operations
- Can manage store users

### 4. Chef (`chef`)
**Kitchen management role**
- Can create stores (restaurant management)
- Can manage tables in their stores
- Can view all tables and their status
- Can update table information
- Cannot delete tables (only admin/user/vendedor can)

### 5. Waiter (`waiter`)
**Service role**
- Can view tables and their status
- Can update table status (e.g., mark as occupied/free)
- Can search for stores and tables
- Cannot create or delete resources
- Limited to operational tasks

## Role Permissions Matrix

| Action | Admin | User | Vendedor | Chef | Waiter |
|--------|-------|------|----------|------|--------|
| Create Store | ✅ | ✅ | ✅ | ✅ | ❌ |
| View All Stores | ✅ | ❌ | ❌ | ❌ | ❌ |
| Search Stores | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update Store | ✅ | ✅ | ✅ | ✅ | ❌ |
| Delete Store | ✅ | ✅ | ✅ | ❌ | ❌ |
| Create Table | ✅ | ✅ | ✅ | ✅ | ❌ |
| View Tables | ✅ | ✅ | ✅ | ✅ | ✅ |
| Update Table | ✅ | ✅ | ✅ | ✅ | ✅ |
| Delete Table | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manage Store Users | ✅ | ✅ | ✅ | ❌ | ❌ |
| Set Primary User | ✅ | ✅ | ✅ | ❌ | ❌ |

## API Endpoint Access

### Store Management
- **Create Store**: `admin`, `user`, `vendedor`, `chef`
- **View All Stores**: `admin` only
- **Search Stores**: `admin`, `user`, `vendedor`, `chef`, `waiter`
- **Update Store**: `admin`, `user`, `vendedor`
- **Delete Store**: `admin`, `user`, `vendedor`

### Table Management
- **Create Table**: `admin`, `user`, `vendedor`, `chef`
- **View Tables**: `admin`, `user`, `vendedor`, `chef`, `waiter`
- **Update Table**: `admin`, `user`, `vendedor`, `chef`, `waiter`
- **Delete Table**: `admin`, `user`, `vendedor`, `chef`

### Store-User Management
- **Add User to Store**: `admin`, `user`, `vendedor`
- **View Store Users**: Any authenticated user
- **Set Primary User**: `admin`, `user`, `vendedor`
- **Remove User from Store**: `admin`, `user`, `vendedor`

## Use Cases by Role

### Chef Role
- **Restaurant Management**: Chefs can create and manage restaurant stores
- **Table Management**: Can set up and manage table layouts
- **Kitchen Operations**: Can monitor table status for order management
- **Staff Coordination**: Can view which tables are occupied/free

### Waiter Role
- **Service Operations**: Can update table status as customers arrive/leave
- **Table Monitoring**: Can check table availability and status
- **Customer Service**: Can search for specific tables or stores
- **Order Management**: Can mark tables as occupied when taking orders

## Role Assignment

### During User Registration
```json
{
  "email": "chef@restaurant.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "address": "Calle Principal 123",
  "country": "España",
  "age": 30,
  "roles": ["chef"],
  "gender": "male"
}
```

### Multiple Roles
Users can have multiple roles:
```json
{
  "roles": ["chef", "waiter"]
}
```

## Security Considerations

1. **Role Validation**: All endpoints validate user roles before allowing access
2. **JWT Integration**: Roles are included in JWT tokens for stateless authentication
3. **Hierarchical Access**: Some roles have broader permissions than others
4. **Resource Ownership**: Users can only manage resources they own or have access to

## Database Schema

### User Entity
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  roles ENUM('admin', 'user', 'vendedor', 'waiter', 'chef')[] NOT NULL,
  gender VARCHAR(50) NOT NULL
);
```

## Migration

To add the new roles to an existing database, run the migration script:

```sql
-- For PostgreSQL
ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'waiter';
ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'chef';

-- For MySQL
ALTER TABLE users MODIFY COLUMN roles ENUM('admin', 'user', 'vendedor', 'waiter', 'chef')[];
```

## Examples

### Chef Creating a Restaurant Store
```bash
curl -X POST http://localhost:3000/stores \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <chef-jwt-token>" \
  -d '{
    "storeType": "restaurant",
    "name": "Restaurante El Chef",
    "address": "Calle Gourmet 123",
    "country": "España",
    "phone": "+34 123 456 789",
    "userId": 1
  }'
```

### Waiter Updating Table Status
```bash
curl -X PUT http://localhost:3000/tables/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <waiter-jwt-token>" \
  -d '{
    "status": "occupied"
  }'
```

### Waiter Searching for Tables
```bash
curl -X GET "http://localhost:3000/tables?storeId=1&status=free" \
  -H "Authorization: Bearer <waiter-jwt-token>"
```

