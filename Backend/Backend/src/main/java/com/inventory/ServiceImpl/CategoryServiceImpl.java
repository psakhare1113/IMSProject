package com.inventory.ServiceImpl;

import com.inventory.Entity.Category;
import com.inventory.Entity.SubCategory;
import com.inventory.Repository.CategoryRepository;
import com.inventory.Repository.SubCategoryRepository;
import com.inventory.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    // Create a new Category (main category only)
    public Category createCategory(Category category) {
        // Ensure it's a main category
        category.setParentCategory(null);
        return categoryRepository.save(category);
    }

    // Create SubCategory under a Category
    public SubCategory createSubCategory(Long categoryId, SubCategory subCategory) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + categoryId));

        subCategory.setCategory(category);
        return subCategoryRepository.save(subCategory);
    }

    // Get all Categories (main categories only)
    public List<Category> getAllCategories() {
        return categoryRepository.findByParentCategoryIsNull();
    }
    
    // Get all SubCategories
    public List<SubCategory> getAllSubCategories() {
        return subCategoryRepository.findAll();
    }
    // Get SubCategories by Category
    public List<SubCategory> getSubCategoriesByCategory(Long categoryId) {
        return subCategoryRepository.findByCategory_Id(categoryId);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category not found with ID: " + id);
        }
        
        // Check if category has subcategories
        List<SubCategory> relatedSubCategories = subCategoryRepository.findByCategory_Id(id);
        if (!relatedSubCategories.isEmpty()) {
            throw new RuntimeException("Cannot delete category. It has " + relatedSubCategories.size() + " subcategories. Delete subcategories first.");
        }
        
        categoryRepository.deleteById(id);
    }

    @Override
    public void deleteSubCategory(Long id) {
        if (!subCategoryRepository.existsById(id)) {
            throw new RuntimeException("SubCategory not found with ID: " + id);
        }
        subCategoryRepository.deleteById(id);
    }



}