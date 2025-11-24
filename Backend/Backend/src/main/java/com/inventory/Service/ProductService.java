package com.inventory.Service;

import com.inventory.DTO.ProductRequestDTO;
import com.inventory.Entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProduct(ProductRequestDTO productRequest);
    Product updateProduct(Long id, ProductRequestDTO productRequest);
    void deleteProduct(Long id);
    List<Product> searchProducts(String query);
    List<Product> getProductsByStatus(String status);
    List<Product> getProductsByCategory(Long categoryId);
}