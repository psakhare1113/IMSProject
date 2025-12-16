package com.inventory.Service;

import com.inventory.DTO.ProductComparisonResponse;

import java.util.List;

public interface ProductComparisonService {
    ProductComparisonResponse compareProducts(List<Long> productIds);
}
