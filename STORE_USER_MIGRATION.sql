-- Store-User Migration Script
-- This script creates the store_users table for the many-to-many relationship between stores and users

CREATE TABLE IF NOT EXISTS store_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    user_id INT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive') DEFAULT 'active',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_store_user (store_id, user_id)
);

-- Add indexes for better performance
CREATE INDEX idx_store_users_store_id ON store_users(store_id);
CREATE INDEX idx_store_users_user_id ON store_users(user_id);
CREATE INDEX idx_store_users_is_primary ON store_users(is_primary);
CREATE INDEX idx_store_users_status ON store_users(status);

-- Insert some sample data (optional)
-- Note: Make sure you have stores and users with the specified IDs before running this
INSERT INTO store_users (store_id, user_id, is_primary, status) VALUES
(1, 1, TRUE, 'active'),
(1, 2, FALSE, 'active'),
(1, 3, FALSE, 'active'),
(2, 1, FALSE, 'active'),
(2, 4, TRUE, 'active'),
(2, 5, FALSE, 'active');
