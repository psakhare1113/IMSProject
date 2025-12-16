package com.programmingtechie.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductComparisonResponse {
    private List<ProductResponse> ascendingOrder;
    private List<ProductResponse> descendingOrder;
    private String summary;
}