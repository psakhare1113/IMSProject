package com.inventory.Repository;

import com.inventory.Entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    Optional<SubCategory> findByNameIgnoreCaseAndCategory_NameIgnoreCase(String name, String categoryName);
    List<SubCategory> findByCategory_Id(Long categoryId);
    List<SubCategory> findByIdGreaterThanOrderById(Long id);
}