package com.inventory.Service;

import com.inventory.Entity.Category;
import com.inventory.Entity.SubCategory;
import java.util.List;

public interface CategoryService {
    Category createCategory(Category category);
    Category updateCategory(Long id, Category category);
    void deleteCategory(Long id);
    SubCategory createSubCategory(Long categoryId, SubCategory subCategory);
    void deleteSubCategory(Long id);
    List<Category> getAllCategories();
    List<SubCategory> getAllSubCategories();
    List<SubCategory> getSubCategoriesByCategory(Long categoryId);
}
