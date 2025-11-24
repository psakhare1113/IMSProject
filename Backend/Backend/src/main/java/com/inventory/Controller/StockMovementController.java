package com.inventory.Controller;

import com.inventory.Entity.StockMovement;
import com.inventory.Repository.StockMovementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stockMovements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StockMovementController {

    private final StockMovementRepository stockMovementRepository;

    // Get all stock movements
    @GetMapping
    public ResponseEntity<List<StockMovement>> getAllStockMovements() {
        return ResponseEntity.ok(stockMovementRepository.findAll());
    }

    // Get stock movement history for a specific product
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<StockMovement>> getStockMovementsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(stockMovementRepository.findByProduct_Id(productId));
    }
}
