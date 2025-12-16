package com.inventory.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String sku;

    @Column(unique = true)
    private String name;
    private String description;
    private double price;

    private int availableQuantity;
    private String status = "ACTIVE";
    
    private String material;
    private String dimensions;
    private String warranty;
    private String color;
    private String delivery;
    private Double mrp;
    private String discount;
    private String imageUrl;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "category_id",nullable = true)
    private Category category;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "subcategory_id",nullable = true)
    private SubCategory subCategory;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<StockMovement> stockMovements = new ArrayList<>();

    public Long getCategoryId() {
        return category != null ? category.getId() : null;
    }

    public Long getSubCategoryId() {
        return subCategory != null ? subCategory.getId() : null;
    }

    // Return the selected category ID for frontend (either main category or subcategory)
    public Long getSelectedCategoryId() {
        return subCategory != null ? subCategory.getId() : (category != null ? category.getId() : null);
    }

    // Return the display name for the selected category
    public String getSelectedCategoryName() {
        return subCategory != null ? subCategory.getName() : (category != null ? category.getName() : null);
    }
}
