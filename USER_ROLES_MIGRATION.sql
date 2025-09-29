-- User Roles Migration Script
-- This script adds the new roles 'waiter' and 'chef' to the existing user roles

-- Add new roles to the enum (if using PostgreSQL)
-- Note: This syntax is for PostgreSQL. For MySQL, you would need to alter the column differently.

-- For PostgreSQL:
ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'waiter';
ALTER TYPE userrole ADD VALUE IF NOT EXISTS 'chef';

-- For MySQL, you would need to:
-- 1. Create a new column with the updated enum
-- 2. Copy data from old column to new column
-- 3. Drop old column
-- 4. Rename new column

-- Example for MySQL:
-- ALTER TABLE users MODIFY COLUMN roles ENUM('admin', 'user', 'vendedor', 'waiter', 'chef')[];

-- Update existing users to include new roles (optional)
-- You can assign these roles to existing users as needed

-- Example: Assign 'chef' role to user with ID 1
-- UPDATE users SET roles = array_append(roles, 'chef') WHERE id = 1;

-- Example: Assign 'waiter' role to user with ID 2
-- UPDATE users SET roles = array_append(roles, 'waiter') WHERE id = 2;

-- Note: The exact syntax depends on your database system (PostgreSQL vs MySQL)
-- and how you're storing the roles array.
