package com.inventory.Controller;

import com.inventory.DTO.ProductComparisonResponse;
import com.inventory.Service.ProductComparisonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comparison")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductComparisonController {

    private final ProductComparisonService productComparisonService;

    @PostMapping("/products")
    public ResponseEntity<ProductComparisonResponse> compareProducts(@RequestBody List<Long> productIds) {
        ProductComparisonResponse comparison = productComparisonService.compareProducts(productIds);
        return ResponseEntity.ok(comparison);
    }
}
