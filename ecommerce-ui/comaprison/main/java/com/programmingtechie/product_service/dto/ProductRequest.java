package com.programmingtechie.product_service.dto;

import java.math.BigDecimal;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor


public class ProductRequest {
    private String name;
    private String description;
    private BigDecimal price;
}
