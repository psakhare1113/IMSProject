package com.programmingtechie.product_service.service;

import com.programmingtechie.product_service.dto.ProductComparisonResponse;
import com.programmingtechie.product_service.dto.ProductResponse;
import com.programmingtechie.product_service.model.Product;
import com.programmingtechie.product_service.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductComparisonService {

    private final ProductRepository productRepository;

    public ProductComparisonResponse compareProducts(List<String> productIds) {
        List<Long> ids = productIds.stream()
                .map(Long::parseLong)
                .collect(Collectors.toList());
        
        List<Product> products = productRepository.findAllById(ids);
        
        if (products.isEmpty()) {
            return ProductComparisonResponse.builder()
                    .summary("No products found for comparison")
                    .ascendingOrder(List.of())
                    .descendingOrder(List.of())
                    .build();
        }
        
        Product cheapest = products.stream()
                .min((p1, p2) -> p1.getPrice().compareTo(p2.getPrice()))
                .orElse(null);
        
        Product costliest = products.stream()
                .max((p1, p2) -> p1.getPrice().compareTo(p2.getPrice()))
                .orElse(null);
        
        List<ProductResponse> ascendingOrder = products.stream()
                .sorted((p1, p2) -> p1.getPrice().compareTo(p2.getPrice()))
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
        
        List<ProductResponse> descendingOrder = products.stream()
                .sorted((p1, p2) -> p2.getPrice().compareTo(p1.getPrice()))
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());
        
        BigDecimal priceDifference = costliest.getPrice().subtract(cheapest.getPrice());
        String summary = String.format("Comparing %d products. Price difference: $%.2f", 
                products.size(), priceDifference);
        
        return ProductComparisonResponse.builder()
                .ascendingOrder(ascendingOrder)
                .descendingOrder(descendingOrder)
                .summary(summary)
                .build();
    }

    private ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .build();
    }
}
