-- Table Migration Script
-- This script creates the tables table for the restaurant management system

CREATE TABLE IF NOT EXISTS tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL,
    capacity INT NOT NULL,
    status ENUM('free','occupied','reserved') DEFAULT 'free',
    store_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    UNIQUE KEY unique_table_per_store (table_number, store_id)
);

-- Add indexes for better performance
CREATE INDEX idx_table_number ON tables(table_number);
CREATE INDEX idx_status ON tables(status);
CREATE INDEX idx_store_id ON tables(store_id);

-- Insert some sample data (optional)
-- Note: Make sure you have stores with IDs 1 and 2 before running this
INSERT INTO tables (table_number, capacity, status, store_id) VALUES
(1, 4, 'free', 1),
(2, 6, 'free', 1),
(3, 2, 'free', 1),
(4, 8, 'free', 1),
(5, 4, 'free', 1),
(1, 4, 'free', 2),
(2, 6, 'free', 2),
(3, 2, 'free', 2),
(4, 8, 'free', 2),
(5, 4, 'free', 2);
