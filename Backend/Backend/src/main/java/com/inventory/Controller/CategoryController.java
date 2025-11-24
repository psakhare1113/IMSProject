package com.inventory.Controller;

import com.inventory.Entity.Category;
import com.inventory.Entity.SubCategory;
import com.inventory.Service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        // Only create main categories (no parent)
        category.setParentCategory(null);
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @PostMapping("/{categoryId}/subcategories")
    public ResponseEntity<SubCategory> createSubCategory(@PathVariable Long categoryId, @RequestBody SubCategory subCategory) {
        return ResponseEntity.ok(categoryService.createSubCategory(categoryId, subCategory));
    }

    @GetMapping("/subcategories")
    public ResponseEntity<List<SubCategory>> getAllSubCategories() {
        return ResponseEntity.ok(categoryService.getAllSubCategories());
    }

    @GetMapping("/{categoryId}/subcategories")
    public ResponseEntity<List<SubCategory>> getSubCategoriesByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.getSubCategoriesByCategory(categoryId));
    }
    @GetMapping("/Categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/subcategories/{id}")
    public ResponseEntity<Void> deleteSubCategory(@PathVariable Long id) {
        categoryService.deleteSubCategory(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/subcategory")
    public ResponseEntity<SubCategory> createSubCategoryDirect(@RequestBody Map<String, Object> request) {
        Long categoryId = Long.valueOf(request.get("categoryId").toString());
        String name = request.get("name").toString();
        SubCategory subCategory = new SubCategory();
        subCategory.setName(name);
        return ResponseEntity.ok(categoryService.createSubCategory(categoryId, subCategory));
    }
}
