package com.inventory.ServiceImpl;

import com.inventory.DTO.ProductRequestDTO;
import com.inventory.Entity.Category;
import com.inventory.Entity.Product;
import com.inventory.Entity.SubCategory;
import com.inventory.Repository.CategoryRepository;
import com.inventory.Repository.ProductRepository;
import com.inventory.Repository.SubCategoryRepository;
import com.inventory.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    @Override
    public Product createProduct(ProductRequestDTO productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setAvailableQuantity(productRequest.getAvailableQuantity());
        product.setSku(productRequest.getSku());
        product.setStatus(productRequest.getStatus());
        
        // Handle category selection - check if it's a main category or subcategory
        if (productRequest.getCategoryId() != null) {
            // First check if it's a main category
            Category category = categoryRepository.findById(productRequest.getCategoryId()).orElse(null);
            if (category != null) {
                product.setCategory(category);
            } else {
                // If not found as main category, check if it's a subcategory
                SubCategory subCategory = subCategoryRepository.findById(productRequest.getCategoryId()).orElse(null);
                if (subCategory != null) {
                    product.setSubCategory(subCategory);
                    // Also set the main category from the subcategory
                    product.setCategory(subCategory.getCategory());
                } else {
                    throw new RuntimeException("Category or SubCategory not found with ID: " + productRequest.getCategoryId());
                }
            }
        }
        
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, ProductRequestDTO productRequest) {
        Product existingProduct = getProductById(id);
        existingProduct.setName(productRequest.getName());
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setAvailableQuantity(productRequest.getAvailableQuantity());
        existingProduct.setSku(productRequest.getSku());
        existingProduct.setStatus(productRequest.getStatus());
        
        // Handle category update - check if it's a main category or subcategory
        if (productRequest.getCategoryId() != null) {
            // First check if it's a main category
            Category category = categoryRepository.findById(productRequest.getCategoryId()).orElse(null);
            if (category != null) {
                existingProduct.setCategory(category);
                existingProduct.setSubCategory(null); // Clear subcategory if main category is selected
            } else {
                // If not found as main category, check if it's a subcategory
                SubCategory subCategory = subCategoryRepository.findById(productRequest.getCategoryId()).orElse(null);
                if (subCategory != null) {
                    existingProduct.setSubCategory(subCategory);
                    // Also set the main category from the subcategory
                    existingProduct.setCategory(subCategory.getCategory());
                } else {
                    throw new RuntimeException("Category or SubCategory not found with ID: " + productRequest.getCategoryId());
                }
            }
        } else {
            existingProduct.setCategory(null);
            existingProduct.setSubCategory(null);
        }
        
        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    @Override
    public List<Product> getProductsByStatus(String status) {
        return productRepository.findByStatus(status);
    }

    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategory_Id(categoryId);
    }
}