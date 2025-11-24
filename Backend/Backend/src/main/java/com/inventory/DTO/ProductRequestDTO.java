package com.inventory.DTO;

import lombok.Data;

@Data
public class ProductRequestDTO {
    private String name;
    private String description;
    private double price;
    private int availableQuantity;
    private String sku;
    private String status;
    private Long categoryId;
    private Long subCategoryId;
}