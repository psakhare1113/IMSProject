-- SQL Script to check and fix product category assignments
-- Run this in your MySQL database

-- First, let's see all categories and their IDs
SELECT id, name, parent_category_id FROM categories ORDER BY id;

-- Check all products and their current category assignments
SELECT 
    p.id,
    p.name as product_name,
    p.category_id,
    c.name as category_name,
    p.subcategory_id,
    sc.name as subcategory_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN categories sc ON p.subcategory_id = sc.id
ORDER BY p.id;

-- Find the Furniture category ID (adjust based on your actual category name)
SELECT id FROM categories WHERE name = 'Furniture' OR name = 'furniture';

-- Example: Update bed products to Furniture category (replace X with actual Furniture category ID)
-- UPDATE products SET category_id = X, subcategory_id = NULL WHERE name LIKE '%bed%';

-- Example: Update chair products to Furniture category
-- UPDATE products SET category_id = X, subcategory_id = NULL WHERE name LIKE '%chair%';

-- Example: Update sofa products to Furniture category
-- UPDATE products SET category_id = X, subcategory_id = NULL WHERE name LIKE '%sofa%';

-- Example: Update table products to Furniture category
-- UPDATE products SET category_id = X, subcategory_id = NULL WHERE name LIKE '%table%';

-- After running updates, verify the changes
SELECT 
    p.id,
    p.name as product_name,
    p.category_id,
    c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.name LIKE '%bed%' OR p.name LIKE '%chair%' OR p.name LIKE '%sofa%' OR p.name LIKE '%table%'
ORDER BY p.name;
