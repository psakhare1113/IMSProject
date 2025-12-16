package com.inventory.ServiceImpl;

import com.inventory.DTO.ProductComparisonResponse;
import com.inventory.DTO.ProductResponseDTO;
import com.inventory.Entity.Product;
import com.inventory.Repository.ProductRepository;
import com.inventory.Service.ProductComparisonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductComparisonServiceImpl implements ProductComparisonService {

    private final ProductRepository productRepository;

    @Override
    public ProductComparisonResponse compareProducts(List<Long> productIds) {
        List<Product> products = productRepository.findAllById(productIds);
        
        if (products.isEmpty()) {
            return ProductComparisonResponse.builder()
                    .summary("No products found for comparison")
                    .descendingOrder(List.of())
                    .build();
        }
        
        Product cheapest = products.stream()
                .min((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()))
                .orElse(null);

        Product costliest = products.stream()
                .max((p1, p2) -> Double.compare(p1.getPrice(), p2.getPrice()))
                .orElse(null);

        List<ProductResponseDTO> descendingOrder = products.stream()
                .sorted((p1, p2) -> Double.compare(p2.getPrice(), p1.getPrice()))
                .map(this::mapToProductResponse)
                .collect(Collectors.toList());

        
double priceDifference = costliest.getPrice() - cheapest.getPrice();
        String summary = String.format("Comparing %d products. Price difference: ₹%.2f",
                products.size(), priceDifference);
        
        return ProductComparisonResponse.builder()
                .descendingOrder(descendingOrder)
                .summary(summary)
                .build();
    }

    private ProductResponseDTO mapToProductResponse(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(BigDecimal.valueOf(product.getPrice()))
                .availableQuantity(product.getAvailableQuantity())
                .status(product.getStatus())
                .build();
    }
}
