package com.programmingtechie.product_service.controller;

import com.programmingtechie.product_service.dto.ProductComparisonResponse;
import com.programmingtechie.product_service.service.ProductComparisonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;




@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductComparisonController {

    private final ProductComparisonService productComparisonService;

    @PostMapping("/compare")
    public ResponseEntity<ProductComparisonResponse> compareProducts(@RequestBody List<String> productIds) {
        ProductComparisonResponse comparison = productComparisonService.compareProducts(productIds);
        return ResponseEntity.ok(comparison);
    }
}
