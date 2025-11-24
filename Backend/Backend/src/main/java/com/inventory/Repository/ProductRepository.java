package com.inventory.Repository;

import com.inventory.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Filter by Category
    List<Product> findByCategory_NameIgnoreCase(String categoryName);
    List<Product> findByCategory_Id(Long categoryId);

    // Filter by SubCategory
    List<Product> findBySubCategory_NameIgnoreCase(String subCategoryName);
    
    // Find by product name (case insensitive)
    List<Product> findByNameIgnoreCase(String name);
    
    // Search products
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
    
    // Filter by status
    List<Product> findByStatus(String status);
}

